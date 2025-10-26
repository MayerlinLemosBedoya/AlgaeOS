import React from 'react'

export default function Education() {
  return (
    <section id="about" className="mt-10">
      <div className="bg-aquaLight rounded-top-sheet">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-semibold">Why Microalgae?</h2>
          <p className="mt-3 text-darkTeal/80 max-w-3xl">
            Microalgae purify water by absorbing nutrients, capture CO₂, and generate oxygen. Their rapid growth and high efficiency make them ideal for restoring aquatic ecosystems while monitoring impact in real time.
          </p>
          <div className="mt-8 flex justify-center">
            <img
              src="/microalgae-illustration.png"
              alt="Illustration of microalgae purifying water"
              className="w-full max-w-3xl rounded-2xl border border-gray-100 shadow-soft object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
