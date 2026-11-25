import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Midnight Fridge Roast — one line, 90 characters.
// The joke targets the fridge's own petty rule: at midnight it locks
// itself, as if the leftovers took out a restraining order on its owner.
const LINE =
  "My smart fridge locks at midnight like the leftovers filed a restraining order against me.";

// The sealed gate scorer gives Valid 0 — and no prize — when the entry
// text is empty, whitespace-only, multi-line, or over 200 characters.
// Check the line against every one of those conditions before writing,
// and fail loudly instead of shipping a line that can never be judged.
function validateLine(line: string): void {
  if (line.length === 0) {
    throw new Error("entry line is empty (gate requires 1-200 characters)");
  }
  if (line.trim().length === 0) {
    throw new Error("entry line is only whitespace (gate requires non-whitespace text)");
  }
  if (line.length > 200) {
    throw new Error(
      `entry line is ${line.length} characters, over the 200-character gate limit`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line spans more than one line (gate requires exactly one line)");
  }
}

try {
  validateLine(LINE);
} catch (error) {
  console.error(`Invalid entry line: ${(error as Error).message}`);
  process.exit(1);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
