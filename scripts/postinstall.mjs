#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");
const schemaPath = join(repoRoot, "prisma", "schema.prisma");
const cacheDir = join(repoRoot, "node_modules", ".cache", "smartplay");
const hashFile = join(cacheDir, "prisma-schema.hash");

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function hashSchema() {
  const contents = await readFile(schemaPath, "utf8");
  return createHash("sha256").update(contents).digest("hex");
}

async function runPrismaGenerate() {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["prisma", "generate"], {
      cwd: repoRoot,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    child.on("exit", (code) => {
      code === 0 ? resolve() : reject(new Error(`prisma generate exited ${code}`));
    });
    child.on("error", reject);
  });
}

async function main() {
  if (!(await fileExists(schemaPath))) {
    console.log("[postinstall] No prisma/schema.prisma; skipping.");
    return;
  }

  const current = await hashSchema();
  let previous = null;
  if (await fileExists(hashFile)) {
    previous = (await readFile(hashFile, "utf8")).trim();
  }

  if (previous === current) {
    console.log("[postinstall] Prisma schema unchanged — skipping generate.");
    return;
  }

  console.log("[postinstall] Prisma schema changed — generating client.");
  await runPrismaGenerate();

  await mkdir(cacheDir, { recursive: true });
  await writeFile(hashFile, current);
}

main().catch((err) => {
  console.error("[postinstall] Failed:", err);
  process.exit(1);
});
