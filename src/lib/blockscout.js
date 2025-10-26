// Blockscout link helpers for Base Sepolia
export function txLink(tx) {
  if (!tx) return ''
  return `https://base-sepolia.blockscout.com/tx/${tx}`
}

export function addrLink(a) {
  if (!a) return ''
  return `https://base-sepolia.blockscout.com/address/${a}`
}

