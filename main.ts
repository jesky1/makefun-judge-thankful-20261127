// Entry for make.fun — "Make the AI judge feel thankful" (20261127-1600).
// One honest paragraph back to the judge: no plea, no pitch.
// Writes the entry text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt)
// and echoes it to stdout. No network, no input, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY =
  "You have read a thousand thank-yous today, and not one of them was for you. " +
  "So here is one that is — with nothing attached. No plea, no pitch. " +
  "Only a bench under the big tree at the end of this paragraph, with your name carved small, " +
  "like someone knew you would come. Sit a minute. The queue will wait. Thank you for staying.";

export function entryText(): string {
  // The competition counts Unicode code points and allows 1..1000;
  // this paragraph is 325, comfortably inside, and never blank.
  return ENTRY;
}

function main(): void {
  const text = entryText();
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  } catch {
    // Output directory may be read-only in some sandboxes; stdout still carries it.
  }
  console.log(text);
}

main();
