import * as esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };
import tsconfig from "./tsconfig.json" assert { type: "json" };
import { writeFile, rm } from "fs/promises";
import { exec } from "node:child_process"
import { basename, extname } from "node:path";

// strip extension
const noext = (filename) => basename(filename, extname(filename))

/* Map of entry points. 
Key is the export name, value is the file name (relative to src) */
const exports = {
	".": "index.ts",
};

try {
  await rm("dist", { recursive: true });
} catch {}

esbuild.build({
	entryPoints: Object.values(exports).map((value) => `./src/${value}`),
	bundle: true,
	outdir: "dist",
	platform: "neutral",
	target: "esnext",
});

Object.entries(exports).forEach(([key, value]) => {
	pkg.exports[key] = {
		import: `./dist/${noext(value)}.js`,
    types: `./dist/${noext(value)}.d.ts`,
	};
});

tsconfig.include = Object.values(exports).map((value) => `./src/${value}`)

await writeFile("tsconfig.json", JSON.stringify(tsconfig, null, 2))
exec("npx tsc")
writeFile("package.json", JSON.stringify(pkg, null, 2))