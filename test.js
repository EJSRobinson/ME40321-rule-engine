import { plots } from './exporters.js';
import * as fs from 'fs';
import { Blob } from 'node:buffer';
async function saveFile(blob) {
  const buffer = Buffer.from(await blob.arrayBuffer());

  fs.writeFile('plot.png', buffer, () => console.log('Saved!'));
}

// function main(pngstring) {
//   const blob = new Blob([pngstring], { type: 'image/png' });
//   saveFile(blob);
// }
async function main() {
  let test = await plots.test();
  const blob = new Blob([test], { type: 'image/png' });
  saveFile(blob);
}
main();
// saveFile();
