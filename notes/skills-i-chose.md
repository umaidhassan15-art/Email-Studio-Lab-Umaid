# Skills I chose

Researched on 4 November 2026 using `npx skills find` (skills.sh) and the GitHub API.
Nothing has been installed yet.

## Use these

**1. For writing campaigns: `anthropics/knowledge-work-plugins`**
- Published by Anthropic, the company that makes Claude. It is an official organisation account on GitHub.
- About 34,600 stars, Apache-2.0 licence, updated today.
- It came up in two of my searches with the skills I actually need: `campaign-plan` (about 3,300 installs) and `email-sequence` (about 3,000 installs). It also has `draft-content` and `content-creation`.
- Install later with, for example: `npx skills add anthropics/knowledge-work-plugins@campaign-plan`

**2. For sending email: `resend/resend-skills`**
- Published by Resend, the email-sending company, from its own official GitHub organisation.
- About 210 stars, MIT licence, updated yesterday. The star count is modest because the repo is new (January 2026), but the publisher is the company itself, and its `resend` skill has about 24,200 installs.
- It covers sending email, the Resend command-line tool and inboxes. Resend also publishes `resend/email-best-practices` (deliverability tips) and `resend/react-email` (about 19,900 stars) for building email layouts. Those are worth adding later.
- Install later with: `npx skills add resend/resend-skills@resend`

*An honourable mention:* `coreyhaines31/marketingskills` has the most stars of anything I found (about 58,300) and very high install counts for `email-sequence`, `emails` and `copywriting`. It belongs to one person, not a company, but it is widely used and MIT-licensed. Read it before deciding; it could sit alongside the Anthropic skills.

## Avoid these

**1. `caffeinelabs/skills` (`extension-email-marketing`)**
- It shows about 29,700 installs, but its GitHub repo has only **2 stars and 1 fork**.
- Real popularity doesn't look like that. Install counts can be inflated, so the gap is a warning sign. The name is also vague, and it is not clear who Caffeine Labs is.

**2. `mbfinotti/sales-skills` (for example `sales-outbound-sequence`, `cold-email-deliverability`)**
- It shows about 32,000 installs per skill, but the repo has only **3 stars and 0 forks**, and it was created only in September 2026.
- It belongs to one person and has dozens of near-identical skills, each with almost the same install count. That pattern looks more like padded numbers than real use. It is also aimed at cold sales outreach, not at marketing to people who signed up.

*Also skip:* the many small, unofficial "resend" copies (for example `jsv-capital/resend-skill`, whose GitHub repo can't be found, and `skills.volces.com` mirrors). When the official Resend version exists, a copy adds risk and nothing else.

## How I decided

Three things to check before installing any skill:

1. **Who publishes it?** Choose the official organisation for the product (`anthropics`, `resend`) over copies from people you don't know. Open the GitHub page and confirm the owner is the real company.
2. **Do the stars match the installs?** Many installs with almost no stars or forks means the numbers may be fake. Also check that the repo was updated recently and has a licence.
3. **Have you read what it does?** A skill is instructions plus sometimes scripts that run on your computer. Open its `SKILL.md` and any script files on GitHub before installing. Look for anything that sends data somewhere unexpected, asks for API keys it shouldn't need, or runs commands you don't understand.
