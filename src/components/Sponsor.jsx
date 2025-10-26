import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useStore } from '../store'
import { ABI, contractAt, getSigner } from '../lib/eth'
import { txLink } from '../lib/blockscout'

const ERC20_ABI = [
  'function approve(address spender,uint256 amount) returns (bool)'
]

export default function Sponsor() {
  const { contract, pyusd } = useStore()
  const [kg, setKg] = useState(10)
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    setLoading(true)
    setTxHash('')
    try {
      if (!contract || !pyusd) throw new Error('Config incompleta: faltan direcciones CONRACT/PYUSD')
      const signer = await getSigner()
      const rs = contractAt(contract, ABI, signer)
      const token = new ethers.Contract(pyusd, ERC20_ABI, signer)
      const kgNum = Number(kg || 0)
      const amount = await rs.quoteSponsorshipPYUSD(0, kgNum)
      const appr = await token.approve(contract, amount)
      await appr.wait()
      const tx = await rs.sponsor(0, kgNum)
      const rec = await tx.wait()
      setTxHash(rec?.hash || tx?.hash)
    } catch (e) {
      console.error(e)
      alert(e?.message || 'Error en patrocinio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <label className="text-sm">kg</label>
        <input
          type="number"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          className="w-32 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mint bg-white"
        />
        <button onClick={run} disabled={loading} className="btn-primary">
          {loading ? 'Processing…' : 'Sponsor (PYUSD)'}
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
