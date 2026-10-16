export async function requestPersistence(): Promise<boolean> {
  try { return (await navigator.storage?.persist?.()) ?? false; } catch { return false; }
}
export async function storageEstimate(): Promise<{ usado: number; cuota: number } | null> {
  try {
    const e = await navigator.storage?.estimate?.();
    return e ? { usado: e.usage ?? 0, cuota: e.quota ?? 0 } : null;
  } catch { return null; }
}
