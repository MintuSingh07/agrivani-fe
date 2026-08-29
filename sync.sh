#!/usr/bin/env bash

# Interactive Git Sync Utility for AgriVani Developers
# Option 1: Check repository for updates and pull latest code (Before starting code)
# Option 2: Push all local changes to remote repository (After completing code)

set -e

REMOTE=$(git config --get "branch.$(git branch --show-current 2>/dev/null).remote" 2>/dev/null || echo "Agri-Vani")
BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

pull_latest_changes() {
    echo ""
    echo "🔍 Checking '$REMOTE/$BRANCH' for remote updates..."
    git fetch "$REMOTE" "$BRANCH" 2>/dev/null || git fetch origin "$BRANCH" 2>/dev/null || true

    BEHIND=$(git rev-list --count HEAD.."$REMOTE/$BRANCH" 2>/dev/null || git rev-list --count HEAD.."origin/$BRANCH" 2>/dev/null || echo 0)
    AHEAD=$(git rev-list --count "$REMOTE/$BRANCH"..HEAD 2>/dev/null || git rev-list --count "origin/$BRANCH"..HEAD 2>/dev/null || echo 0)

    if [ "$BEHIND" -gt 0 ]; then
        echo "📥 Found $BEHIND new remote update(s). Pulling latest code..."
        
        IF_DIRTY=$(git status --porcelain)
        if [ -n "$IF_DIRTY" ]; then
            echo "📦 Stashing uncommitted local changes..."
            git stash
            echo "🔄 Pulling latest code..."
            git pull --rebase "$REMOTE" "$BRANCH" || git pull --rebase origin "$BRANCH"
            echo "📦 Restoring local stashed changes..."
            git stash pop || echo "⚠️ Stash pop had conflicts. Please resolve manually."
        else
            echo "🔄 Pulling latest code..."
            git pull --rebase "$REMOTE" "$BRANCH" || git pull --rebase origin "$BRANCH"
        fi
        echo "✅ Repository updated to latest version! You are ready to code."
    else
        echo "✅ Your repository is up-to-date with remote! Ready to code."
    fi

    if [ "$AHEAD" -gt 0 ]; then
        echo "ℹ️ Note: You have $AHEAD local commit(s) ready to push."
    fi
}

push_all_changes() {
    COMMIT_MSG="$1"
    
    echo ""
    IF_DIRTY=$(git status --porcelain)
    AHEAD=$(git rev-list --count "$REMOTE/$BRANCH"..HEAD 2>/dev/null || git rev-list --count "origin/$BRANCH"..HEAD 2>/dev/null || echo 0)

    if [ -z "$IF_DIRTY" ] && [ "$AHEAD" -eq 0 ]; then
        echo "ℹ️ No changes or unpushed commits found in working directory."
        return
    fi

    if [ -n "$IF_DIRTY" ]; then
        if [ -z "$COMMIT_MSG" ]; then
            if [ -t 0 ]; then
                read -rp "💬 Enter commit message: " COMMIT_MSG
            fi
            if [ -z "$COMMIT_MSG" ]; then
                COMMIT_MSG="feat: update code by $(whoami)"
            fi
        fi

        echo "➕ Staging all local changes (git add .)..."
        git add .
        echo "💾 Committing changes: '$COMMIT_MSG'..."
        git commit -m "$COMMIT_MSG"
    fi

    echo "🚀 Pushing code to '$REMOTE/$BRANCH'..."
    git push "$REMOTE" "$BRANCH" || git push origin "$BRANCH"
    echo "🎉 Successfully pushed all changes to remote!"
}

show_header() {
    echo "=========================================="
    echo " 🚜 AgriVani Developer Workflow ($BRANCH)"
    echo "=========================================="
}

ACTION="$1"
PARAM_MSG="$2"

case "$ACTION" in
    1|pull|start)
        show_header
        pull_latest_changes
        ;;
    2|push|finish)
        show_header
        push_all_changes "$PARAM_MSG"
        ;;
    *)
        show_header
        if [ -t 0 ]; then
            echo "Select workflow step:"
            echo "  [1] Start Coding  -> Check remote updates & pull latest code"
            echo "  [2] Finish Coding -> Push all local changes to remote repository"
            echo "  [3] Exit"
            echo ""
            read -rp "Enter choice [1 or 2]: " CHOICE
            case "$CHOICE" in
                1)
                    pull_latest_changes
                    ;;
                2)
                    push_all_changes "$PARAM_MSG"
                    ;;
                3)
                    echo "👋 Exiting."
                    exit 0
                    ;;
                *)
                    echo "❌ Invalid choice. Please run with option 1 or 2."
                    exit 1
                    ;;
            esac
        else
            echo "Usage:"
            echo "  ./sync.sh 1 (or ./sync.sh pull) -> Check for updates and pull code before starting"
            echo "  ./sync.sh 2 \"message\" (or ./sync.sh push \"message\") -> Push all code changes when finished"
        fi
        ;;
esac
