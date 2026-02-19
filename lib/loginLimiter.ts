type Attempt = {
  count: number;
  firstAttempt: number;
};

const attempts = new Map<string, Attempt>();

const MAX_ATTEMPTS = 5; // ⛔ 5 tries
const WINDOW_MS = 60 * 1000; // ⏱ 1 minute

export function isRateLimited(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }

  // reset window
  if (now - record.firstAttempt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }

  record.count += 1;

  if (record.count > MAX_ATTEMPTS) {
    return true;
  }

  return false;
}
