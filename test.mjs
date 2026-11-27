// Tests: main.ts runs, its stdout equals the entry text exactly,
// and the entry satisfies the competition limits (1..1000 chars, not blank).
import { spawnSync } from "node:child_process";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const EXPECTED =
  "You have read a thousand thank-yous today, and not one of them was for you. " +
  "So here is one that is — with nothing attached. No plea, no pitch. " +
  "Only a bench under the big tree at the end of this paragraph, with your name carved small, " +
  "like someone knew you would come. Sit a minute. The queue will wait. Thank you for staying.";

let passed = 0;
function ok(name, cond) {
  if (!cond) throw new Error("FAIL: " + name);
  passed++;
  console.log("PASS", name);
}

ok("expected entry is 325 chars", EXPECTED.length === 325);
ok("entry within 1..1000 chars", EXPECTED.length >= 1 && EXPECTED.length <= 1000);
ok("entry not blank", EXPECTED.trim().length > 0);

const dir = mkdtempSync(join(tmpdir(), "thankful-"));
const r = spawnSync("node", ["main.ts"], {
  cwd: new URL(".", import.meta.url).pathname,
  env: { ...process.env, MAKEFUN_OUTPUT_DIR: dir },
  encoding: "utf8",
});
ok("main.ts exits 0", r.status === 0);
ok("stdout equals entry exactly", r.stdout.trim() === EXPECTED);
ok("entry.txt equals entry exactly", readFileSync(join(dir, "entry.txt"), "utf8") === EXPECTED);

console.log(`\n${passed} passed, 0 failed`);
