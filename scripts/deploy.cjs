const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("Deploying AlgaeOS contracts...");

  // Get the contract factories
  const AlgaeOSEscrow = await ethers.getContractFactory("AlgaeOSEscrow");
  const BiomassMarketplace = await ethers.getContractFactory("BiomassMarketplace");

  // PYUSD token address on Base Sepolia (testnet)
  const PYUSD_TOKEN_ADDRESS = "0xb4229013CBd480622Cbc8D635b686fF57Ca639df";

  // Deploy contracts
  console.log("Deploying AlgaeOSEscrow...");
  const escrow = await AlgaeOSEscrow.deploy(PYUSD_TOKEN_ADDRESS);
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("AlgaeOSEscrow deployed to:", escrowAddress);

  console.log("Deploying BiomassMarketplace...");
  const marketplace = await BiomassMarketplace.deploy(PYUSD_TOKEN_ADDRESS);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("BiomassMarketplace deployed to:", marketplaceAddress);

  // Add some authorized attestors (for testing)
  const [deployer] = await ethers.getSigners();
  console.log("Adding deployer as authorized attestor...");
  await escrow.addAuthorizedAttestor(deployer.address);

  // Create some sample campaigns
  console.log("Creating sample campaigns...");
  
  const campaign1 = await escrow.createCampaign(
    "Mississippi River Restoration",
    "New Orleans, LA",
    "Algae seeding to reduce nitrogen pollution and restore aquatic ecosystems",
    ethers.parseEther("10000"), // 10,000 PYUSD target
    "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" // Sample beneficiary
  );
  console.log("Campaign 1 created:", campaign1);

  const campaign2 = await escrow.createCampaign(
    "Colorado River Cleanup",
    "Grand Canyon, AZ",
    "Microalgae deployment to combat agricultural runoff and restore water quality",
    ethers.parseEther("15000"), // 15,000 PYUSD target
    "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" // Sample beneficiary
  );
  console.log("Campaign 2 created:", campaign2);

  const campaign3 = await escrow.createCampaign(
    "Hudson River Revival",
    "New York, NY",
    "Urban river restoration using algae-based filtration systems",
    ethers.parseEther("8000"), // 8,000 PYUSD target
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" // Sample beneficiary
  );
  console.log("Campaign 3 created:", campaign3);

  // Create some sample milestones
  console.log("Creating sample milestones...");
  
  await escrow.createMilestone(1, "Initial Seeding Complete", ethers.parseEther("2000"));
  await escrow.createMilestone(1, "Water Quality Test", ethers.parseEther("1500"));
  
  await escrow.createMilestone(2, "Water Quality Test", ethers.parseEther("1500"));
  await escrow.createMilestone(2, "Harvest Complete", ethers.parseEther("1000"));
  
  await escrow.createMilestone(3, "Harvest Complete", ethers.parseEther("1000"));

  // Create some sample biomass lots
  console.log("Creating sample biomass lots...");
  
  await marketplace.createLot(
    1,
    "Mississippi River Restoration",
    ethers.parseEther("1000"), // 1000 kg
    ethers.parseEther("1000"), // 1000 PYUSD
    Math.floor(Date.now() / 1000) - 86400, // 1 day ago
    "Premium",
    "New Orleans, LA"
  );

  await marketplace.createLot(
    2,
    "Colorado River Cleanup",
    ethers.parseEther("500"), // 500 kg
    ethers.parseEther("600"), // 600 PYUSD
    Math.floor(Date.now() / 1000) - 172800, // 2 days ago
    "Standard",
    "Grand Canyon, AZ"
  );

  await marketplace.createLot(
    3,
    "Hudson River Revival",
    ethers.parseEther("750"), // 750 kg
    ethers.parseEther("800"), // 800 PYUSD
    Math.floor(Date.now() / 1000) - 259200, // 3 days ago
    "Premium",
    "New York, NY"
  );

  console.log("\n=== Deployment Summary ===");
  console.log("AlgaeOSEscrow:", escrowAddress);
  console.log("BiomassMarketplace:", marketplaceAddress);
  console.log("PYUSD Token:", PYUSD_TOKEN_ADDRESS);
  console.log("Deployer:", deployer.address);

  // Write .env.local for Vite
  try {
    const envLocal = [
      `VITE_ESCROW_CONTRACT=${escrowAddress}`,
      `VITE_MARKETPLACE_CONTRACT=${marketplaceAddress}`,
      `VITE_PYUSD_TOKEN=${PYUSD_TOKEN_ADDRESS}`,
      ''
    ].join('\n');
    const envPath = path.join(__dirname, '..', '.env.local');
    fs.writeFileSync(envPath, envLocal, { encoding: 'utf8' });
    console.log(`\nWrote ${envPath} with deployed addresses.`);
  } catch (e) {
    console.warn('Could not write .env.local:', e?.message || e);
  }
  
  console.log("\n=== Contract Verification ===");
  console.log("To verify contracts on Base Sepolia Explorer:");
  console.log(`npx hardhat verify --network baseSepolia ${escrowAddress} "${PYUSD_TOKEN_ADDRESS}"`);
  console.log(`npx hardhat verify --network baseSepolia ${marketplaceAddress} "${PYUSD_TOKEN_ADDRESS}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
