import { useState } from 'react'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'

const ESCROW_CONTRACT = import.meta.env.VITE_ESCROW_CONTRACT || ""
const PYUSD_TOKEN = import.meta.env.VITE_PYUSD_TOKEN || ""

// Mock campaigns data
const campaigns = [
  {
    id: 1,
    name: "Mississippi River Restoration",
    location: "New Orleans, LA",
    description: "Algae seeding to reduce nitrogen pollution and restore aquatic ecosystems",
    targetAmount: 10000,
    raisedAmount: 3500,
    status: "active",
    beneficiary: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  },
  {
    id: 2,
    name: "Colorado River Cleanup",
    location: "Grand Canyon, AZ",
    description: "Microalgae deployment to combat agricultural runoff and restore water quality",
    targetAmount: 15000,
    raisedAmount: 8200,
    status: "active",
    beneficiary: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
  },
  {
    id: 3,
    name: "Hudson River Revival",
    location: "New York, NY",
    description: "Urban river restoration using algae-based filtration systems",
    targetAmount: 8000,
    raisedAmount: 8000,
    status: "completed",
    beneficiary: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  }
]

export function SponsorCampaign() {
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [sponsorAmount, setSponsorAmount] = useState('')

  // Contract interactions would go here
  const { write: sponsorCampaign, data: sponsorData } = useContractWrite({
    address: ESCROW_CONTRACT,
    abi: [], // ABI would be imported from contract artifacts
    functionName: 'sponsorCampaign',
  })

  const { isLoading: isSponsoring } = useWaitForTransaction({
    hash: sponsorData?.hash,
  })

  const handleSponsor = async () => {
    if (!selectedCampaign || !sponsorAmount) return
    
    try {
      await sponsorCampaign({
        args: [selectedCampaign.id, sponsorAmount],
      })
    } catch (error) {
      console.error('Sponsor error:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Sponsor River Restoration</h2>
        <p className="text-white/70">
          Fund algae seeding campaigns with PYUSD. Your funds are escrowed until verified milestones are reached.
        </p>
      </div>

      {/* Campaign Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`rounded-2xl border p-6 cursor-pointer transition-all ${
              selectedCampaign?.id === campaign.id
                ? 'border-emerald-400 bg-emerald-400/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedCampaign(campaign)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{campaign.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                campaign.status === 'active' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-gray-400/20 text-gray-300'
              }`}>
                {campaign.status}
              </span>
            </div>
            <p className="text-sm text-white/70 mb-3">{campaign.location}</p>
            <p className="text-sm text-white/60 mb-4">{campaign.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Target: ${campaign.targetAmount.toLocaleString()}</span>
                <span>Raised: ${campaign.raisedAmount.toLocaleString()}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-emerald-400 h-2 rounded-full" 
                  style={{ width: `${(campaign.raisedAmount / campaign.targetAmount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sponsor Form */}
      {selectedCampaign && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">Sponsor {selectedCampaign.name}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount (PYUSD)</label>
              <input
                type="number"
                value={sponsorAmount}
                onChange={(e) => setSponsorAmount(e.target.value)}
                placeholder="Enter amount to sponsor"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            
            <div className="bg-white/5 rounded-xl p-4">
              <h4 className="font-medium mb-2">Sponsorship Details</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Campaign:</span>
                  <span>{selectedCampaign.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>{sponsorAmount || '0'} PYUSD</span>
                </div>
                <div className="flex justify-between">
                  <span>Beneficiary:</span>
                  <span className="font-mono text-xs">{selectedCampaign.beneficiary.slice(0, 6)}...{selectedCampaign.beneficiary.slice(-4)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSponsor}
              disabled={!sponsorAmount || isSponsoring}
              className="w-full px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSponsoring ? 'Processing...' : 'Sponsor Campaign'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
