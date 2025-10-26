import React from 'react'

export default function Landing() {
  const items = [
    {
      title: "PYUSD escrowed funding",
      desc: "Sponsors fund river algae seeding in PYUSD; funds are locked in escrow until verified milestones are reached.",
      emoji: "💸",
    },
    {
      title: "Milestone attestation (Lit)",
      desc: "Field reports are signed (PKP-ready). Only verified reports unlock payouts to local cooperatives.",
      emoji: "🔏",
    },
    {
      title: "Public transparency",
      desc: "Every action links to Blockscout on Base Sepolia so anyone can verify where funds go.",
      emoji: "🔎",
    },
    {
      title: "Biomass marketplace",
      desc: "Harvested microalgae biomass is sold in PYUSD, creating a circular local economy.",
      emoji: "🛒",
    },
    {
      title: "Pyth price + randomness",
      desc: "Pull price updates and run randomized audits using Pyth Entropy.",
      emoji: "📈",
    },
    {
      title: "Built for ETHOnline",
      desc: "Simple stack: Solidity + Hardhat 3, React + Vite, Base Sepolia, Rabby wallet.",
      emoji: "🏗️",
    },
  ];

  const faq = [
    {
      q: "Is this live on mainnet?",
      a: "This MVP runs on Base Sepolia (testnet) for sponsor flows and demos. PYUSD on Ethereum Sepolia is shown in a short clip for eligibility.",
    },
    {
      q: "Can I buy biomass now?",
      a: "Yes on testnet. The marketplace sells lots denominated in PYUSDt (6 decimals).",
    },
    {
      q: "Do I need Metamask?",
      a: "We recommend Rabby. Connect to Base Sepolia (chainId 84532).",
    },
    {
      q: "What makes it novel?",
      a: "Milestone-gated escrow with attestations + transparent marketplace + randomized audit draws (Pyth Entropy).",
    },
  ];

  const short = (a) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "");
  const addr = {
    contract: import.meta.env.VITE_CONTRACT || '',
    pyusd: import.meta.env.VITE_PYUSD || '',
    algae: import.meta.env.VITE_ALGAE || '',
  };
  const links = {
    app: "/", // point to your app route
    github: "https://github.com/your-org/algaeos",
    devpost: "https://devpost.com/project/algaeos",
    blockscoutContract: `https://base-sepolia.blockscout.com/address/${import.meta.env.VITE_CONTRACT || ''}`,
    blockscoutToken: `https://base-sepolia.blockscout.com/address/${import.meta.env.VITE_PYUSD || ''}`,
    blockscoutAlgae: import.meta.env.VITE_ALGAE ? `https://base-sepolia.blockscout.com/address/${import.meta.env.VITE_ALGAE}` : null,
    docs: "https://your-site/docs",
  };

  const badges = [
    { label: "PYUSD", tip: "PayPal USD test integration" },
    { label: "Pyth", tip: "Price feeds + Entropy" },
    { label: "Lit", tip: "Attested milestones" },
    { label: "Blockscout", tip: "Public explorer" },
    { label: "Base Sepolia", tip: "Deployment network" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-950 to-black text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-20 backdrop-blur-md/30 bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
              {/* Logo seed */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-emerald-300" fill="currentColor"><path d="M12 2c-2.9 0-5.6 1.7-6.8 4.4C3 10.3 6.3 14 12 22c5.7-8 9-11.7 6.8-15.6C17.6 3.7 14.9 2 12 2zm0 6a4 4 0 0 1 4 4c0 1.6-1 3.6-4 6.9-3-3.3-4-5.3-4-6.9a4 4 0 0 1 4-4z"/></svg>
            </span>
            <div>
              <p className="font-semibold tracking-tight">AlgaeOS</p>
              <p className="text-xs text-white/60 -mt-0.5">River Sponsorships • PYUSD • Lit • Pyth • Blockscout</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="#features" className="px-3 py-2 text-sm text-white/80 hover:text-white">Features</a>
            <a href="#how" className="px-3 py-2 text-sm text-white/80 hover:text-white">How it works</a>
            <a href="#faq" className="px-3 py-2 text-sm text-white/80 hover:text-white">FAQ</a>
            <a href={links.github} className="px-3 py-2 text-sm text-white/80 hover:text-white" target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.app} className="ml-2 px-4 py-2 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300">Open App</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(16,185,129,0.2),transparent_60%)]"/>
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Fund river restoration
              <span className="block text-emerald-300">with escrowed PYUSD</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Sponsors pay for algae seeding. Funds release only after **attested** milestones.
              Harvested biomass is sold back in PYUSD, fueling a circular local economy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={links.app} className="px-5 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300">Launch dApp</a>
              <a href={links.docs} className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/5">Read docs</a>
              <a href={links.blockscoutContract} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/5">View contract</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span key={i} title={b.tip} className="text-xs px-2.5 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10">
                  {b.label}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"/>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <div className="grid gap-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Network</span>
                  <span className="font-mono">Base Sepolia (84532)</span>
                </div>
                <div>
                  <p className="text-white/70 mb-1">Contract</p>
                  <a href={links.blockscoutContract} target="_blank" rel="noreferrer" className="block font-mono text-xs break-all hover:text-emerald-300">0x7e0334…78144</a>
                </div>
                <div>
                  <p className="text-white/70 mb-1">PYUSDt</p>
                  <a href={links.blockscoutToken} target="_blank" rel="noreferrer" className="block font-mono text-xs break-all hover:text-emerald-300">0xb42290…39df</a>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <a href="#how" className="rounded-xl px-3 py-2 bg-white/5 hover:bg-white/10 text-center">How it works</a>
                  <a href="#features" className="rounded-xl px-3 py-2 bg-white/5 hover:bg-white/10 text-center">Why it wins</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">Why AlgaeOS</h2>
        <p className="mt-2 text-white/70 max-w-2xl">Purpose-built for ETHOnline sponsor tracks: PYUSD, Lit, Pyth and Blockscout, with a real-world environmental outcome.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl">{f.emoji}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
        <ol className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { n: 1, t: "Sponsor rivers in PYUSD", d: "Pick a campaign and sponsor kilograms of algae seeding. Funds are escrowed in the contract." },
            { n: 2, t: "Verify milestones (Lit)", d: "Upload the field report; an authorized signer (PKP-ready) attests and unlocks funds to the beneficiary." },
            { n: 3, t: "Sell harvested biomass", d: "Biomass lots are sold 1:1 in PYUSD to buyers, closing the loop in the local economy." },
          ].map(s => (
            <li key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-xl bg-emerald-400 text-black font-bold grid place-content-center">{s.n}</span>
                <h3 className="font-semibold">{s.t}</h3>
              </div>
              <p className="mt-3 text-sm text-white/70">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex gap-3">
          <a href={links.app} className="px-5 py-3 rounded-xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300">Try the dApp</a>
          <a href={links.blockscoutContract} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/5">See on Blockscout</a>
        </div>
      </section>

      {/* ILLUSTRATION: What are microalgae? */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex justify-center">
          <img
            src="/what are microalgae.png"
            alt="Illustration of microalgae purifying water"
            loading="lazy"
            className="w-full max-w-4xl rounded-2xl border border-white/10 shadow-2xl object-contain"
          />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {faq.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-white/70">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold">AlgaeOS</p>
            <p className="text-white/60 text-sm mt-1">Open-source • MIT License • Built for ETHOnline 2025</p>
          </div>
          <div className="md:text-right flex md:justify-end gap-3 items-center">
            <a className="px-3 py-2 text-sm text-white/80 hover:text-white" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="px-3 py-2 text-sm text-white/80 hover:text-white" href={links.devpost} target="_blank" rel="noreferrer">Devpost</a>
            <a className="px-3 py-2 text-sm text-white/80 hover:text-white" href={links.docs} target="_blank" rel="noreferrer">Docs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
