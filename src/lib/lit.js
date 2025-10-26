// Lit Protocol stub for demo signing
// This returns a placeholder string to be replaced by
// a real PKP-based signature flow later.
export async function litSignDemo(messageHex) {
  const prefix = typeof messageHex === 'string' ? messageHex.slice(0, 14) : '0x'
  return `lit-demo::${prefix}`
}

