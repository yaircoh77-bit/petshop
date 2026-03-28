export default function PetCard({ pet, onAddToCart }) {
  const isReserved = pet.status === 'reserved'

  return (
    <article className="pet-card">
      <div className="pet-card-image" aria-hidden="true">{pet.emoji}</div>
      <div className="pet-card-body">
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-breed">{pet.breed}</p>
        <p className="pet-card-age">Age: {pet.age}</p>
        <span className={`pet-badge pet-badge--${pet.status}`}>
          {isReserved ? 'Reserved' : 'Available'}
        </span>
        <p className="pet-card-price">${pet.price.toLocaleString()}</p>
      </div>
      <div className="pet-card-footer">
        <button
          className="btn btn-primary"
          disabled={isReserved}
          aria-disabled={isReserved}
          aria-label={`Add ${pet.name} the ${pet.breed} to cart for $${pet.price}`}
          style={isReserved ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
          onClick={() => !isReserved && onAddToCart(pet)}
        >
          {isReserved ? 'Reserved' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}
