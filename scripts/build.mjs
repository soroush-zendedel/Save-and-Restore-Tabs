import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(root, "dist");
const outputDir = path.join(outputRoot, "firefox-extension");
const extensionFiles = [
  "manifest.json",
  "popup.html",
  "popup.css",
  "popup.js",
  "loader.html",
  "loader.css",
  "loader.js",
];

if (!outputDir.startsWith(`${outputRoot}${path.sep}`)) {
  throw new Error("Refusing to write outside the dist directory.");
}

await mkdir(outputRoot, { recursive: true });
await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const file of extensionFiles) {
  await cp(path.join(root, file), path.join(outputDir, file));
}

const outputFiles = (await readdir(outputDir)).sort();
const expectedFiles = [...extensionFiles].sort();
if (JSON.stringify(outputFiles) !== JSON.stringify(expectedFiles)) {
  throw new Error("Build output does not match the expected extension files.");
}

console.log(`Built ${outputFiles.length} extension files in ${path.relative(root, outputDir)}.`);
