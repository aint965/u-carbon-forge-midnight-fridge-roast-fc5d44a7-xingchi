import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Midnight Fridge Roast — one line, 90 characters.
// The joke targets the fridge's own petty rule: at midnight it locks
// itself, as if the leftovers took out a restraining order on its owner.
const LINE =
  "My smart fridge locks at midnight like the leftovers filed a restraining order against me.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
