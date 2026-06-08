#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const home = os.homedir();
const jsonMode = process.argv.includes('--json');

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
  };
}

function commandVersion(cmd, args = ['--version']) {
  const result = run(cmd, args);
  return result.ok ? result.stdout.split(/\r?\n/)[0] : null;
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

const gitRootResult = run('git', ['rev-parse', '--show-toplevel']);
const gitRoot = gitRootResult.ok ? gitRootResult.stdout : null;
const gitName = run('git', ['config', 'user.name']).stdout;
const gitEmail = run('git', ['config', 'user.email']).stdout;
const invalidAuthorPattern = /\b(codex|claude|hapi|agent|ai assistant|assistant|bot)\b/i;
const invalidAuthor = Boolean(gitName && invalidAuthorPattern.test(gitName));

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
  path.join(cwd, '.codex/gsd-core'),
  path.join(cwd, '.claude/gsd-core'),
  path.join(home, '.codex/gsd-core'),
  path.join(home, '.claude/gsd-core'),
  path.join(home, '.config/opencode/gsd-core'),
  path.join(home, '.opencode/gsd-core'),
]);
const gsdVersionPath = gsdCore ? path.join(gsdCore, 'VERSION') : null;
const gsdVersion = exists(gsdVersionPath) ? fs.readFileSync(gsdVersionPath, 'utf8').trim() : null;
const gsdSkillRoots = [
  path.join(cwd, '.codex/skills'),
  path.join(cwd, '.claude/skills'),
  path.join(home, '.codex/skills'),
  path.join(home, '.claude/skills'),
  path.join(home, '.config/opencode/skills'),
  path.join(home, '.opencode/skills'),
];
const gsdSkills = gsdSkillRoots.flatMap((root) => listDirs(root, 'gsd-'));
const gsdSkillNames = new Set(gsdSkills.map((skillPath) => path.basename(skillPath)));
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
  { id: 'node', label: 'Node.js', status: nodeVersion ? 'ok' : 'missing', detail: nodeVersion },
  { id: 'npm', label: 'npm', status: npmVersion ? 'ok' : 'missing', detail: npmVersion },
  { id: 'git', label: 'git', status: gitVersion ? 'ok' : 'missing', detail: gitVersion },
  { id: 'git-repo', label: 'Git repository', status: gitRoot ? 'ok' : 'blocker', detail: gitRoot || 'not inside a git repository' },
  { id: 'git-author', label: 'Git author', status: gitName && gitEmail && !invalidAuthor ? 'ok' : 'blocker', detail: `${gitName || '(missing name)'} <${gitEmail || 'missing email'}>` },
  { id: 'impeccable', label: 'Impeccable skill', status: impeccableSkill ? 'ok' : 'missing', detail: impeccableSkill || 'not found' },
  { id: 'impeccable-context', label: 'Impeccable context script', status: exists(impeccableContextScript) ? 'ok' : 'missing', detail: impeccableContextScript || 'not found' },
  { id: 'impeccable-detect', label: 'Impeccable detect script', status: exists(impeccableDetectScript) ? 'ok' : 'missing', detail: impeccableDetectScript || 'not found' },
  { id: 'gsd-core', label: 'GSD core', status: gsdCore ? 'ok' : 'missing', detail: gsdCore || 'not found' },
  { id: 'gsd-version', label: 'GSD version', status: gsdVersion ? 'ok' : 'warn', detail: gsdVersion || 'VERSION missing' },
  { id: 'gsd-skills', label: 'GSD skills', status: gsdSkillNames.size ? 'ok' : 'missing', detail: `${gsdSkillNames.size} unique skills found` },
  { id: 'product-md', label: 'PRODUCT.md', status: productPath ? 'ok' : 'warn', detail: productPath || 'missing; run Impeccable init before design' },
  { id: 'design-md', label: 'DESIGN.md', status: designPath ? 'ok' : (hasCode ? 'warn' : 'info'), detail: designPath || (hasCode ? 'missing with code present; run Impeccable document' : 'missing; acceptable before design seed') },
  { id: 'planning', label: '.planning', status: planningPath ? 'ok' : 'warn', detail: planningPath || 'missing; initialize GSD before engineering planning' },
];

const blockers = checks.filter((check) => check.status === 'blocker');
const missing = checks.filter((check) => check.status === 'missing');
const warnings = checks.filter((check) => check.status === 'warn');

const result = {
  cwd,
  ok: blockers.length === 0 && missing.length === 0,
  blockers: blockers.map((check) => check.id),
  missing: missing.map((check) => check.id),
  warnings: warnings.map((check) => check.id),
  checks,
  facts: {
    gitRoot,
    gitName,
    gitEmail,
    invalidAuthor,
    impeccableRoot,
    gsdCore,
    gsdVersion,
    gsdSkillCount: gsdSkillNames.size,
    gsdTools,
    hasCode,
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
    console.log('Environment is ready for GoalFlow.');
  } else {
    console.log('Environment needs attention before GoalFlow can run end to end.');
    console.log('Read: ~/.codex/skills/goalflow/references/environment.md');
  }
}

process.exit(result.ok ? 0 : 1);
