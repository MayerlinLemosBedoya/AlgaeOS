import React, { useState } from 'react'
import { getSigner } from '../lib/eth'

export default function Header() {
  const [account, setAccount] = useState('')

  const connect = async () => {
    try {
      const signer = await getSigner()
      const addr = await signer.getAddress()
      setAccount(addr)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-aquaBg/80 backdrop-blur supports-[backdrop-filter]:bg-aquaBg/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <LeafIcon className="w-7 h-7 text-mint" />
          <span className="text-xl font-semibold tracking-wide">AlgaeOS</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-[15px]">
          <a href="#projects" className="hover:text-mint transition">Projects</a>
          <a href="#marketplace" className="hover:text-mint transition">Marketplace</a>
          <a href="#about" className="hover:text-mint transition">About Microalgae</a>
        </nav>
        <button onClick={connect} className="btn-ghost">
          <WalletIcon className="w-5 h-5" />
          {account ? short(account) : 'Connect Wallet'}
        </button>
      </div>
    </header>
  )
}

function short(a) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`
}

function LeafIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c5.5 0 9 3.5 10 9-4-2-8 0-10 2s-4 6-2 10c-5.5-1-9-4.5-9-10C1 6 6.5 2 12 2z" opacity=".15" />
      <path d="M20.5 7.5C17 7 13 9 11 11c-2 2-3 5-2.5 8m9-11C16 5 12 4 8.5 6.5 5 9 4 13 5 16.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function WalletIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2"/>
      <path d="M16 12h2" strokeLinecap="round" />
    </svg>
  )
}

