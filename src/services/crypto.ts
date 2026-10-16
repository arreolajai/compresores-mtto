const enc = new TextEncoder();
const toHex = (b: ArrayBuffer | Uint8Array) => Array.from(b instanceof Uint8Array ? b : new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join('');
const fromHex = (h: string) => new Uint8Array((h.match(/.{2}/g) ?? []).map((x) => parseInt(x, 16)));

export const newId = (): string => crypto.randomUUID();
export const newSalt = (): string => toHex(crypto.getRandomValues(new Uint8Array(16)));

export async function hashPin(pin: string, saltHex: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: fromHex(saltHex), iterations: 100_000, hash: 'SHA-256' }, key, 256);
  return toHex(bits);
}
export async function verifyPin(pin: string, saltHex: string, hash: string): Promise<boolean> {
  return (await hashPin(pin, saltHex)) === hash;
}
