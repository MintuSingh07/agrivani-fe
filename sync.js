#!/usr/bin/env node

/**
 * Cross-platform Git Sync Utility for AgriVani Developers (Windows, macOS, Linux)
 * Option 1: Check repository for updates and pull latest code (Before starting code)
 * Option 2: Push all local changes to remote repository (After completing code)
 */

const { execSync, spawnSync } = require('child_process');
const readline = require('readline');

function runCmd(cmd, options = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: options.stdio || 'pipe' }).trim();
  } catch (err) {
    if (options.ignoreError) return '';
    throw err;
  }
}

function runInteractive(cmd, args = []) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: true });
  return result.status === 0;
}

function getBranch() {
  const branch = runCmd('git branch --show-current', { ignoreError: true });
  return branch || 'main';
}

function getRemote(branch) {
  const configuredRemote = runCmd(`git config --get "branch.${branch}.remote"`, { ignoreError: true });
  if (configuredRemote) return configuredRemote;
  
  const remotes = runCmd('git remote', { ignoreError: true }).split(/\r?\n/).filter(Boolean);
  if (remotes.includes('Agri-Vani')) return 'Agri-Vani';
  if (remotes.includes('origin')) return 'origin';
  return remotes[0] || 'origin';
}

const branch = getBranch();
const remote = getRemote(branch);

function showHeader() {
  console.log('==========================================');
  console.log(` 🚜 AgriVani Developer Workflow (${branch})`);
  console.log('==========================================');
}

function pullLatestChanges() {
  console.log('');
  console.log(`🔍 Checking '${remote}/${branch}' for remote updates...`);
  
  runCmd(`git fetch ${remote} ${branch}`, { ignoreError: true });
  
  const behindCountStr = runCmd(`git rev-list --count HEAD..${remote}/${branch}`, { ignoreError: true }) || '0';
  const aheadCountStr = runCmd(`git rev-list --count ${remote}/${branch}..HEAD`, { ignoreError: true }) || '0';
  const behind = parseInt(behindCountStr, 10) || 0;
  const ahead = parseInt(aheadCountStr, 10) || 0;

  if (behind > 0) {
    console.log(`📥 Found ${behind} new remote update(s). Pulling latest code...`);
    const status = runCmd('git status --porcelain', { ignoreError: true });
    const isDirty = status.length > 0;

    if (isDirty) {
      console.log('📦 Stashing uncommitted local changes...');
      runCmd('git stash');
      console.log('🔄 Pulling latest code...');
      const pullOk = runInteractive('git', ['pull', '--rebase', remote, branch]);
      console.log('📦 Restoring local stashed changes...');
      try {
        execSync('git stash pop', { stdio: 'inherit' });
      } catch {
        console.log('⚠️ Stash pop had conflicts. Please resolve manually.');
      }
      if (pullOk) {
        console.log('✅ Repository updated to latest version! You are ready to code.');
      }
    } else {
      console.log('🔄 Pulling latest code...');
      const pullOk = runInteractive('git', ['pull', '--rebase', remote, branch]);
      if (pullOk) {
        console.log('✅ Repository updated to latest version! You are ready to code.');
      }
    }
  } else {
    console.log('✅ Your repository is up-to-date with remote! Ready to code.');
  }

  if (ahead > 0) {
    console.log(`ℹ️ Note: You have ${ahead} local commit(s) ready to push.`);
  }
}

function pushAllChanges(providedMsg) {
  console.log('');
  const status = runCmd('git status --porcelain', { ignoreError: true });
  const isDirty = status.length > 0;
  const aheadCountStr = runCmd(`git rev-list --count ${remote}/${branch}..HEAD`, { ignoreError: true }) || '0';
  const ahead = parseInt(aheadCountStr, 10) || 0;

  if (!isDirty && ahead === 0) {
    console.log('ℹ️ No changes or unpushed commits found in working directory.');
    return;
  }

  if (isDirty) {
    let commitMsg = providedMsg;
    if (!commitMsg && process.stdin.isTTY) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      return rl.question('💬 Enter commit message: ', (answer) => {
        rl.close();
        commitMsg = answer.trim() || `feat: update code by ${process.env.USERNAME || process.env.USER || 'developer'}`;
        executePush(commitMsg);
      });
    }

    if (!commitMsg) {
      commitMsg = `feat: update code by ${process.env.USERNAME || process.env.USER || 'developer'}`;
    }
    executePush(commitMsg);
  } else {
    // Only unpushed commits
    console.log(`🚀 Pushing ${ahead} commit(s) to '${remote}/${branch}'...`);
    const pushOk = runInteractive('git', ['push', remote, branch]);
    if (pushOk) {
      console.log('🎉 Successfully pushed all changes to remote!');
    }
  }
}

function executePush(commitMsg) {
  console.log('➕ Staging all local changes (git add .)...');
  runCmd('git add .');
  console.log(`💾 Committing changes: '${commitMsg}'...`);
  runInteractive('git', ['commit', '-m', `"${commitMsg.replace(/"/g, '\\"')}"`]);
  console.log(`🚀 Pushing code to '${remote}/${branch}'...`);
  const pushOk = runInteractive('git', ['push', remote, branch]);
  if (pushOk) {
    console.log('🎉 Successfully pushed all changes to remote!');
  }
}

function main() {
  const args = process.argv.slice(2);
  const action = args[0];
  const paramMsg = args.slice(1).join(' ');

  if (action === '1' || action === 'pull' || action === 'start') {
    showHeader();
    pullLatestChanges();
  } else if (action === '2' || action === 'push' || action === 'finish') {
    showHeader();
    pushAllChanges(paramMsg);
  } else {
    showHeader();
    if (process.stdin.isTTY) {
      console.log('Select workflow step:');
      console.log('  [1] Start Coding  -> Check remote updates & pull latest code');
      console.log('  [2] Finish Coding -> Push all local changes to remote repository');
      console.log('  [3] Exit\n');

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('Enter choice [1 or 2]: ', (choice) => {
        rl.close();
        const trimmed = choice.trim();
        if (trimmed === '1') {
          pullLatestChanges();
        } else if (trimmed === '2') {
          pushAllChanges(paramMsg);
        } else if (trimmed === '3') {
          console.log('👋 Exiting.');
          process.exit(0);
        } else {
          console.log('❌ Invalid choice. Please run with option 1 or 2.');
          process.exit(1);
        }
      });
    } else {
      console.log('Usage:');
      console.log('  npm run sync 1 (or npm run sync pull) -> Check for updates and pull code before starting');
      console.log('  npm run sync 2 "message" (or npm run sync push "message") -> Push all code changes when finished');
    }
  }
}

main();
