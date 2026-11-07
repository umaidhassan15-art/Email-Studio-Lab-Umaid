#!/usr/bin/env node
// Headless email review. Runs Claude Code on one campaign folder and saves
// the findings to review/findings.json.
//
// Usage: node scripts/review.mjs campaigns/<campaign-name>
// Exit codes: 0 = no high-severity findings, 1 = at least one high finding,
//             2 = the review could not run.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = path.join(root, "review", "findings.schema.json");
const outPath = path.join(root, "review", "findings.json");

function fail(message) {
  console.error(`review: ${message}`);
  process.exit(2);
}

const folder = process.argv[2];
if (!folder) fail("give a campaign folder, e.g. node scripts/review.mjs campaigns/steep-club-launch");
if (!existsSync(path.resolve(root, folder))) fail(`folder not found: ${folder}`);

// On Windows the npm "claude" command is a .cmd wrapper, which Node can't run
// without a shell (and a shell would mangle the JSON schema argument).
// So call the real claude.exe directly when we can find it.
function findClaude() {
  if (process.env.CLAUDE_BIN) return process.env.CLAUDE_BIN;
  if (process.platform === "win32" && process.env.APPDATA) {
    const exe = path.join(process.env.APPDATA, "npm", "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
    if (existsSync(exe)) return exe;
  }
  return "claude";
}

const schema = readFileSync(schemaPath, "utf8");
const prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. ` +
  `Report only real problems.`;

const run = spawnSync(
  findClaude(),
  ["-p", prompt, "--output-format", "json", "--json-schema", schema, "--allowedTools", "Read,Glob,Grep"],
  { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
);

if (run.error) fail(`could not start claude: ${run.error.message}`);
if (run.status !== 0) fail(`claude exited with code ${run.status}\n${run.stderr || run.stdout}`);

let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch {
  fail(`claude output was not JSON:\n${run.stdout.slice(0, 2000)}`);
}

// The output is either one result object, or a list of messages whose last item is the result.
const result = Array.isArray(parsed) ? parsed.at(-1) : parsed;
const output = result?.structured_output;
if (!output || !Array.isArray(output.findings)) {
  fail(`no structured_output with findings in the result:\n${JSON.stringify(result, null, 2).slice(0, 2000)}`);
}

mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

const count = { high: 0, medium: 0, low: 0 };
for (const f of output.findings) count[f.severity] = (count[f.severity] ?? 0) + 1;

console.log(
  `${folder}: ${output.findings.length} findings (${count.high} high, ${count.medium} medium, ${count.low} low) → review/findings.json`,
);
process.exit(count.high > 0 ? 1 : 0);
