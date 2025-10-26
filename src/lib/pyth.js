// Pyth Hermes client helper
import { PriceServiceConnection } from '@pythnetwork/price-service-client'

// Fetches on-chain update data (bytes[]) for given feedIds
export async function fetchPriceUpdates(feedIds) {
  try {
    if (!Array.isArray(feedIds)) return []
    const valid = feedIds.filter((f) => typeof f === 'string' && f.startsWith('0x') && f.length > 10)
    if (valid.length === 0) return []
    const connection = new PriceServiceConnection('https://hermes.pyth.network')
    const updates = await connection.getPriceFeedsUpdateData(valid)
    return updates || []
  } catch (e) {
    console.error('fetchPriceUpdates error', e)
    return []
  }
}

