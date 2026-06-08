#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cwd = process.cwd();
const home = os.homedir();
const jsonMode = process.argv.includes('--json');
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(scriptDir, '..');
const environmentDoc = path.join(skillRoot, 'references/environment.md');

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

const projectImpeccableSkill = [
  path.join(cwd, '.agents/skills/impeccable/SKILL.md'),
  path.join(cwd, '.codex/skills/impeccable/SKILL.md'),
  path.join(cwd, '.claude/skills/impeccable/SKILL.md'),
];
const globalImpeccableSkill = [
  path.join(home, '.agents/skills/impeccable/SKILL.md'),
  path.join(home, '.codex/skills/impeccable/SKILL.md'),
  path.join(home, '.claude/skills/impeccable/SKILL.md'),
];
const impeccableSkill = firstExisting([...projectImpeccableSkill, ...globalImpeccableSkill]);
const impeccableRoot = impeccableSkill ? path.dirname(impeccableSkill) : null;
const impeccableContextScript = impeccableRoot ? path.join(impeccableRoot, 'scripts/context.mjs') : null;
const impeccableDetectScript = impeccableRoot ? path.join(impeccableRoot, 'scripts/detect.mjs') : null;

const gsdCore = firstExisting([
  path.join(cwd, '.agents/gsd-core'),
  path.join(cwd, '.codex/gsd-core'),
  path.join(cwd, '.claude/gsd-core'),
  path.join(home, '.agents/gsd-core'),
  path.join(home, '.codex/gsd-core'),
  path.join(home, '.claude/gsd-core'),
  path.join(home, '.config/opencode/gsd-core'),
  path.join(home, '.opencode/gsd-core'),
]);
const gsdVersionPath = gsdCore ? path.join(gsdCore, 'VERSION') : null;
const gsdVersion = exists(gsdVersionPath) ? fs.readFileSync(gsdVersionPath, 'utf8').trim() : null;
const gsdSkillRoots = [
  path.join(cwd, '.agents/skills'),
  path.join(cwd, '.codex/skills'),
  path.join(cwd, '.claude/skills'),
  path.join(home, '.agents/skills'),
  path.join(home, '.codex/skills'),
  path.join(home, '.claude/skills'),
  path.join(home, '.config/opencode/skills'),
  path.join(home, '.opencode/skills'),
];
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
  path.join(home, '.codex/gsd-core/bin/gsd-tools.cjs'),
  path.join(home, '.claude/gsd-core/bin/gsd-tools.cjs'),
]);
let gsdTools = commandVersion('gsd-tools', ['--version']);
if (!gsdTools && gsdToolsPath) {
  const localTools = run('node', [gsdToolsPath, '--version']);
  gsdTools = localTools.ok ? localTools.stdout.split(/\r?\n/)[0] : gsdToolsPath;
}

const productPath = firstExisting([
  path.join(cwd, 'PRODUCT.md'),
  path.join(cwd, 'product.md'),
]);
const designPath = firstExisting([
  path.join(cwd, 'DESIGN.md'),
  path.join(cwd, 'design.md'),
]);
const planningPath = exists(path.join(cwd, '.planning')) ? path.join(cwd, '.planning') : null;
const packageJson = exists(path.join(cwd, 'package.json'));
const srcDir = exists(path.join(cwd, 'src')) || exists(path.join(cwd, 'app')) || exists(path.join(cwd, 'pages'));
const hasCode = packageJson || srcDir;

