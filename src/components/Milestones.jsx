import React, { useRef, useState } from 'react'
import { ethers } from 'ethers'
import { useStore } from '../store'
import { ABI, contractAt, getSigner, getProvider } from '../lib/eth'
import { txLink } from '../lib/blockscout'
import { fetchPriceUpdates } from '../lib/pyth'

const PythABI = [
  'function getUpdateFee(bytes[] calldata) view returns (uint256)'
]

export default function Milestones() {
  const { contract, pyth, feedId } = useStore()
  const fileRef = useRef(null)
  const [milestone, setMilestone] = useState(0)
  const [release, setRelease] = useState('0')
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [publishTime, setPublishTime] = useState(null)

  const computeReportHash = async (file) => {
    const buf = await file.arrayBuffer()
    const bytes = new Uint8Array(buf)
    return ethers.keccak256(bytes)
  }

  const onVerify = async () => {
    setLoading(true)
    setTxHash('')
    try {
      if (!contract) throw new Error('Config incompleta: contrato')
      const file = fileRef.current?.files?.[0]
      if (!file) throw new Error('Selecciona un archivo de reporte')
      const reportHash = await computeReportHash(file)
      const campaignId = 0
      const signer = await getSigner()
      const rs = contractAt(contract, ABI, signer)

      const message = ethers.solidityPackedKeccak256(
        ['string', 'uint256', 'uint8', 'bytes32', 'address'],
        ['RS_MILESTONE', campaignId, Number(milestone), reportHash, contract]
      )
      const signature = await signer.signMessage(ethers.getBytes(message))

      const releasePYUSD = (BigInt(Math.floor(Number(release) || 0)) * (10n ** 6n))
      const tx = await rs.verifyMilestoneAndRelease(campaignId, Number(milestone), reportHash, signature, releasePYUSD)
      const rec = await tx.wait()
      setTxHash(rec?.hash || tx?.hash)
    } catch (e) {
      console.error(e)
      alert(e?.message || 'Error en verificación de milestone')
    } finally {
      setLoading(false)
    }
  }

  const onUpdatePrice = async () => {
    setLoading(true)
    setPublishTime(null)
    setTxHash('')
    try {
      if (!contract || !pyth) throw new Error('Faltan direcciones de contrato o Pyth')
      if (!feedId || !feedId.startsWith('0x')) throw new Error('feedId inválido')
      const updates = await fetchPriceUpdates([feedId])
      if (!updates || updates.length === 0) throw new Error('No hay updates disponibles')

      const signer = await getSigner()
      const rs = contractAt(contract, ABI, signer)
      const provider = getProvider()
      const p = new ethers.Contract(pyth, PythABI, provider)
      const fee = await p.getUpdateFee(updates)

      // Pre-calculate return values via static call for publishTime
      let pubTime = null
      try {
        const ret = await rs.updateUsdFeed.staticCall(updates, { value: fee })
        // ret is [price(int64), publishTime(uint64)]
        if (Array.isArray(ret) && ret.length >= 2) {
          pubTime = Number(ret[1])
        }
      } catch {}

      const tx = await rs.updateUsdFeed(updates, { value: fee })
      const rec = await tx.wait()
      setTxHash(rec?.hash || tx?.hash)
      if (pubTime != null) setPublishTime(pubTime)
    } catch (e) {
      console.error(e)
      alert(e?.message || 'Error al actualizar precio con Pyth')
    } finally {
      setLoading(false)
    }
  }

  const canUpdate = Boolean(feedId && typeof feedId === 'string' && feedId.startsWith('0x'))

  return (
    <div className="card my-8">
      <h3>Milestones</h3>
      <div className="stack">
        <div>
          <label>Reporte (archivo): </label>
          <input ref={fileRef} type="file" />
        </div>
        <div>
          <label>Milestone: </label>
          <select value={milestone} onChange={(e) => setMilestone(Number(e.target.value))}>
            <option value={0}>0 - SEEDING</option>
            <option value={1}>1 - GROWTH</option>
            <option value={2}>2 - HARVEST</option>
          </select>
        </div>
        <div>
          <label>Release (PYUSD humanos): </label>
          <input type="number" value={release} onChange={(e) => setRelease(e.target.value)} />
        </div>
        <div className="row gap-8">
          <button onClick={onVerify} disabled={loading}>{loading ? 'Procesando…' : 'Verify + Release'}</button>
          <button onClick={onUpdatePrice} disabled={loading || !canUpdate}>Update Price (Pyth)</button>
        </div>
      </div>
      {publishTime != null ? (
        <div className="mt-8">publishTime: {publishTime}</div>
      ) : null}
      {txHash ? (
        <div className="mt-8">
          Tx: <a href={txLink(txHash)} target="_blank" rel="noreferrer">{txHash}</a>
        </div>
      ) : null}
    </div>
  )
}
