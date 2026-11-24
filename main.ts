// Ridiculous at First Glance, Real by the Second — entry program.
// Writes one sentence pitching a bizarre startup idea to /output/entry.txt.
// The entry is deliberately short: on an exact win-rate tie the smaller
// text places first, so every word has to earn its place.
//
// The pitch: unclaimed airline luggage, bought cheap at auction and resold
// as mystery boxes. The absurd premise (buying a stranger's suitcase
// sight unseen) turns out to be a real market: auctions sell the bags for
// pennies on the dollar, and travellers pay to gamble on what is inside.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "We buy unclaimed airline luggage at auction and resell it as mystery boxes, because travellers will pay to gamble on a stranger's suitcase.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space.
function checkGate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} characters, gate is 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// Empty only the contents of the output directory, never the directory
// itself: the grader's /output is a mounted directory and removing it fails.
function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  checkGate(ENTRY);
  emptyDir(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  const back = readFileSync(target, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry exactly");
  }
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
