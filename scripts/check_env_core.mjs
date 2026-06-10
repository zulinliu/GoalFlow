import path from 'node:path';

export const VALID_RUNTIME_ARGS = new Set(['auto', 'codex', 'claude', 'shared']);
export const KNOWN_RUNTIMES = new Set(['codex', 'claude', 'shared']);
export const ROOT_CATEGORY_BASE_DIRS = {
  'codex-root': '.codex',
  'claude-root': '.claude',
  'agents-root': '.agents',
};
export const ROOT_CATEGORY_OWNER_RUNTIME = {
  'codex-root': 'codex',
  'claude-root': 'claude',
  'agents-root': 'shared',
};
export const RUNTIME_COMPATIBLE_ROOTS = {
  codex: ['codex-root', 'agents-root'],
  claude: ['claude-root'],
  shared: ['agents-root'],
};
export const REQUIRED_GSD_SKILLS = [
  'gsd-new-project',
  'gsd-spec-phase',
  'gsd-discuss-phase',
  'gsd-plan-phase',
  'gsd-execute-phase',
  'gsd-autonomous',
  'gsd-quick',
  'gsd-code-review',
  'gsd-audit-fix',
  'gsd-validate-phase',
  'gsd-verify-work',
  'gsd-audit-uat',
  'gsd-add-tests',
  'gsd-docs-update',
  'gsd-ui-phase',
  'gsd-ui-review',
  'gsd-ship',
  'gsd-pr-branch',
  'gsd-complete-milestone',
  'gsd-audit-milestone',
  'gsd-progress',
];

export const REQUIRED_TASTE_SKILLS = [
  'taste-design-taste-frontend',
  'taste-full-output-enforcement',
];

export const RECOMMENDED_TASTE_SKILLS = [
  'taste-redesign-existing-projects',
  'taste-high-end-visual-design',
  'taste-minimalist-ui',
  'taste-industrial-brutalist-ui',
  'taste-gpt-taste',
  'taste-brandkit',
];

function createRootCandidate(prefix, scope, rootCategory) {
  const baseDir = ROOT_CATEGORY_BASE_DIRS[rootCategory];
  return {
    scope,
    rootCategory,
    ownerRuntime: ROOT_CATEGORY_OWNER_RUNTIME[rootCategory],
    basePath: path.join(prefix, baseDir),
    skillRoot: path.join(prefix, baseDir, 'skills'),
    gsdCoreRoot: path.join(prefix, baseDir, 'gsd-core'),
    gsdToolsPath: path.join(prefix, baseDir, 'gsd-core/bin/gsd-tools.cjs'),
  };
}

function buildRootCandidates(rootCategories, projectRoot, homeDir) {
  const prefixes = [];
  if (projectRoot) {
    prefixes.push({ scope: 'project', prefix: projectRoot });
  }
  if (homeDir) {
    prefixes.push({ scope: 'user', prefix: homeDir });
  }
  return prefixes.flatMap(({ scope, prefix }) => (
    rootCategories.map((rootCategory) => createRootCandidate(prefix, scope, rootCategory))
  ));
}

function withCandidatePath(candidate, candidatePath) {
  return {
    scope: candidate.scope,
    rootCategory: candidate.rootCategory,
    ownerRuntime: candidate.ownerRuntime,
    candidatePath,
  };
}

function inspectFileDependency(candidates, relativePath, exists) {
  const hits = candidates
    .map((candidate) => withCandidatePath(candidate, path.join(candidate.skillRoot, relativePath)))
    .filter((hit) => exists(hit.candidatePath));
  return {
    primaryHit: hits[0] || null,
    hits,
  };
}

function inspectDirectoryDependency(candidates, pickPath, exists) {
  const hits = candidates
    .map((candidate) => withCandidatePath(candidate, pickPath(candidate)))
    .filter((hit) => exists(hit.candidatePath));
  return {
    primaryHit: hits[0] || null,
    hits,
  };
}

function inspectGsdSkills(candidates, listDirs) {
  const hits = candidates.flatMap((candidate) => (
    listDirs(candidate.skillRoot, 'gsd-').map((candidatePath) => ({
      ...withCandidatePath(candidate, candidatePath),
      name: path.basename(candidatePath),
    }))
  ));
  const uniqueNames = [...new Set(hits.map((hit) => hit.name))];
  const rootCategories = [...new Set(hits.map((hit) => hit.rootCategory))];
  const missingRequired = REQUIRED_GSD_SKILLS.filter((name) => !uniqueNames.includes(name));
  return {
    hits,
    uniqueNames,
    rootCategories,
    primaryHit: hits[0] || null,
    missingRequired,
  };
}

