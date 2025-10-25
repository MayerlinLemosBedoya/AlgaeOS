# AlgaeOS - River Restoration Funding Platform

A decentralized platform for funding river restoration projects using escrowed PYUSD payments, milestone attestations, and a transparent biomass marketplace.

## 🌊 Overview

AlgaeOS enables sponsors to fund river restoration campaigns with PYUSD, where funds are locked in escrow until verified milestones are reached. Harvested microalgae biomass is sold back in PYUSD, creating a circular local economy.

## ✨ Features

- **PYUSD Escrowed Funding**: Sponsors fund river algae seeding with funds locked until verified milestones
- **Milestone Attestation (Lit)**: Field reports are signed using Lit Protocol PKPs, only verified reports unlock payouts
- **Public Transparency**: Every action links to Blockscout on Base Sepolia for full transparency
- **Biomass Marketplace**: Harvested microalgae biomass sold in PYUSD, creating circular economy
- **Pyth Integration**: Price feeds and randomized audits using Pyth Entropy
- **Built for ETHOnline**: Simple stack with Solidity + Hardhat, React + Vite, Base Sepolia

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Wagmi** + **RainbowKit** for Web3 integration
- **React Router** for navigation

### Smart Contracts
- **Solidity 0.8.19**
- **OpenZeppelin** contracts
- **Hardhat** for development and deployment

### Blockchain
- **Base Sepolia** testnet
- **PYUSD** token integration
- **Lit Protocol** for attestations
- **Pyth Network** for price feeds and randomness

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/algaeos.git
   cd algaeos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development

### Smart Contracts

1. **Compile contracts**
   ```bash
   npm run compile
   ```

2. **Run tests**
   ```bash
   npm run test
   ```

3. **Deploy to Base Sepolia**
   ```bash
   npm run deploy
   ```

### Frontend Development

The frontend is built with React and Vite. Key components:

- `src/components/Landing.jsx` - Landing page
- `src/components/App.jsx` - Main dApp interface
- `src/components/SponsorCampaign.jsx` - Campaign sponsorship
- `src/components/Marketplace.jsx` - Biomass marketplace
- `src/components/MilestoneAttestation.jsx` - Milestone verification

## 📋 Contract Addresses (Base Sepolia)

- **AlgaeOSEscrow**: `0x7e033423A7975DF3081CE08913eF8B4FE7738144`
- **BiomassMarketplace**: `0x7e033423A7975DF3081CE08913eF8B4FE7738144`
- **PYUSD Token**: `0xb4229013CBd480622Cbc8D635b686fF57Ca639df`

## 🔗 Links

- **Blockscout Contract**: [View on Base Sepolia Explorer](https://base-sepolia.blockscout.com/address/0x7e033423A7975DF3081CE08913eF8B4FE7738144)
- **Blockscout Token**: [View PYUSD Token](https://base-sepolia.blockscout.com/address/0xb4229013CBd480622Cbc8D635b686fF57Ca639df)

## 🎯 How It Works

### 1. Sponsor Rivers in PYUSD
- Pick a campaign and sponsor kilograms of algae seeding
- Funds are escrowed in the smart contract
- Sponsors can track their contributions

### 2. Verify Milestones (Lit Protocol)
- Upload field reports with evidence
- Authorized signers attest to milestone completion
- Only verified reports unlock funds to beneficiaries

### 3. Sell Harvested Biomass
- Biomass lots are sold 1:1 in PYUSD
- Creates a circular local economy
- Transparent marketplace with quality ratings

## 🔐 Security Features

- **Escrow Protection**: Funds locked until verified milestones
- **Attestation System**: Lit Protocol PKPs for secure verification
- **Transparent Transactions**: All actions visible on Blockscout
- **Randomized Audits**: Pyth Entropy for unbiased verification

## 🌐 Network Configuration

### Base Sepolia (Testnet)
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Explorer**: https://base-sepolia.blockscout.com

### Recommended Wallet
- **Rabby Wallet** (supports Base Sepolia)
- **MetaMask** (with Base Sepolia network added)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/your-org/algaeos/issues)
- **Discord**: Join our community for support
- **Email**: contact@algaeos.org

## 🙏 Acknowledgments

- **ETHOnline 2025** for the hackathon platform
- **PayPal** for PYUSD integration
- **Lit Protocol** for attestation infrastructure
- **Pyth Network** for price feeds and randomness
- **Base** for the blockchain infrastructure
- **Blockscout** for transparent transaction visibility

---

Built with ❤️ for environmental restoration and DeFi innovation.
