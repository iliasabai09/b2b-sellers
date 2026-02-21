export function normalizeKzPhone(raw: string): string {
  let p = raw.trim().replace(/\s|\-|\(|\)/g, '');
  if (p.startsWith('8')) p = '+7' + p.slice(1);
  if (p.startsWith('7')) p = '+7' + p.slice(1);
  if (!p.startsWith('+')) p = '+' + p;
  return p;
}

export function generateOtp6(): string {
  // 000000..999999 (лучше 100000..999999, но пусть будет так для тестов)
  return Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');
}
