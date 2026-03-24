---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
---

# Systematic Debugging

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

**Violating the letter of this process is violating the spirit of debugging.**

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## When to Use

Use for ANY technical issue: test failures, bugs in production, unexpected behavior, performance problems, build failures, integration issues.

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

## The Four Phases

You MUST complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully** — don't skip past errors or warnings; read stack traces completely; note line numbers, file paths, error codes

2. **Reproduce Consistently** — can you trigger it reliably? What are the exact steps? If not reproducible → gather more data, don't guess

3. **Check Recent Changes** — what changed that could cause this? Git diff, recent commits, new dependencies, config changes

4. **Gather Evidence in Multi-Component Systems**

   For systems with multiple components (CI → build → signing, API → service → database): add diagnostic instrumentation at each component boundary BEFORE proposing fixes.

   ```bash
   # Example: log what enters and exits each layer
   echo "=== Layer 1 state: ==="
   env | grep RELEVANT_VAR || echo "RELEVANT_VAR not in environment"
   echo "=== Layer 2 state: ==="
   # etc.
   ```

   This reveals which layer fails.

5. **Trace Data Flow** — where does the bad value originate? What called this with the bad value? Keep tracing up until you find the source. Fix at source, not at symptom.

### Phase 2: Pattern Analysis

1. Find working examples — locate similar working code in the same codebase
2. Compare against references — read reference implementations COMPLETELY (don't skim)
3. Identify differences — list every difference, however small
4. Understand dependencies — what does this need? What assumptions does it make?

### Phase 3: Hypothesis and Testing

1. **Form Single Hypothesis** — "I think X is the root cause because Y"
2. **Test Minimally** — make the SMALLEST possible change to test it; one variable at a time
3. **Verify Before Continuing** — if it works → Phase 4; if not → form NEW hypothesis; do NOT add more fixes on top

### Phase 4: Implementation

1. Create a failing test case first (use `superpowers:test-driven-development`)
2. Implement single fix addressing root cause
3. Verify: test passes, no other tests broken
4. **If 3+ fixes failed:** STOP and question the architecture

   **Pattern indicating architectural problem:**
   - Each fix reveals new shared state/coupling in a different place
   - Fixes require "massive refactoring"
   - Each fix creates new symptoms elsewhere

   Discuss with the user before attempting more fixes.

## Red Flags — STOP and Follow Process

If you catch yourself thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Add multiple changes, run tests"
- "It's probably X, let me fix that"
- "I don't fully understand but this might work"
- "One more fix attempt" (when already tried 2+)
- Each fix reveals new problem in a different place

**ALL of these mean: STOP. Return to Phase 1.**

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "Multiple fixes at once saves time" | Can't isolate what worked. Causes new bugs. |
| "One more fix attempt" (after 2+) | 3+ failures = architectural problem. Question pattern. |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|------------------|
| **1. Root Cause** | Read errors, reproduce, check changes, gather evidence | Understand WHAT and WHY |
| **2. Pattern** | Find working examples, compare | Identify differences |
| **3. Hypothesis** | Form theory, test minimally | Confirmed or new hypothesis |
| **4. Implementation** | Create test, fix, verify | Bug resolved, tests pass |

## Real-World Impact

- Systematic approach: 15-30 minutes to fix
- Random fixes approach: 2-3 hours of thrashing
- First-time fix rate: 95% vs 40%
- New bugs introduced: Near zero vs common
