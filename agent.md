# AgriVani Agent Workflow (`agent.md`)

> **Note**: Full developer & AI instructions are maintained in [AGENTS.md](file:///Users/mintu/Documents/hackathon/argivani/AGENTS.md).

---

## 🚜 2-Option Interactive Sync Utility (`sync.sh`)

Developers and AI agents can execute `./sync.sh` or `npm run sync` to run the 2-step workflow:

### Option 1: Start Coding (Check & Pull)
* **Terminal**: `./sync.sh 1` or `./sync.sh pull`
* **AI Prompt**: *"Check for updates and pull"*
* **Action**: Fetches remote repository, auto-stashes local work if needed, pulls & rebases latest code.

### Option 2: Finish Coding (Commit & Push)
* **Terminal**: `./sync.sh 2 "commit message"` or `./sync.sh push "commit message"`
* **AI Prompt**: *"Push my code with message '...'"*
* **Action**: Stages all local modifications (`git add .`), creates commit, and pushes to remote.

---

## 🤖 Instructions for AI Assistants
1. **Before coding**: Execute `./sync.sh 1` to check for and pull remote updates.
2. **After coding**: Execute `./sync.sh 2 "<commit-message>"` to push changes.
