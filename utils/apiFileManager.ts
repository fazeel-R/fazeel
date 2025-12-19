import { promises as fs } from 'fs';
import * as path from 'path';

const BASE_PATH = path.resolve(process.cwd(), 'test-data', 'api');

async function ensureDir() {
  await fs.mkdir(BASE_PATH, { recursive: true });
}

export async function writeApiJson(
  fileName: string,
  data: unknown
): Promise<void> {
  await ensureDir();
  const filePath = path.join(BASE_PATH, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function readApiJson<T = any>(
  fileName: string
): Promise<T> {
  const filePath = path.join(BASE_PATH, fileName);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}
