import { useState } from 'react'

export default function Header({ cartCount, onCartOpen, cartBtnRef }) {
  const [navOpen, setNavOpen] = useState(false)

  const closeNav = () => setNavOpen(false)

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a href="#" className="logo" aria-label="PawsPlace home">
          <span className="logo-icon" aria-hidden="true">🐾</span>
          <span className="logo-text">PawsPlace</span>
        </a>

        <nav aria-label="Primary navigation">
          <button
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setNavOpen((o) => !o)}
          >
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
            <span className="hamburger-bar" aria-hidden="true" />
          </button>

          <ul
            id="primary-nav"
            className={`nav-list${navOpen ? ' open' : ''}`}
            role="list"
          >
            {[['#pets', 'Our Pets'], ['#categories', 'Categories'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="nav-link" onClick={closeNav}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={cartBtnRef}
          className="cart-btn"
          aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
          aria-haspopup="dialog"
          onClick={onCartOpen}
        >
          <span className="cart-icon" aria-hidden="true">🛒</span>
          <span className="cart-count" aria-live="polite" aria-atomic="true">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  )
}
