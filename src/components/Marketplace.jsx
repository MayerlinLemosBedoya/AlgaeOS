import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useStore } from '../store'
import { ABI, contractAt, getSigner } from '../lib/eth'
import { txLink } from '../lib/blockscout'

const ERC20_ABI = [
  'function approve(address spender,uint256 amount) returns (bool)'
]

export default function Marketplace() {
  const { contract, pyusd, beneficiary } = useStore()
  const [lotId, setLotId] = useState(0)
  const [kg, setKg] = useState(20)
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    setTxHash('')
    try {
      if (!contract || !pyusd || !beneficiary) throw new Error('Config incompleta (contract/pyusd/beneficiary)')
      const signer = await getSigner()
      const rs = contractAt(contract, ABI, signer)
      const token = new ethers.Contract(pyusd, ERC20_ABI, signer)
      const lid = Number(lotId || 0)
      const kgNum = Number(kg || 0)
      const amount = await rs.quoteLotPYUSD(lid, kgNum)
      const appr = await token.approve(contract, amount)
      await appr.wait()
      const tx = await rs.buyBiomass(lid, kgNum, beneficiary)
      const rec = await tx.wait()
      setTxHash(rec?.hash || tx?.hash)
    } catch (e) {
      console.error(e)
      alert(e?.message || 'Error en compra de biomasa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <label className="text-sm">LotId</label>
        <input
          type="number"
          value={lotId}
          onChange={(e) => setLotId(e.target.value)}
          className="w-28 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint bg-white"
        />
        <label className="text-sm">kg</label>
        <input
          type="number"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          className="w-28 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint bg-white"
        />
        <button onClick={run} disabled={loading} className="btn-secondary">
          <CartIcon className="w-5 h-5" />
          {loading ? 'Processing…' : 'Buy (PYUSD)'}
        </button>
      </div>
      {txHash ? (
        <div className="mt-3 text-sm">
          Tx: <a className="text-turquoise underline" href={txLink(txHash)} target="_blank" rel="noreferrer">{txHash}</a>
        </div>
      ) : null}
    </div>
  )
}

function CartIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5h2l2.5 10h9.5l2-7H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  )
}
