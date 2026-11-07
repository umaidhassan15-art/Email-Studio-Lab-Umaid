---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails by lead group

Campaign folder: $ARGUMENTS

## 1. Check the campaign folder

- If no campaign folder was given above, stop. Use Glob on `campaigns/*/` and reply with the list of campaign folders that exist, then ask which one to use. Write nothing.
- Accept either a full path (`campaigns/steep-club-launch`) or just the name (`steep-club-launch`). A bare name means `campaigns/<name>`.
- If the folder has no `emails/*.md` files, stop and say so. Write nothing.

## 2. Read what you need

1. Every email in `<campaign folder>/emails/*.md`. Only the files directly in that folder, not anything under `groups/`.
2. `brand/voice.md`, for who each group is and the words and claims to avoid.
3. `.claude/rules/emails.md`, for the email file rules.
4. The campaign's `plan.md` and `sequence.md`, if they exist, for context.
5. `leads/leads.csv`. Read only the `group` column, to get the list of groups. Expect `tea-curious`, `gift-buyers` and `daily-drinkers`. If you find a different group name, stop and report it instead of guessing.

Never copy names, email addresses or any other details about a person from `leads.csv` into an email. Keep `{{first_name}}` as the greeting.

## 3. Write one version per email per group

Only write a version for a group that actually gets that email. If `sequence.md` (or `plan.md`) says a group doesn't get an email, for example "Gift buyers get Email 1 only", skip that email for that group and count it as skipped.

Who each group is (from `brand/voice.md`):

- **tea-curious**: 28 to 40, works full-time, often from home, drinks a few coffees a day, curious about loose-leaf tea but a bit put off by it. Wants a calmer afternoon.
- **gift-buyers**: looking for a thoughtful present for someone else.
- **daily-drinkers**: already drink tea every day and want something better than supermarket bags.

For each email and each group, change only two things:

1. **The opening line**: the first sentence after the `Hi {{first_name}},` greeting. Rewrite it so it speaks to that group.
2. **One example**: one sentence or phrase in the body that shows the box in use. Swap it for an example that fits the group (for instance a work-from-home afternoon break, a gift for a friend, or the first cup of a daily routine). Change one example only.

Keep everything else exactly the same, word for word:

- The `Subject:` and `Preview:` lines.
- The greeting, the headings and the order of the sections.
- Every fact: teas, prices, dates, shipping, renewal and cancel wording.
- The single main link, with the same button text and URL.
- The sign-off and the footer.

Your new lines must follow `brand/voice.md`: plain, warm words; no health promises; no fake urgency; no "customers" or "subscription"; no new claims, numbers, reviews or facts that aren't already in the email.

## 4. Save the files

- Save each version to `<campaign folder>/groups/<group>/emails/<same file name>`.
- Write only inside `<campaign folder>/groups/`. Never change the original emails.
- If a file already exists at a target path, don't overwrite it. Skip it and count it as skipped.

Before you finish, check each new file against `.claude/rules/emails.md`, and compare it with the original. Only the opening line and one example should differ.

## 5. Reply with a short summary only

Reply with nothing else:

- How many files you wrote (and how many you skipped, if any).
- One example opening line per group, for example:

  Wrote 12 files (4 emails × 3 groups).
  - tea-curious: "…"
  - gift-buyers: "…"
  - daily-drinkers: "…"