const checks = [
  { id: 'node', label: 'Node.js', status: nodeVersion ? 'ok' : 'missing', detail: nodeVersion || missingDetail('node'), fix: 'Install Node.js with npm/npx, then rerun the probe.' },
  { id: 'npm', label: 'npm', status: npmVersion ? 'ok' : 'missing', detail: npmVersion || missingDetail('npm'), fix: 'Install npm/npx through your Node.js distribution, then rerun the probe.' },
  { id: 'git', label: 'git', status: gitVersion ? 'ok' : 'missing', detail: gitVersion || missingDetail('git'), fix: 'Install Git, then rerun the probe from the project root.' },
  { id: 'git-repo', label: 'Git repository', status: !gitVersion ? 'info' : (gitRoot ? 'ok' : 'blocker'), detail: !gitVersion ? 'skipped because git is missing' : (gitRoot || 'not inside a git repository'), fix: 'Run `git init` in this project or change directory to the actual repository root.' },
  { id: 'git-author', label: 'Git author', status: !gitVersion || !gitRoot ? 'info' : (gitName && gitEmail && !invalidAuthor ? 'ok' : 'blocker'), detail: !gitVersion || !gitRoot ? 'skipped until git repository is available' : `${gitName || '(missing name)'} <${gitEmail || 'missing email'}>${invalidAuthor ? `; invalid ${invalidAuthorFields.join(', ')}` : ''}`, fix: 'Set a real person as author: `git config user.name "Your Name"` and `git config user.email "you@example.com"`.' },
  { id: 'impeccable', label: 'Impeccable skill', status: impeccableSkill ? 'ok' : 'missing', detail: impeccableSkill || 'not found', fix: 'Install Impeccable, for example: `npx impeccable skills install`.' },
  { id: 'impeccable-context', label: 'Impeccable context script', status: exists(impeccableContextScript) ? 'ok' : 'missing', detail: impeccableContextScript || 'not found', fix: 'Reinstall or update Impeccable so `scripts/context.mjs` is present.' },
  { id: 'impeccable-detect', label: 'Impeccable detect script', status: exists(impeccableDetectScript) ? 'ok' : 'missing', detail: impeccableDetectScript || 'not found', fix: 'Reinstall or update Impeccable so `scripts/detect.mjs` is present.' },
  { id: 'gsd-core', label: 'GSD core', status: gsdCore ? 'ok' : 'missing', detail: gsdCore || 'not found', fix: 'Install GSD, for example: `npx @opengsd/gsd-core@latest`.' },
  { id: 'gsd-version', label: 'GSD version', status: gsdVersion ? 'ok' : 'warn', detail: gsdVersion || 'VERSION missing', fix: 'Update or reinstall GSD so the core VERSION file is available.' },
  { id: 'gsd-skills', label: 'GSD skills', status: missingRequiredGsdSkills.length ? 'missing' : 'ok', detail: missingRequiredGsdSkills.length ? `${gsdSkillNames.size} unique skills found; missing required: ${missingRequiredGsdSkills.join(', ')}` : `${gsdSkillNames.size} unique skills found`, fix: 'Reinstall or sync GSD skills for this runtime, then restart the harness.' },
  { id: 'product-md', label: 'PRODUCT.md', status: productPath ? 'ok' : 'warn', detail: productPath || 'missing; run Impeccable init before design', fix: 'Run Impeccable initialization before design work.' },
  { id: 'design-md', label: 'DESIGN.md', status: designPath ? 'ok' : (hasCode ? 'warn' : 'info'), detail: designPath || (hasCode ? 'missing with code present; run Impeccable document' : 'missing; acceptable before design seed'), fix: 'Run Impeccable document before major frontend implementation.' },
  { id: 'planning', label: '.planning', status: planningPath ? 'ok' : 'warn', detail: planningPath || 'missing; initialize GSD before engineering planning', fix: 'Initialize GSD before engineering planning.' },
];

const blockers = checks.filter((check) => check.status === 'blocker');
const missing = checks.filter((check) => check.status === 'missing');
const warnings = checks.filter((check) => check.status === 'warn');
const actionable = checks.filter((check) => ['blocker', 'missing', 'warn'].includes(check.status));
const dependenciesOk = blockers.length === 0 && missing.length === 0;

const result = {
  cwd,
  ok: dependenciesOk,
  dependenciesOk,
  projectReady: dependenciesOk && warnings.length === 0,
  blockers: blockers.map((check) => check.id),
  missing: missing.map((check) => check.id),
  warnings: warnings.map((check) => check.id),
  checks,
  facts: {
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
    gsdCore,
    gsdVersion,
    gsdSkillCount: gsdSkillNames.size,
    missingRequiredGsdSkills,
    gsdTools,
    hasCode,
    environmentDoc,
  },
};

if (jsonMode) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log('GoalFlow environment check');
  console.log(`cwd: ${cwd}`);
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
