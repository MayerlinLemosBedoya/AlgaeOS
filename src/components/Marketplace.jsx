import { useState } from 'react'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'

const MARKETPLACE_CONTRACT = import.meta.env.VITE_MARKETPLACE_CONTRACT || ""

// Mock biomass lots data
const biomassLots = [
  {
    id: 1,
    campaign: "Mississippi River Restoration",
    amount: 1000, // kg
    price: 1000, // PYUSD
    seller: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    status: "available",
    harvestDate: "2024-01-15",
    quality: "Premium",
    location: "New Orleans, LA"
  },
  {
    id: 2,
    campaign: "Colorado River Cleanup",
    amount: 500,
    price: 600,
    seller: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    status: "available",
    harvestDate: "2024-01-20",
    quality: "Standard",
    location: "Grand Canyon, AZ"
  },
  {
    id: 3,
    campaign: "Hudson River Revival",
    amount: 750,
    price: 800,
    seller: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    status: "sold",
    harvestDate: "2024-01-10",
    quality: "Premium",
    location: "New York, NY"
  }
]

export function Marketplace() {
  const [selectedLot, setSelectedLot] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const { write: purchaseLot, data: purchaseData } = useContractWrite({
    address: MARKETPLACE_CONTRACT,
    abi: [], // ABI would be imported from contract artifacts
    functionName: 'purchaseLot',
  })

  const { isLoading: isPurchasing } = useWaitForTransaction({
    hash: purchaseData?.hash,
  })

  const handlePurchase = async (lotId) => {
    try {
      await purchaseLot({
        args: [lotId],
      })
    } catch (error) {
      console.error('Purchase error:', error)
    }
  }

  const filteredLots = biomassLots.filter(lot => 
    filterStatus === 'all' || lot.status === filterStatus
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Biomass Marketplace</h2>
        <p className="text-white/70">
          Purchase harvested microalgae biomass in PYUSD. Each lot is verified and linked to completed restoration campaigns.
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 bg-white/5 rounded-xl p-1">
        {['all', 'available', 'sold'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg transition-all capitalize ${
              filterStatus === status
                ? 'bg-emerald-400 text-black font-semibold'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Biomass Lots */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            className={`rounded-2xl border p-6 ${
              lot.status === 'sold' ? 'border-gray-400/20 bg-gray-400/5' : 'border-white/10 bg-white/5'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{lot.campaign}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                lot.status === 'available' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-gray-400/20 text-gray-300'
              }`}>
                {lot.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Amount:</span>
                <span>{lot.amount} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Price:</span>
                <span className="font-semibold">{lot.price} PYUSD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Quality:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  lot.quality === 'Premium' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-blue-400/20 text-blue-300'
                }`}>
                  {lot.quality}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Harvest:</span>
                <span>{lot.harvestDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Location:</span>
                <span>{lot.location}</span>
              </div>
            </div>

            <div className="text-xs text-white/50 mb-4">
              Seller: {lot.seller.slice(0, 6)}...{lot.seller.slice(-4)}
            </div>

            {lot.status === 'available' && (
              <button
                onClick={() => handlePurchase(lot.id)}
                disabled={isPurchasing}
                className="w-full px-4 py-2 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 disabled:opacity-50"
              >
                {isPurchasing ? 'Processing...' : 'Purchase Lot'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Marketplace Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold mb-2">Total Volume</h3>
          <p className="text-2xl font-bold text-emerald-300">2,250 kg</p>
          <p className="text-sm text-white/70">Biomass traded</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold mb-2">Total Value</h3>
          <p className="text-2xl font-bold text-emerald-300">2,400 PYUSD</p>
          <p className="text-sm text-white/70">Market value</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold mb-2">Active Lots</h3>
          <p className="text-2xl font-bold text-emerald-300">2</p>
          <p className="text-sm text-white/70">Available for purchase</p>
        </div>
      </div>
    </div>
  )
}
