import { PETS } from '../data/pets'
import PetCard from './PetCard'

export default function PetsGrid({ activeFilter, onAddToCart }) {
  const filtered = activeFilter === 'all' ? PETS : PETS.filter((p) => p.type === activeFilter)

  return (
    <section id="pets" className="pets-section" aria-labelledby="pets-heading">
      <div className="container">
        <h2 id="pets-heading" className="section-title">Our Pets</h2>
        <p className="section-subtitle">Every pet deserves a loving home. Could yours be next?</p>

        <div
          className="pets-grid"
          role="list"
          aria-live="polite"
          aria-relevant="additions removals"
        >
          {filtered.length === 0 ? (
            <p className="no-results">No pets found in this category. Check back soon!</p>
          ) : (
            filtered.map((pet) => (
              <div key={pet.id} role="listitem">
                <PetCard pet={pet} onAddToCart={onAddToCart} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
