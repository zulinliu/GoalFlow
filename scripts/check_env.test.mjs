import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {
  REQUIRED_GSD_SKILLS,
  evaluateRuntimeDependencies,
} from './check_env_core.mjs';

const HOME = '/tmp/goalflow-home';

function createMockFs(paths) {
  const existing = new Set(paths);
  return {
    exists(candidatePath) {
      return existing.has(candidatePath);
    },
    listDirs(dir, prefix) {
      return [...existing].filter((candidatePath) => (
        path.dirname(candidatePath) === dir && path.basename(candidatePath).startsWith(prefix)
      ));
    },
  };
}

function createRuntimePaths(rootBase) {
  return {
    impeccable: path.join(rootBase, 'skills/impeccable/SKILL.md'),
    gsdCore: path.join(rootBase, 'gsd-core'),
    gsdSkills: REQUIRED_GSD_SKILLS.map((name) => path.join(rootBase, 'skills', name)),
  };
}

function evaluateWith(paths, options) {
  const mockFs = createMockFs(paths);
  return evaluateRuntimeDependencies({
    homeDir: HOME,
    exists: mockFs.exists,
    listDirs: mockFs.listDirs,
    projectRoot: null,
    env: {},
    ...options,
  });
}

test('codex accepts impeccable and GSD from .agents only', () => {
  const agents = createRuntimePaths(path.join(HOME, '.agents'));
  const probe = evaluateWith([
    agents.impeccable,
    agents.gsdCore,
    ...agents.gsdSkills,
  ], {
    runtimeArg: 'codex',
    skillRoot: '/repo',
  });

  assert.equal(probe.targetRuntime, 'codex');
  assert.equal(probe.impeccable.compatible.primaryHit?.rootCategory, 'agents-root');
  assert.equal(probe.impeccable.incompatible.primaryHit, null);
  assert.equal(probe.gsdCore.compatible.primaryHit?.rootCategory, 'agents-root');
  assert.deepEqual(probe.gsdSkills.compatible.rootCategories, ['agents-root']);
  assert.deepEqual(probe.gsdSkills.compatible.missingRequired, []);
});

test('codex accepts impeccable and GSD from .codex only', () => {
  const codex = createRuntimePaths(path.join(HOME, '.codex'));
  const probe = evaluateWith([
    codex.impeccable,
    codex.gsdCore,
    ...codex.gsdSkills,
  ], {
    runtimeArg: 'codex',
    skillRoot: '/repo',
  });

  assert.equal(probe.impeccable.compatible.primaryHit?.rootCategory, 'codex-root');
  assert.equal(probe.gsdCore.compatible.primaryHit?.rootCategory, 'codex-root');
  assert.deepEqual(probe.gsdSkills.compatible.rootCategories, ['codex-root']);
  assert.deepEqual(probe.gsdSkills.compatible.missingRequired, []);
});

test('codex prefers a stable primary hit when both .codex and .agents exist', () => {
  const codex = createRuntimePaths(path.join(HOME, '.codex'));
  const agents = createRuntimePaths(path.join(HOME, '.agents'));
  const probe = evaluateWith([
    codex.impeccable,
    codex.gsdCore,
    ...codex.gsdSkills,
    agents.impeccable,
    agents.gsdCore,
    ...agents.gsdSkills,
  ], {
    runtimeArg: 'codex',
    skillRoot: '/repo',
  });

  assert.equal(probe.impeccable.compatible.primaryHit?.rootCategory, 'codex-root');
  assert.equal(probe.gsdCore.compatible.primaryHit?.rootCategory, 'codex-root');
  assert.deepEqual(probe.gsdSkills.compatible.rootCategories, ['codex-root', 'agents-root']);
});

test('claude rejects dependencies that exist only in .agents', () => {
  const agents = createRuntimePaths(path.join(HOME, '.agents'));
  const probe = evaluateWith([
    agents.impeccable,
    agents.gsdCore,
    ...agents.gsdSkills,
  ], {
    runtimeArg: 'claude',
    skillRoot: '/repo',
  });

  assert.equal(probe.targetRuntime, 'claude');
  assert.equal(probe.impeccable.compatible.primaryHit, null);
  assert.equal(probe.impeccable.incompatible.primaryHit?.rootCategory, 'agents-root');
  assert.equal(probe.gsdCore.compatible.primaryHit, null);
  assert.equal(probe.gsdCore.incompatible.primaryHit?.rootCategory, 'agents-root');
});

test('shared accepts dependencies from .agents only', () => {
  const agents = createRuntimePaths(path.join(HOME, '.agents'));
  const probe = evaluateWith([
    agents.impeccable,
    agents.gsdCore,
    ...agents.gsdSkills,
  ], {
    runtimeArg: 'shared',
    skillRoot: '/repo',
  });

  assert.equal(probe.targetRuntime, 'shared');
  assert.equal(probe.impeccable.compatible.primaryHit?.rootCategory, 'agents-root');
  assert.equal(probe.gsdCore.compatible.primaryHit?.rootCategory, 'agents-root');
  assert.deepEqual(probe.gsdSkills.compatible.missingRequired, []);
});

test('shared rejects dependencies that exist only in .codex', () => {
  const codex = createRuntimePaths(path.join(HOME, '.codex'));
  const probe = evaluateWith([
    codex.impeccable,
    codex.gsdCore,
    ...codex.gsdSkills,
  ], {
    runtimeArg: 'shared',
    skillRoot: '/repo',
  });

  assert.equal(probe.targetRuntime, 'shared');
  assert.equal(probe.impeccable.compatible.primaryHit, null);
  assert.equal(probe.impeccable.incompatible.primaryHit?.rootCategory, 'codex-root');
  assert.equal(probe.gsdCore.compatible.primaryHit, null);
  assert.equal(probe.gsdCore.incompatible.primaryHit?.rootCategory, 'codex-root');
});

test('auto prefers codex when CODEX_* is present and GoalFlow is installed in .agents', () => {
  const probe = evaluateWith([], {
    runtimeArg: 'auto',
    skillRoot: '/tmp/install/.agents/skills/goalflow',
    env: {
      CODEX_SESSION: '1',
    },
  });

  assert.equal(probe.inferredRuntime, 'shared');
  assert.equal(probe.targetRuntime, 'codex');
  assert.equal(probe.runtimeResolutionReason, 'codex-session');
});

test('auto stays shared without Codex session signals when GoalFlow is installed in .agents', () => {
  const probe = evaluateWith([], {
    runtimeArg: 'auto',
    skillRoot: '/tmp/install/.agents/skills/goalflow',
    env: {},
  });

  assert.equal(probe.inferredRuntime, 'shared');
  assert.equal(probe.targetRuntime, 'shared');
  assert.equal(probe.runtimeResolutionReason, 'install-path');
});
