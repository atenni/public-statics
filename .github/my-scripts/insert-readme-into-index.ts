import * as path from "https://deno.land/std/path/mod.ts";

// @deno-types="npm:@types/marked"
import { marked } from "npm:marked";

const ROOT = path.join(path.fromFileUrl(Deno.mainModule), "/../../../");
const readme = path.join(ROOT, "README.md");

const markdown = await Deno.readTextFile(readme);
const html = marked.parse(markdown);

const oldIndex = await Deno.readTextFile(path.join(ROOT, "index.html"));
const newIndex = oldIndex.replace(
  /<body>.*<\/body>/is,
  `<body>
  <!-- =============================================================== -->
  <!--                        DO NOT EDIT                              -->
  <!-- <body> content auto generated from README.md via GitHub Actions -->
  <!-- =============================================================== -->

 ${html}</body>`,
);

await Deno.writeTextFile(path.join(ROOT, "index.html"), newIndex);

/**
 * NODE VERSION
 * ============
 *
 * node --experimental-network-imports .github/my-scripts/insert-readme-into-index.mjs
 *
 * `--experimental-network-imports` allow ESM imports from a URL. Available in
 * Node as of v16.15.0 so GitHub Actions setup-node needs to be > v16.15 for
 * this to work
 * https://nodejs.org/api/cli.html#--experimental-network-imports
 */
