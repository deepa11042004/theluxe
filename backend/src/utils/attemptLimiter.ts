// Tiny in-memory attempt limiter (single backend instance). Keyed by a caller-chosen string such as "login:<email>".
// Used instead of per-IP limiting because behind the proxy chain every visitor can share one IP.
interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

function live(key: string): Bucket | undefined {
  const b = buckets.get(key);
  if (b && b.resetAt <= Date.now()) {
    buckets.delete(key);
    return undefined;
  }
  return b;
}

export function isBlocked(key: string, max: number): boolean {
  const b = live(key);
  return !!b && b.count >= max;
}

export function recordAttempt(key: string, windowMs: number): void {
  const b = live(key);
  if (b) b.count += 1;
  else buckets.set(key, { count: 1, resetAt: Date.now() + windowMs });
}

export function clearAttempts(key: string): void {
  buckets.delete(key);
}

// Keep the map from growing forever
setInterval(() => {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
}, 10 * 60 * 1000).unref();
