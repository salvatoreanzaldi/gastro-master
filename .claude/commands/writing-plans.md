---
name: writing-plans
description: Use when about to implement a multi-step feature or fix to create a detailed step-by-step plan before any code is written
---

# Writing Plans

Create comprehensive implementation plans before development begins. Plans assume zero codebase familiarity — every step is explicit, every file path is exact, every command shows expected output.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Core philosophy:** DRY, YAGNI, TDD, Frequent commits.

## Before Writing Tasks

### Map File Structure

Understand what exists and where new code belongs:
- List affected files and their responsibilities
- Group files that change together (by feature, not by type)
- Prefer smaller focused files over large monolithic ones
- One clear responsibility per file

### Identify Subsystems

If the feature touches multiple independent subsystems, create separate plans for each. One plan per coherent unit of work.

## Task Structure

Each task follows this TDD pattern:

1. Write failing test (be specific: exact test name, file path, assertion)
2. Verify test fails with expected message
3. Write minimal implementation code
4. Verify test passes
5. Commit with descriptive message

**Task granularity:** 2-5 minutes of work per task. If it feels bigger, split it.

## Plan Document Format

Save to: `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`

```markdown
# Plan: <Feature Name>

**Goal:** One sentence describing what this implements.
**Architecture:** Brief description of how it fits in.
**Tech stack:** Relevant libraries/frameworks used.

---

## Task 1: <Descriptive name>

**Files affected:**
- `src/path/to/file.ts` — what changes here

**Steps:**

1. Write failing test in `src/path/to/file.test.ts`:
   ```typescript
   test('describes expected behavior', () => {
     // exact test code
   });
   ```

2. Run test and verify failure:
   ```bash
   npm test src/path/to/file.test.ts
   # Expected output: FAIL — "expected X got undefined"
   ```

3. Implement in `src/path/to/file.ts`:
   ```typescript
   // exact implementation code
   ```

4. Verify test passes:
   ```bash
   npm test src/path/to/file.test.ts
   # Expected output: PASS — 1/1 tests passing
   ```

5. Commit:
   ```bash
   git add src/path/to/file.ts src/path/to/file.test.ts
   git commit -m "feat: add X behavior"
   ```

---

## Task 2: ...
```

## Review Before Execution

After writing the plan, dispatch a plan-document-reviewer subagent to validate:
- All requirements are covered
- No ambiguous steps
- All file paths are valid
- Test assertions are correct

Fix issues and re-review (max 3 iterations, then surface to human).

## Execution Options

After plan approval, offer two paths:

1. **Subagent-driven** (`superpowers:subagent-driven-development`) — fresh agent per task, two-stage review after each
2. **Inline execution** (`superpowers:executing-plans`) — sequential execution with checkpoints

## Key Principles

- **Exact file paths** — no "create a file somewhere"
- **Complete code samples** — copy-paste ready, not pseudocode
- **Precise commands** with expected outputs
- **TDD throughout** — test before implementation, every time
- **Frequent commits** — one commit per task at minimum
- **YAGNI** — only what's needed for the current feature
