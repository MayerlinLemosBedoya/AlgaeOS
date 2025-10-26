import React, { useState } from 'react'
import { useStore } from '../store'
import { ABI, contractAt, getSigner } from '../lib/eth'
import { txLink } from '../lib/blockscout'

export default function Audits() {
  const { contract } = useStore()
  const [txHash, setTxHash] = useState('')
  const [txHash2, setTxHash2] = useState('')
  const [loading, setLoading] = useState(false)

  const request = async () => {
    setLoading(true)
    setTxHash('')
    try {
      if (!contract) throw new Error('Contrato no configurado')
      const signer = await getSigner()
      const rs = contractAt(contract, ABI, signer)
      const tx = await rs.requestAudit(0)
      const rec = await tx.wait()
      setTxHash(rec?.hash || tx?.hash)
    } catch (e) {
      console.error(e)
      alert(e?.message || 'Error al solicitar auditoría')
    } finally {
      setLoading(false)
    }
  }

  const settle = async () => {
    setLoading(true)
    setTxHash2('')
    try {
      if (!contract) throw new Error('Contrato no configurado')
      const signer = await getSigner()
      const rs = contractAt(contract, ABI, signer)
      const tx = await rs.settleAudit(0)
      const rec = await tx.wait()
      setTxHash2(rec?.hash || tx?.hash)
    } catch (e) {
      console.error(e)
      alert(e?.message || 'Error al asentar auditoría')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card my-8">
      <h3>Audits</h3>
      <div className="row gap-8">
        <button onClick={request} disabled={loading}>Solicitar auditoría</button>
        <button onClick={settle} disabled={loading}>Asentar auditoría</button>
      </div>
      {txHash ? (
        <div className="mt-8">
          Request Tx: <a href={txLink(txHash)} target="_blank" rel="noreferrer">{txHash}</a>
        </div>
      ) : null}
      {txHash2 ? (
        <div className="mt-8">
          Settle Tx: <a href={txLink(txHash2)} target="_blank" rel="noreferrer">{txHash2}</a>
        </div>
      ) : null}
    </div>
  )
}
