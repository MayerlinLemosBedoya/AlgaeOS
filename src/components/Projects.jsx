import React from 'react'
import Sponsor from './Sponsor'
import Marketplace from './Marketplace'

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <h2 className="text-2xl md:text-3xl font-semibold text-center">Projects</h2>
      <p className="text-darkTeal/70 text-center mt-2">Sponsor active campaigns or buy biomass lots.</p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card p-6" aria-labelledby="active-sponsor">
          <h3 id="active-sponsor" className="text-xl font-semibold">Active Sponsorship</h3>
          <p className="text-sm text-darkTeal/70 mt-1">Support a project by funding kilograms of cultivation.</p>
          <div className="mt-4">
            <Sponsor />
          </div>
        </div>

        <div id="marketplace" className="card p-6" aria-labelledby="marketplace-card">
          <h3 id="marketplace-card" className="text-xl font-semibold">Marketplace</h3>
          <p className="text-sm text-darkTeal/70 mt-1">Buy harvested biomass with PYUSD and receive it or assign it.</p>
          <div className="mt-4">
            <Marketplace />
          </div>
        </div>
      </div>
    </section>
  )
}

