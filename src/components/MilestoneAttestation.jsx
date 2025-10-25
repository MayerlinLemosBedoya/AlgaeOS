import { useState } from 'react'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'

const ATTESTATION_CONTRACT = "0x7e033423A7975DF3081CE08913eF8B4FE7738144"

// Mock milestone data
const milestones = [
  {
    id: 1,
    campaign: "Mississippi River Restoration",
    milestone: "Initial Seeding Complete",
    description: "First batch of algae deployed in designated river sections",
    status: "pending",
    deadline: "2024-02-15",
    reward: 2000, // PYUSD
    beneficiary: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
  },
  {
    id: 2,
    campaign: "Colorado River Cleanup",
    milestone: "Water Quality Test",
    description: "Complete water quality analysis showing improved metrics",
    status: "pending",
    deadline: "2024-02-20",
    reward: 1500,
    beneficiary: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
  },
  {
    id: 3,
    campaign: "Hudson River Revival",
    milestone: "Harvest Complete",
    description: "Successful harvest of 750kg biomass ready for marketplace",
    status: "completed",
    deadline: "2024-01-10",
    reward: 1000,
    beneficiary: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  }
]

export function MilestoneAttestation() {
  const [selectedMilestone, setSelectedMilestone] = useState(null)
  const [attestationData, setAttestationData] = useState({
    reportHash: '',
    evidenceUrl: '',
    notes: ''
  })

  const { write: attestMilestone, data: attestData } = useContractWrite({
    address: ATTESTATION_CONTRACT,
    abi: [], // ABI would be imported from contract artifacts
    functionName: 'attestMilestone',
  })

  const { isLoading: isAttesting } = useWaitForTransaction({
    hash: attestData?.hash,
  })

  const handleAttestation = async () => {
    if (!selectedMilestone) return
    
    try {
      await attestMilestone({
        args: [
          selectedMilestone.id,
          attestationData.reportHash,
          attestationData.evidenceUrl,
          attestationData.notes
        ],
      })
    } catch (error) {
      console.error('Attestation error:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Milestone Attestation</h2>
        <p className="text-white/70">
          Verify campaign milestones using Lit Protocol attestations. Only verified reports unlock escrowed funds.
        </p>
      </div>

      {/* Milestone List */}
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`rounded-2xl border p-6 cursor-pointer transition-all ${
              selectedMilestone?.id === milestone.id
                ? 'border-emerald-400 bg-emerald-400/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setSelectedMilestone(milestone)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{milestone.milestone}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                milestone.status === 'completed' 
                  ? 'bg-emerald-400/20 text-emerald-300'
                  : milestone.status === 'pending'
                  ? 'bg-yellow-400/20 text-yellow-300'
                  : 'bg-gray-400/20 text-gray-300'
              }`}>
                {milestone.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-white/70">
                <span className="font-medium">Campaign:</span> {milestone.campaign}
              </p>
              <p className="text-sm text-white/70">{milestone.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Deadline:</span>
                <span>{milestone.deadline}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Reward:</span>
                <span className="font-semibold text-emerald-300">{milestone.reward} PYUSD</span>
              </div>
            </div>

            <div className="text-xs text-white/50">
              Beneficiary: {milestone.beneficiary.slice(0, 6)}...{milestone.beneficiary.slice(-4)}
            </div>
          </div>
        ))}
      </div>

      {/* Attestation Form */}
      {selectedMilestone && selectedMilestone.status === 'pending' && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold mb-4">
            Attest Milestone: {selectedMilestone.milestone}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Hash</label>
              <input
                type="text"
                value={attestationData.reportHash}
                onChange={(e) => setAttestationData({...attestationData, reportHash: e.target.value})}
                placeholder="IPFS hash or document hash"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Evidence URL</label>
              <input
                type="url"
                value={attestationData.evidenceUrl}
                onChange={(e) => setAttestationData({...attestationData, evidenceUrl: e.target.value})}
                placeholder="https://example.com/evidence"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Attestation Notes</label>
              <textarea
                value={attestationData.notes}
                onChange={(e) => setAttestationData({...attestationData, notes: e.target.value})}
                placeholder="Additional verification details..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4">
              <h4 className="font-medium text-emerald-300 mb-2">Attestation Details</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between">
                  <span>Milestone:</span>
                  <span>{selectedMilestone.milestone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reward Amount:</span>
                  <span className="font-semibold text-emerald-300">{selectedMilestone.reward} PYUSD</span>
                </div>
                <div className="flex justify-between">
                  <span>Beneficiary:</span>
                  <span className="font-mono text-xs">{selectedMilestone.beneficiary.slice(0, 6)}...{selectedMilestone.beneficiary.slice(-4)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAttestation}
              disabled={!attestationData.reportHash || isAttesting}
              className="w-full px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAttesting ? 'Processing Attestation...' : 'Attest Milestone'}
            </button>
          </div>
        </div>
      )}

      {/* Lit Protocol Integration Info */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold mb-4">Lit Protocol Integration</h3>
        <div className="space-y-3 text-sm text-white/70">
          <p>
            • Attestations are signed using Lit Protocol's PKP (Programmable Key Pairs)
          </p>
          <p>
            • Only authorized attestors can unlock escrowed funds
          </p>
          <p>
            • All attestations are publicly verifiable on-chain
          </p>
          <p>
            • Integration with Pyth Entropy for randomized audit selection
          </p>
        </div>
      </div>
    </div>
  )
}
