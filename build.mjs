// Baut dist/rowapa.js und dist/rowapa.css aus src/. Aufruf: npm run build
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { transform } from "esbuild";
const ORDER = ["icons", "core", "hero", "themen", "sections", "vorgehen", "digital", "ende"];
const banner = `/* ROWAPA 2027 · Startseite · ${new Date().toISOString().slice(0, 10)} · Quelle: github.com/ROWAPA-Konzepte/rowapa-website */\n`;
mkdirSync("dist", { recursive: true });
const js = ORDER.map(f => readFileSync(`src/${f}.js`, "utf8")).join("\n;\n");
const css = readFileSync("src/rowapa.css", "utf8");
const mj = await transform(js, { loader: "js", minify: true, target: "es2020", legalComments: "none" });
const mc = await transform(css, { loader: "css", minify: true, legalComments: "none" });
writeFileSync("dist/rowapa.js", banner + mj.code);
writeFileSync("dist/rowapa.css", banner + mc.code);
console.log("rowapa.js", (mj.code.length / 1024).toFixed(1), "KB · rowapa.css", (mc.code.length / 1024).toFixed(1), "KB");
