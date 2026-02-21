import fs from 'node:fs';
import path from 'node:path';

const partsDir = path.resolve('prisma/schema');
const outFile = path.resolve('prisma/schema.prisma');

const files = fs
  .readdirSync(partsDir)
  .filter((f) => f.endsWith('.prisma'))
  .sort();

const content = files
  .map((f) => fs.readFileSync(path.join(partsDir, f), 'utf8').trim())
  .join('\n\n');

fs.writeFileSync(outFile, content + '\n');
console.log(`✅ schema.prisma generated from ${files.length} files`);
