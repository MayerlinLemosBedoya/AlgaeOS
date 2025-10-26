import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useContractRead, useContractWrite } from 'wagmi'
import { SponsorCampaign } from './SponsorCampaign'
import { Marketplace } from './Marketplace'
import { MilestoneAttestation } from './MilestoneAttestation'

// Contract addresses (from env)
const ESCROW_CONTRACT = import.meta.env.VITE_ESCROW_CONTRACT || ""
const PYUSD_TOKEN = import.meta.env.VITE_PYUSD_TOKEN || ""

export default function App() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('sponsor')

  const tabs = [
    { id: 'sponsor', label: 'Sponsor Campaign', icon: '💸' },
    { id: 'marketplace', label: 'Biomass Marketplace', icon: '🛒' },
    { id: 'attestation', label: 'Milestone Attestation', icon: '🔏' },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-300" fill="currentColor">
                <path d="M12 2c-2.9 0-5.6 1.7-6.8 4.4C3 10.3 6.3 14 12 22c5.7-8 9-11.7 6.8-15.6C17.6 3.7 14.9 2 12 2zm0 6a4 4 0 0 1 4 4c0 1.6-1 3.6-4 6.9-3-3.3-4-5.3-4-6.9a4 4 0 0 1 4-4z"/>
              </svg>
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to AlgaeOS</h1>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Connect your wallet to start sponsoring river restoration campaigns and trading biomass.
          </p>
          <div className="mb-4">
            <ConnectButton />
          </div>
          <p className="text-sm text-white/50">
            Recommended: Rabby wallet on Base Sepolia (Chain ID: 84532)
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-950 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md/30 bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="currentColor">
                <path d="M12 2c-2.9 0-5.6 1.7-6.8 4.4C3 10.3 6.3 14 12 22c5.7-8 9-11.7 6.8-15.6C17.6 3.7 14.9 2 12 2zm0 6a4 4 0 0 1 4 4c0 1.6-1 3.6-4 6.9-3-3.3-4-5.3-4-6.9a4 4 0 0 1 4-4z"/>
              </svg>
            </span>
            <div>
              <p className="font-semibold tracking-tight">AlgaeOS</p>
              <p className="text-xs text-white/60 -mt-0.5">River Sponsorships • PYUSD • Lit • Pyth</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ConnectButton />
            <a href="/" className="px-3 py-2 text-sm text-white/80 hover:text-white">← Back to Landing</a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-2 bg-white/5 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-400 text-black font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pb-16">
        {activeTab === 'sponsor' && <SponsorCampaign />}
        {activeTab === 'marketplace' && <Marketplace />}
        {activeTab === 'attestation' && <MilestoneAttestation />}
      </main>
    </div>
  )
}
