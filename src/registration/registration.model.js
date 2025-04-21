import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.resolve(__dirname, '../database/registration.json');

async function getRecords() {
  try {
    const content = await readFile(DB_FILE, 'utf8');
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export async function save(payload) {
  const records = await getRecords();

  const id = records.length + 1;
  records.push({ id, ...payload });
  await writeFile(DB_FILE, JSON.stringify(records, null, 2), 'utf8');
  return id;
}
