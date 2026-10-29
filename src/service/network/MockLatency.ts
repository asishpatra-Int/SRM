// The backend isn't ready: mock services resolve after this stand-in
// round-trip so callers still show their busy state.
const MOCK_LATENCY_MS = 600;

export function withMockLatency<T>(result: T): Promise<T> {
  return new Promise(resolve => {
    globalThis.setTimeout(() => resolve(result), MOCK_LATENCY_MS);
  });
}
