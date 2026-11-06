// Send guard: a PreToolUse hook for the Resend tools.
// It makes sure Claude only ever sends email to Resend's test addresses
// (anything ending in @resend.dev) or to my own address (MY_EMAIL).
// Exit 0 = allow. Exit 2 = block (the reason on stderr is shown to Claude).

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  process.stderr.write(`Send guard blocked this: ${reason}\n`);
  process.exit(2);
}

// Pull the bare address out of "Name <a@b.com>" or "a@b.com".
function bareAddress(value) {
  const text = String(value).trim();
  const match = text.match(/<([^>]+)>/);
  return (match ? match[1] : text).trim().toLowerCase();
}

// to, cc and bcc may be a list or a single string.
function listOf(field) {
  if (field === undefined || field === null) return [];
  return Array.isArray(field) ? field : [field];
}

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was stopped to be safe.");
}

const fullName = String(call.tool_name ?? "");
const name = fullName.split("__").pop();
const input = call.tool_input ?? {};

if (ALWAYS_BLOCK.has(name)) {
  block(`${name} can reach whole lists of people, so it is never allowed here.`);
}

if (!CHECK_RECIPIENTS.has(name)) process.exit(0);

const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();
const isAllowed = (addr) =>
  addr.endsWith("@resend.dev") || (myEmail !== "" && addr === myEmail);

const emails = name === "send-batch-emails" ? listOf(input.emails) : [input];
if (emails.length === 0) block("no emails were found in the request.");

for (const email of emails) {
  const addresses = ["to", "cc", "bcc"].flatMap((key) =>
    listOf(email?.[key]).map(bareAddress)
  );
  if (addresses.length === 0) block("an email had no recipients to check.");
  for (const addr of addresses) {
    if (!isAllowed(addr)) {
      block(
        `${addr} is not allowed. Only @resend.dev test addresses` +
          (myEmail ? ` and ${myEmail}` : "") +
          " can receive email from this studio."
      );
    }
  }
}

process.exit(0);
