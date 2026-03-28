import { CATEGORIES } from '../data/pets'

export default function Categories({ activeFilter, onFilterChange }) {
  return (
    <section id="categories" className="categories-section" aria-labelledby="categories-heading">
      <div className="container">
        <h2 id="categories-heading" className="section-title">Browse by Category</h2>
        <ul className="categories-grid" role="list">
          {CATEGORIES.map(({ filter, icon, label }) => (
            <li key={filter}>
              <button
                className={`category-card${activeFilter === filter ? ' active' : ''}`}
                aria-pressed={activeFilter === filter}
                onClick={() => onFilterChange(filter)}
              >
                <span className="category-icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
