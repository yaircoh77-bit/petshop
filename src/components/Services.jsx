import { SERVICES } from '../data/pets'

export default function Services() {
  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <div className="container">
        <h2 id="services-heading" className="section-title">Our Services</h2>
        <ul className="services-grid" role="list">
          {SERVICES.map(({ icon, title, desc }) => (
            <li key={title} className="service-card">
              <span className="service-icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
