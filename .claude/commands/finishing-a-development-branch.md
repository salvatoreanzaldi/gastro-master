---
name: finishing-a-development-branch
description: Use when development work is complete and ready to wrap up — verifies tests, presents merge/PR/keep/discard options, and cleans up worktrees
---

# Finishing a Development Branch

Complete development work through structured verification and decision-making.

**Core flow:** Verify tests → Present options → Execute choice → Clean up.

## Step 1: Verify Tests Pass

Run the project's test suite before anything else.

```bash
npm test        # Node.js
cargo test      # Rust
pytest          # Python
go test ./...   # Go
```

**If tests fail:** Stop. Do not proceed to Step 2. Fix failures first.

**If tests pass:** Continue.

## Step 2: Determine Base Branch

Identify the branch this feature branch was created from (typically `main` or `master`).

```bash
git log --oneline main..HEAD  # or master..HEAD
```

## Step 3: Present Exactly 4 Options

Present these choices to the user — no more, no fewer:

1. **Merge back to base branch locally**
2. **Push and create a Pull Request**
3. **Keep the branch as-is for later**
4. **Discard this work**

## Step 4: Execute the Chosen Option

### Option 1: Merge locally
```bash
git checkout main
git merge --no-ff feature-branch
# Run tests again on merged result
# Clean up worktree
git worktree remove <path>
```

### Option 2: Push and PR
```bash
git push -u origin feature-branch
gh pr create --title "..." --body "..."
# Keep worktree (branch still active)
```

### Option 3: Keep branch
```bash
# No action needed
# Keep worktree (work preserved)
```

### Option 4: Discard
```bash
# Require typed confirmation first:
# "Type 'discard' to confirm"
git worktree remove <path>
git branch -D feature-branch
```

## Critical Safeguards

| Rule | Why |
|------|-----|
| Always verify tests before offering options | Can't merge broken code |
| Require typed "discard" to confirm deletion | Prevents accidental loss of work |
| Only clean up worktree for Options 1 and 4 | Options 2 and 3 need the branch to persist |
| Never merge without re-verifying tests on merged result | Merge can introduce conflicts |

## Common Mistakes

- Skipping test verification before offering options
- Offering ambiguous options instead of the four structured choices
- Removing worktrees for PR/keep options
- Deleting work without explicit typed confirmation
