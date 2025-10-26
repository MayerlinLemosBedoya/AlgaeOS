import React from 'react'

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-aquaLight/70 to-aquaBg" />
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight md:leading-tight">
          Sponsor the restoration of rivers with science and microscopic life 🌱
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-darkTeal/80 max-w-3xl mx-auto">
          Sponsor ecological restoration with transparent blockchain tracking and measurable impact. Microalgae technology brings water back to life.
        </p>
        <div className="mt-8 flex justify-center">
          <a href="#projects" className="btn-primary">
            Sponsor with PYUSD
          </a>
        </div>
      </div>
    </section>
  )
}

