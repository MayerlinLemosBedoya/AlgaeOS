// Simple global store for config/env using Zustand
import { create } from 'zustand'

export const useStore = create((set) => ({
  contract: import.meta.env.VITE_CONTRACT || '',
  pyusd: import.meta.env.VITE_PYUSD || '',
  pyth: import.meta.env.VITE_PYTH || '',
  entropy: import.meta.env.VITE_ENTROPY || '',
  beneficiary: import.meta.env.VITE_BENEFICIARY || '',
  feedId: import.meta.env.VITE_PYTH_USD_FEED_ID || '',
  set: (patch) => set(patch),
}))

