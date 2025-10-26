import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useStore } from '../store'
import { ABI, contractAt, getProvider } from '../lib/eth'
import { addrLink } from '../lib/blockscout'

export default function Impact() {
  const { contract } = useStore()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        if (!contract) throw new Error('Contrato no configurado')
        const provider = getProvider()
        const rs = contractAt(contract, ABI, provider)
        const c = await rs.campaigns(0)
        if (mounted) setData(c)
      } catch (e) {
        console.error(e)
        if (mounted) setError(e?.message || 'Error al cargar campaña')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [contract])

  if (loading) return <div className="card my-8">Cargando impacto…</div>
  if (error) return <div className="card my-8 error">{error}</div>
  if (!data) return null

  const name = data?.name
  const location = data?.location
  const targetKg = data?.targetKg ? Number(data.targetKg) : 0
  const seededKg = data?.seededKg ? Number(data.seededKg) : 0
  const harvestedKg = data?.harvestedKg ? Number(data.harvestedKg) : 0
  const escrowPYUSD = data?.escrowPYUSD ? ethers.formatUnits(data.escrowPYUSD, 6) : '0'
  const beneficiary = data?.beneficiary

  return (
    <div className="card my-8">
      <h3>Impact</h3>
      <div><strong>{name}</strong> - {location}</div>
      <div>Target kg: {targetKg}</div>
      <div>Seeded kg: {seededKg}</div>
      <div>Harvested kg: {harvestedKg}</div>
      <div>Escrow PYUSD: {escrowPYUSD}</div>
      <div>Beneficiary: <a href={addrLink(beneficiary)} target="_blank" rel="noreferrer">{beneficiary}</a></div>
    </div>
  )
}