function inspectTasteSkills(candidates, listDirs) {
  const hits = candidates.flatMap((candidate) => (
    listDirs(candidate.skillRoot, 'taste-').map((candidatePath) => ({
      ...withCandidatePath(candidate, candidatePath),
      name: path.basename(candidatePath),
    }))
  ));
  const uniqueNames = [...new Set(hits.map((hit) => hit.name))];
  const rootCategories = [...new Set(hits.map((hit) => hit.rootCategory))];
  const missingRequired = REQUIRED_TASTE_SKILLS.filter((name) => !uniqueNames.includes(name));
  const missingRecommended = RECOMMENDED_TASTE_SKILLS.filter((name) => !uniqueNames.includes(name));
  return {
    hits,
    uniqueNames,
    rootCategories,
    primaryHit: hits[0] || null,
    missingRequired,
    missingRecommended,
  };
}

export function inferInstallRuntime(skillRoot) {
  const normalized = skillRoot.split(path.sep).join('/');
  if (normalized.includes('/.codex/skills/goalflow')) return 'codex';
  if (normalized.includes('/.claude/skills/goalflow')) return 'claude';
  if (normalized.includes('/.agents/skills/goalflow')) return 'shared';
  return '';
}

export function hasCodexSessionSignal(env = process.env) {
  return Object.keys(env).some((key) => key.startsWith('CODEX_'));
}

export function resolveRuntimeSelection({ runtimeArg = 'auto', skillRoot, env = process.env }) {
  const runtimeArgValid = VALID_RUNTIME_ARGS.has(runtimeArg);
  const inferredRuntime = inferInstallRuntime(skillRoot);
  const codexSessionDetected = hasCodexSessionSignal(env);

  let targetRuntime = '';
  let runtimeResolutionReason = 'unknown';

  if (!runtimeArgValid) {
    targetRuntime = inferredRuntime;
    runtimeResolutionReason = inferredRuntime ? 'install-path' : 'unknown';
  } else if (runtimeArg !== 'auto') {
    targetRuntime = runtimeArg;
    runtimeResolutionReason = 'explicit';
  } else if (inferredRuntime === 'claude') {
    targetRuntime = 'claude';
    runtimeResolutionReason = 'install-path';
  } else if (codexSessionDetected) {
    targetRuntime = 'codex';
    runtimeResolutionReason = 'codex-session';
  } else {
    targetRuntime = inferredRuntime;
    runtimeResolutionReason = inferredRuntime ? 'install-path' : 'unknown';
  }

  return {
    runtimeArgValid,
    inferredRuntime,
    targetRuntime,
    runtimeKnown: KNOWN_RUNTIMES.has(targetRuntime),
    runtimeResolutionReason,
    codexSessionDetected,
  };
}

export function evaluateRuntimeDependencies({
  runtimeArg = 'auto',
  skillRoot,
  projectRoot,
  homeDir,
  env = process.env,
  exists,
  listDirs,
}) {
  const runtimeSelection = resolveRuntimeSelection({ runtimeArg, skillRoot, env });
  const compatibleRootCategories = runtimeSelection.runtimeKnown
    ? RUNTIME_COMPATIBLE_ROOTS[runtimeSelection.targetRuntime]
    : [];
  const incompatibleRootCategories = Object.keys(ROOT_CATEGORY_BASE_DIRS)
    .filter((rootCategory) => !compatibleRootCategories.includes(rootCategory));
  const compatibleRoots = buildRootCandidates(compatibleRootCategories, projectRoot, homeDir);
  const incompatibleRoots = buildRootCandidates(incompatibleRootCategories, projectRoot, homeDir);

  const impeccable = {
    compatible: inspectFileDependency(compatibleRoots, 'impeccable/SKILL.md', exists),
    incompatible: inspectFileDependency(incompatibleRoots, 'impeccable/SKILL.md', exists),
  };
  const gsdCore = {
    compatible: inspectDirectoryDependency(compatibleRoots, (candidate) => candidate.gsdCoreRoot, exists),
    incompatible: inspectDirectoryDependency(incompatibleRoots, (candidate) => candidate.gsdCoreRoot, exists),
  };
  const gsdSkills = {
    compatible: inspectGsdSkills(compatibleRoots, listDirs),
    incompatible: inspectGsdSkills(incompatibleRoots, listDirs),
  };
  const tasteSkills = {
    compatible: inspectTasteSkills(compatibleRoots, listDirs),
    incompatible: inspectTasteSkills(incompatibleRoots, listDirs),
  };

  return {
    ...runtimeSelection,
    compatibleRootCategories,
    incompatibleRootCategories,
    compatibleRoots,
    incompatibleRoots,
    impeccable,
    gsdCore,
    gsdSkills,
    tasteSkills,
  };
}
