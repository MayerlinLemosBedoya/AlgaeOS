// Ethers helpers and minimal ABI for RiverSponsorship
import { ethers } from 'ethers'

export const ABI = [
  // views
  'function campaigns(uint256) view returns (string name,string location,uint256 targetKg,uint256 pricePerKgUSD,address beneficiary,bool active,uint256 escrowPYUSD,uint256 releasedPYUSD,uint256 seededKg,uint256 harvestedKg)',
  'function quoteSponsorshipPYUSD(uint256 campaignId,uint256 kg) view returns (uint256)',
  'function quoteLotPYUSD(uint256 lotId,uint256 kg) view returns (uint256)',
  // writes
  'function createCampaign(string name,string location,uint256 targetKg,uint256 pricePerKgUSD,address beneficiary)',
  'function updateCampaign(uint256 campaignId,bool active,uint256 pricePerKgUSD)',
  'function sponsor(uint256 campaignId,uint256 kg)',
  'function setAuthorizedSigner(address signer,bool allowed)',
  'function verifyMilestoneAndRelease(uint256 campaignId,uint8 milestone,bytes32 reportHash,bytes signature,uint256 releasePYUSD)',
  'function addBiomassLot(uint256 campaignId,uint256 kg,uint256 unitPriceUSD) returns (uint256)',
  'function buyBiomass(uint256 lotId,uint256 kg,address recipient)',
  'function updateUsdFeed(bytes[] calldata priceUpdateData) payable returns (int64 price,uint64 publishTime)',
  'function requestAudit(uint256 campaignId)',
  'function settleAudit(uint256 campaignId)'
]

export function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  alert('No wallet found. Please install a Web3 wallet (e.g., MetaMask).')
  // Fallback to a dummy provider (no network calls without a URL)
  return new ethers.JsonRpcProvider()
}

export async function getSigner() {
  const provider = getProvider()
  try {
    // Request accounts
    await provider.send('eth_requestAccounts', [])
  } catch (e) {
    alert('Wallet connection rejected.')
    throw e
  }
  const network = await provider.getNetwork()
  const chainIdNum = Number(network.chainId)
  if (chainIdNum !== 84532) {
    alert('Wrong network. Please switch to Base Sepolia (chainId 84532).')
    throw new Error('Wrong network')
  }
  return await provider.getSigner()
}

export function contractAt(address, abi, signerOrProvider) {
  const sp = signerOrProvider || getProvider()
  return new ethers.Contract(address, abi, sp)
}

