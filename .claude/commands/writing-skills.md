---
name: writing-skills
description: Use when creating a new skill or improving an existing skill to follow the TDD methodology for skill writing
---

# Writing Skills

Skill creation mirrors Test-Driven Development applied to documentation.

**Core principle:** If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing.

## The Iron Law

```
NO SKILL WITHOUT A FAILING TEST FIRST
```

## RED-GREEN-REFACTOR for Skills

**RED:** Run baseline scenarios without the skill. Document exactly how agents fail and what rationalizations they use.

**GREEN:** Write minimal skill addressing those specific observed failures. Nothing more.

**REFACTOR:** Run scenarios again. Document new rationalizations or loopholes. Add explicit counters for each one. Repeat until the skill enforces the intended behavior.

## Skill Structure

```
skill-name/
├── SKILL.md (required)
└── supporting files (only when needed)
```

Skills live in a flat namespace. Supporting files only when you have heavy reference material or reusable tools that would bloat SKILL.md.

## SKILL.md Format

```markdown
---
name: skill-name
description: Use when [specific triggering conditions and symptoms]
---

# Skill Name

## Overview
Core principle in one sentence.

## When to Use
(Flowchart only if decision is non-obvious)

## [Main content]

## Common Mistakes / Rationalizations
| Excuse | Reality |
|--------|---------|
| "..." | "..." |
```

## Description Field Rules

The description is the PRIMARY triggering mechanism. It determines whether Claude invokes the skill.

**Must:**
- Start with "Use when..."
- Include specific symptoms, error messages, use-case contexts
- Stay under 500 characters
- Focus on triggering conditions only

**Must NOT:**
- Summarize the workflow (agents follow the description instead of reading the skill)
- Use first-person language
- Be vague or abstract

**Bad:** `"How to debug software problems"`
**Good:** `"Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes"`

## Content Quality Standards

- **Word count:** Getting-started workflows <150 words; frequently-loaded skills <200 words total
- **Examples:** One excellent example beats multiple mediocre ones
- **Flowcharts:** Only for non-obvious decisions
- **Rationalizations table:** REQUIRED for discipline-enforcing skills — list every expected excuse and counter it

## Search Optimization

Use concrete language that matches how agents describe problems:
- Tool names and error messages
- Specific symptoms ("race conditions", "flaky tests", "timeout/hang")
- Synonyms for the same concept
- Concrete contexts, not abstract concepts

## Testing by Skill Type

| Skill type | Test with |
|------------|-----------|
| Discipline skills (TDD, verification) | Pressure scenarios combining multiple stressors |
| Technique skills (debugging, planning) | Application and edge-case scenarios |
| Pattern skills | Recognition and counter-example testing |
| Reference skills | Retrieval and application scenarios |

## Deployment Checklist

Complete ALL of these before moving to the next skill:

- [ ] Ran baseline scenario without skill — documented failures
- [ ] Wrote minimal skill addressing those failures
- [ ] Ran scenario with skill — verified compliance
- [ ] Identified new rationalizations — added counters
- [ ] Re-ran until behavior is correct
- [ ] Description starts with "Use when..." and is under 500 chars
- [ ] Skill file is under 200 words (or justified if longer)
- [ ] One excellent example included

**Never deploy untested skills — not for "simple additions" or "just documentation updates."**
