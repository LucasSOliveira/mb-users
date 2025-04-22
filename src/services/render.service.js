import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_VIEWS = path.resolve(__dirname, "../views");
const DIST_DIR = path.resolve("dist");

async function renderDev(req, scriptSrc) {
  const vite = req.app.locals.vite;
  let template = await readFile(
    path.join(ROOT_VIEWS, "index.html"),
    "utf8"
  );

  template = template.replace(
    "<!-- INJECT:SCRIPT -->",
    `<script type="module" src="${scriptSrc}"></script>`
  );

  return await vite.transformIndexHtml(req.originalUrl, template);
}

async function renderProd(scriptSrc) {
  let html = await readFile(path.join(DIST_DIR, "index.html"), "utf8");

  const manifest = JSON.parse(
    await readFile(path.join(DIST_DIR, "/.vite/manifest.json"), "utf8")
  );

  const manifestPaths = manifest[scriptSrc];
  const pathsToCSS = manifestPaths?.css || [];

  if (pathsToCSS.length) {
    const csslinks = pathsToCSS?.map((css) => {
      return `<link rel="stylesheet" href="/${css}">`;
    });

    html = html.replace("<!-- INJECT:CSS -->", csslinks.join("\n"));
  }

  const pathToScript = manifestPaths.file;

  return html.replace(
    "<!-- INJECT:SCRIPT -->",
    `<script type="module" src="/${pathToScript}"></script>`
  );
}

export async function renderRegistrationPage(req, scriptSrc) {
  switch (process.env.NODE_ENV) {
    case "development":
      return await renderDev(req, scriptSrc);
    case "production":
      return await renderProd(scriptSrc);
    default:
      throw new Error("Invalid environment");
  }
}
