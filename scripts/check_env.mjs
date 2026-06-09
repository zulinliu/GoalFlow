#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const invocationCwd = process.cwd();
const home = os.homedir();
const rawArgs = process.argv.slice(2);
const jsonMode = rawArgs.includes('--json');
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, '..');
const environmentDoc = path.join(skillRoot, 'references/environment.md');

function readOption(name) {
  const flag = `--${name}`;
  const inline = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = rawArgs.indexOf(flag);
  if (index === -1) return '';
  return rawArgs[index + 1] && !rawArgs[index + 1].startsWith('--') ? rawArgs[index + 1] : '';
}

function exists(p) {
  return Boolean(p) && fs.existsSync(p);
}

function firstExisting(paths) {
  return paths.find(exists) || null;
}

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 5000,
    ...options,
  });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
    error: result.error ? result.error.message : '',
  };
}

function commandVersion(cmd, args = ['--version']) {
  const result = run(cmd, args);
  return result.ok ? result.stdout.split(/\r?\n/)[0] : null;
}

function displayPath(p) {
  if (!p) return '';
  return p.startsWith(`${home}${path.sep}`) ? `~/${path.relative(home, p)}` : p;
}

function missingDetail(command) {
  return `${command} not found on PATH`;
}

function listDirs(dir, prefix) {
  if (!exists(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(prefix))
    .map((entry) => path.join(dir, entry.name));
}

function isDirectory(p) {
  try {
    return exists(p) && fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function inferRuntime(root) {
  const normalized = root.split(path.sep).join('/');
  if (normalized.includes('/.codex/skills/goalflow')) return 'codex';
  if (normalized.includes('/.claude/skills/goalflow')) return 'claude';
  if (normalized.includes('/.agents/skills/goalflow')) return 'shared';
  return '';
}

function runtimePaths(runtime, projectRoot) {
  const projectPrefix = projectRoot ? [projectRoot] : [];
  const homePrefix = [home];
  const prefixes = [...projectPrefix, ...homePrefix];

  if (runtime === 'codex') {
    return {
      skillRoots: prefixes.map((root) => path.join(root, '.codex/skills')),
      gsdCoreRoots: prefixes.map((root) => path.join(root, '.codex/gsd-core')),
      gsdToolPaths: [
        ...prefixes.map((root) => path.join(root, '.codex/gsd-core/bin/gsd-tools.cjs')),
      ],
    };
  }

  if (runtime === 'claude') {
    return {
      skillRoots: prefixes.map((root) => path.join(root, '.claude/skills')),
      gsdCoreRoots: prefixes.map((root) => path.join(root, '.claude/gsd-core')),
      gsdToolPaths: [
        ...prefixes.map((root) => path.join(root, '.claude/gsd-core/bin/gsd-tools.cjs')),
      ],
    };
  }

  if (runtime === 'shared') {
    return {
      skillRoots: prefixes.map((root) => path.join(root, '.agents/skills')),
      gsdCoreRoots: prefixes.map((root) => path.join(root, '.agents/gsd-core')),
      gsdToolPaths: [
        ...prefixes.map((root) => path.join(root, '.agents/gsd-core/bin/gsd-tools.cjs')),
      ],
    };
  }

  return { skillRoots: [], gsdCoreRoots: [], gsdToolPaths: [] };
}

const runtimeArg = readOption('runtime') || 'auto';
const validRuntimeArgs = new Set(['auto', 'codex', 'claude', 'shared']);
const runtimeArgValid = validRuntimeArgs.has(runtimeArg);
const inferredRuntime = inferRuntime(skillRoot);
const targetRuntime = runtimeArgValid && runtimeArg !== 'auto' ? runtimeArg : inferredRuntime;
const runtimeKnown = ['codex', 'claude', 'shared'].includes(targetRuntime);
const projectArg = readOption('project');
const projectRoot = path.resolve(invocationCwd, projectArg || '.');
const projectPathOk = isDirectory(projectRoot);
const projectScopeKnown = Boolean(projectArg) || path.resolve(projectRoot) !== skillRoot;
const activeProjectRoot = projectPathOk && projectScopeKnown ? projectRoot : null;
const cwd = activeProjectRoot || invocationCwd;
const runtimeScope = runtimePaths(targetRuntime, activeProjectRoot);
const otherRuntimeNames = ['codex', 'claude', 'shared'].filter((runtime) => runtime !== targetRuntime);
const otherRuntimeScopes = otherRuntimeNames.map((runtime) => ({ runtime, ...runtimePaths(runtime, activeProjectRoot) }));

const nodeVersion = process.version;
const npmVersion = commandVersion('npm');
const gitVersion = commandVersion('git');

const gitRootResult = gitVersion ? run('git', ['rev-parse', '--show-toplevel']) : { ok: false, stdout: '' };
const gitRoot = gitRootResult.ok ? gitRootResult.stdout : null;
const gitName = gitVersion && gitRoot ? run('git', ['config', 'user.name']).stdout : '';
const gitEmail = gitVersion && gitRoot ? run('git', ['config', 'user.email']).stdout : '';
const gitAuthorIdent = gitVersion && gitRoot ? run('git', ['var', 'GIT_AUTHOR_IDENT']).stdout : '';
const gitCommitterIdent = gitVersion && gitRoot ? run('git', ['var', 'GIT_COMMITTER_IDENT']).stdout : '';
const envAuthorName = process.env.GIT_AUTHOR_NAME || '';
const envAuthorEmail = process.env.GIT_AUTHOR_EMAIL || '';
const envCommitterName = process.env.GIT_COMMITTER_NAME || '';
const envCommitterEmail = process.env.GIT_COMMITTER_EMAIL || '';
const invalidNamePattern = /(^|[\s._-])(codex|claude|hapi|ai[-_\s]?assistant|assistant|agent|bot|github[-_\s]?actions|dependabot|renovate)([\s._-]|$)/i;
const invalidEmailPattern = /(^|[<@._+-])(codex|claude|hapi|ai[-_\s]?assistant|assistant|agent|bot|github-actions|dependabot|renovate|no-?reply)([>@._+-]|$)/i;
const invalidAuthorFields = [
  gitName && invalidNamePattern.test(gitName) ? 'name' : null,
  gitEmail && invalidEmailPattern.test(gitEmail) ? 'email' : null,
  envAuthorName && invalidNamePattern.test(envAuthorName) ? 'GIT_AUTHOR_NAME' : null,
  envAuthorEmail && invalidEmailPattern.test(envAuthorEmail) ? 'GIT_AUTHOR_EMAIL' : null,
  envCommitterName && invalidNamePattern.test(envCommitterName) ? 'GIT_COMMITTER_NAME' : null,
  envCommitterEmail && invalidEmailPattern.test(envCommitterEmail) ? 'GIT_COMMITTER_EMAIL' : null,
].filter(Boolean);
const invalidAuthor = invalidAuthorFields.length > 0;

const scopedImpeccableSkills = runtimeScope.skillRoots.map((root) => path.join(root, 'impeccable/SKILL.md'));
const otherRuntimeImpeccableSkills = otherRuntimeScopes.flatMap((scope) => (
  scope.skillRoots.map((root) => ({ runtime: scope.runtime, path: path.join(root, 'impeccable/SKILL.md') }))
));
const impeccableSkill = runtimeKnown ? firstExisting(scopedImpeccableSkills) : null;
const otherImpeccableSkill = otherRuntimeImpeccableSkills.find((candidate) => exists(candidate.path)) || null;
const impeccableRoot = impeccableSkill ? path.dirname(impeccableSkill) : null;
const impeccableContextScript = impeccableRoot ? path.join(impeccableRoot, 'scripts/context.mjs') : null;
const impeccableDetectScript = impeccableRoot ? path.join(impeccableRoot, 'scripts/detect.mjs') : null;

const scopedGsdCores = runtimeScope.gsdCoreRoots;
const otherRuntimeGsdCores = otherRuntimeScopes.flatMap((scope) => (
  scope.gsdCoreRoots.map((root) => ({ runtime: scope.runtime, path: root }))
));
const gsdCore = runtimeKnown ? firstExisting(scopedGsdCores) : null;
const otherGsdCore = otherRuntimeGsdCores.find((candidate) => exists(candidate.path)) || null;
const gsdVersionPath = gsdCore ? path.join(gsdCore, 'VERSION') : null;
const gsdVersion = exists(gsdVersionPath) ? fs.readFileSync(gsdVersionPath, 'utf8').trim() : null;
const gsdSkillRoots = runtimeKnown ? runtimeScope.skillRoots : [];
const gsdSkills = gsdSkillRoots.flatMap((root) => listDirs(root, 'gsd-'));
const gsdSkillNames = new Set(gsdSkills.map((skillPath) => path.basename(skillPath)));
const requiredGsdSkills = [
  'gsd-new-project',
  'gsd-spec-phase',
  'gsd-discuss-phase',
  'gsd-plan-phase',
  'gsd-execute-phase',
  'gsd-autonomous',
  'gsd-code-review',
  'gsd-audit-fix',
  'gsd-validate-phase',
  'gsd-verify-work',
  'gsd-audit-uat',
  'gsd-add-tests',
  'gsd-docs-update',
  'gsd-ship',
  'gsd-pr-branch',
  'gsd-complete-milestone',
  'gsd-sketch',
  'gsd-progress',
];
const missingRequiredGsdSkills = requiredGsdSkills.filter((name) => !gsdSkillNames.has(name));
const gsdToolsPath = firstExisting([
  gsdCore ? path.join(gsdCore, 'bin/gsd-tools.cjs') : null,
  ...runtimeScope.gsdToolPaths,
]);
let gsdTools = commandVersion('gsd-tools', ['--version']);
const pathGsdTools = gsdTools;
gsdTools = null;
if (gsdToolsPath) {
  const localTools = run('node', [gsdToolsPath, '--version']);
  gsdTools = localTools.ok ? localTools.stdout.split(/\r?\n/)[0] : gsdToolsPath;
}

const productPath = firstExisting([
  activeProjectRoot ? path.join(activeProjectRoot, 'PRODUCT.md') : null,
  activeProjectRoot ? path.join(activeProjectRoot, 'product.md') : null,
]);
const designPath = firstExisting([
  activeProjectRoot ? path.join(activeProjectRoot, 'DESIGN.md') : null,
  activeProjectRoot ? path.join(activeProjectRoot, 'design.md') : null,
]);
const planningPath = activeProjectRoot && exists(path.join(activeProjectRoot, '.planning')) ? path.join(activeProjectRoot, '.planning') : null;
const packageJson = activeProjectRoot && exists(path.join(activeProjectRoot, 'package.json'));
const srcDir = activeProjectRoot && (exists(path.join(activeProjectRoot, 'src')) || exists(path.join(activeProjectRoot, 'app')) || exists(path.join(activeProjectRoot, 'pages')));
const hasCode = packageJson || srcDir;

const checks = [
  { id: 'runtime-arg', label: 'Runtime argument', status: runtimeArgValid ? 'ok' : 'blocker', detail: runtimeArgValid ? runtimeArg : `${runtimeArg} is invalid`, fix: 'Use `--runtime codex`, `--runtime claude`, `--runtime shared`, or omit it from a standard GoalFlow install.' },
  { id: 'runtime-scope', label: 'Runtime scope', status: runtimeKnown ? 'ok' : 'warn', detail: runtimeKnown ? targetRuntime : 'could not infer runtime from skill path', fix: 'Run the probe from a standard install path or pass `--runtime codex`, `--runtime claude`, or `--runtime shared`.' },
  { id: 'project-path', label: 'Project path', status: projectPathOk ? 'ok' : 'blocker', detail: projectPathOk ? projectRoot : `${projectRoot} is not a directory`, fix: 'Pass an existing project directory with `--project <PROJECT_ROOT>`.' },
  { id: 'project-scope', label: 'Project scope', status: activeProjectRoot ? 'ok' : 'warn', detail: activeProjectRoot || 'using invocation directory only; project artifacts are not scoped because the probe appears to be running from the skill directory', fix: 'Run from the target project root: `cd <PROJECT_ROOT> && node <GOALFLOW_SKILL_DIR>/scripts/check_env.mjs`, or pass `--project <PROJECT_ROOT>`.' },
  { id: 'node', label: 'Node.js', status: nodeVersion ? 'ok' : 'missing', detail: nodeVersion || missingDetail('node'), fix: 'Install Node.js with npm/npx, then rerun the probe.' },
  { id: 'npm', label: 'npm', status: npmVersion ? 'ok' : 'missing', detail: npmVersion || missingDetail('npm'), fix: 'Install npm/npx through your Node.js distribution, then rerun the probe.' },
  { id: 'git', label: 'git', status: gitVersion ? 'ok' : 'missing', detail: gitVersion || missingDetail('git'), fix: 'Install Git, then rerun the probe from the project root.' },
  { id: 'git-repo', label: 'Git repository', status: !gitVersion ? 'info' : (gitRoot ? 'ok' : 'blocker'), detail: !gitVersion ? 'skipped because git is missing' : (gitRoot || 'not inside a git repository'), fix: 'Run `git init` in this project or change directory to the actual repository root.' },
  { id: 'git-author', label: 'Git author', status: !gitVersion || !gitRoot ? 'info' : (gitName && gitEmail && !invalidAuthor ? 'ok' : 'blocker'), detail: !gitVersion || !gitRoot ? 'skipped until git repository is available' : `${gitName || '(missing name)'} <${gitEmail || 'missing email'}>${invalidAuthor ? `; invalid ${invalidAuthorFields.join(', ')}` : ''}`, fix: 'Set a real person as author: `git config user.name "Your Name"` and `git config user.email "you@example.com"`.' },
  { id: 'impeccable', label: 'Impeccable skill', status: impeccableSkill ? 'ok' : 'missing', detail: impeccableSkill || (otherImpeccableSkill ? `not found for ${targetRuntime || 'current runtime'}; found for ${otherImpeccableSkill.runtime} at ${otherImpeccableSkill.path}` : 'not found'), fix: `Install Impeccable for ${targetRuntime || 'this runtime'}, for example: \`npx impeccable skills install\`, then restart the harness.` },
  { id: 'impeccable-context', label: 'Impeccable context script', status: exists(impeccableContextScript) ? 'ok' : 'missing', detail: impeccableContextScript || 'not found for current runtime', fix: 'Reinstall or update Impeccable in the current runtime so `scripts/context.mjs` is present.' },
  { id: 'impeccable-detect', label: 'Impeccable detect script', status: exists(impeccableDetectScript) ? 'ok' : 'missing', detail: impeccableDetectScript || 'not found for current runtime', fix: 'Reinstall or update Impeccable in the current runtime so `scripts/detect.mjs` is present.' },
  { id: 'gsd-core', label: 'GSD core', status: gsdCore ? 'ok' : 'missing', detail: gsdCore || (otherGsdCore ? `not found for ${targetRuntime || 'current runtime'}; found for ${otherGsdCore.runtime} at ${otherGsdCore.path}` : 'not found'), fix: `Install GSD for ${targetRuntime || 'this runtime'}, for example: \`npx @opengsd/gsd-core@latest\`, choose the matching runtime, then restart the harness.` },
  { id: 'gsd-version', label: 'GSD version', status: gsdVersion ? 'ok' : 'warn', detail: gsdVersion || 'VERSION missing', fix: 'Update or reinstall GSD so the core VERSION file is available.' },
  { id: 'gsd-skills', label: 'GSD skills', status: missingRequiredGsdSkills.length ? 'missing' : 'ok', detail: missingRequiredGsdSkills.length ? `${gsdSkillNames.size} unique skills found; missing required: ${missingRequiredGsdSkills.join(', ')}` : `${gsdSkillNames.size} unique skills found`, fix: 'Reinstall or sync GSD skills for this runtime, then restart the harness.' },
  { id: 'product-md', label: 'PRODUCT.md', status: !activeProjectRoot ? 'info' : (productPath ? 'ok' : 'warn'), detail: !activeProjectRoot ? 'skipped until target project root is explicit' : (productPath || 'missing; run Impeccable init before design'), fix: 'Run Impeccable initialization before design work.' },
  { id: 'design-md', label: 'DESIGN.md', status: !activeProjectRoot ? 'info' : (designPath ? 'ok' : (hasCode ? 'warn' : 'info')), detail: !activeProjectRoot ? 'skipped until target project root is explicit' : (designPath || (hasCode ? 'missing with code present; run Impeccable document' : 'missing; acceptable before design seed')), fix: 'Run Impeccable document before major frontend implementation.' },
  { id: 'planning', label: '.planning', status: !activeProjectRoot ? 'info' : (planningPath ? 'ok' : 'warn'), detail: !activeProjectRoot ? 'skipped until target project root is explicit' : (planningPath || 'missing; initialize GSD before engineering planning'), fix: 'Initialize GSD before engineering planning.' },
];

const blockers = checks.filter((check) => check.status === 'blocker');
const missing = checks.filter((check) => check.status === 'missing');
const warnings = checks.filter((check) => check.status === 'warn');
const actionable = checks.filter((check) => ['blocker', 'missing', 'warn'].includes(check.status));
const dependenciesOk = blockers.length === 0 && missing.length === 0;

const result = {
  cwd,
  invocationCwd,
  projectRoot: activeProjectRoot,
  ok: dependenciesOk,
  dependenciesOk,
  projectReady: dependenciesOk && warnings.length === 0,
  blockers: blockers.map((check) => check.id),
  missing: missing.map((check) => check.id),
  warnings: warnings.map((check) => check.id),
  checks,
  facts: {
    skillRoot,
    runtimeArg,
    inferredRuntime,
    targetRuntime,
    runtimeKnown,
    projectArg,
    projectPathOk,
    projectScopeKnown,
    activeProjectRoot,
    gitRoot,
    gitName,
    gitEmail,
    gitAuthorIdent,
    gitCommitterIdent,
    envAuthorName,
    envAuthorEmail,
    envCommitterName,
    envCommitterEmail,
    invalidAuthor,
    invalidAuthorFields,
    impeccableRoot,
    otherImpeccableSkill,
    gsdCore,
    otherGsdCore,
    gsdVersion,
    gsdSkillCount: gsdSkillNames.size,
    missingRequiredGsdSkills,
    gsdTools,
    pathGsdTools,
    hasCode,
    environmentDoc,
  },
};

if (jsonMode) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log('GoalFlow environment check');
  console.log(`skill: ${displayPath(skillRoot)}`);
  console.log(`runtime: ${targetRuntime || 'unknown'}${inferredRuntime ? ` (inferred: ${inferredRuntime})` : ''}`);
  console.log(`cwd: ${invocationCwd}`);
  console.log(`project: ${activeProjectRoot || 'not explicit'}`);
  console.log('');
  for (const check of checks) {
    const marker = check.status === 'ok' ? 'OK'
      : check.status === 'blocker' ? 'BLOCKED'
      : check.status === 'missing' ? 'MISSING'
      : check.status === 'warn' ? 'WARN'
      : 'INFO';
    console.log(`[${marker}] ${check.label}: ${check.detail}`);
  }
  console.log('');
  if (result.ok) {
    if (warnings.length) {
      console.log('Core dependencies are installed; project setup warnings remain before full GoalFlow delivery.');
    } else {
      console.log('Environment is ready for GoalFlow.');
    }
  } else {
    console.log('Environment needs attention before GoalFlow can run end to end.');
  }
  if (actionable.length) {
    console.log('');
    console.log('Next actions:');
    for (const check of actionable) {
      console.log(`- ${check.label}: ${check.fix}`);
    }
  }
  console.log(`Read: ${displayPath(environmentDoc)}`);
}

process.exit(result.ok ? 0 : 1);
