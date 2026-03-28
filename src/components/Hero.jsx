export default function Hero() {
  return (
    <section className="hero" aria-label="Welcome banner">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Find Your <span className="accent">Perfect</span> Companion</h1>
          <p>Adorable pets, premium food, accessories, and expert grooming – all in one place.</p>
          <a href="#pets" className="btn btn-primary">Meet Our Pets</a>
          <a href="#services" className="btn btn-secondary">Our Services</a>
        </div>
        <div className="hero-image" aria-hidden="true">
          <div className="hero-emoji-stack">
            {['🐶', '🐱', '🐰', '🐦'].map((emoji) => (
              <span key={emoji} className="hero-emoji">{emoji}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
