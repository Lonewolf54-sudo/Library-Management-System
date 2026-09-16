const delay = (value) => new Promise((resolve) => window.setTimeout(() => resolve(value), 120));

export async function mockResponse(value) {
  return delay(structuredClone(value));
}
