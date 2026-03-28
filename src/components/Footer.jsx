export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-logo">
          <span aria-hidden="true">🐾</span> PawsPlace
        </p>
        <p className="footer-copy">&copy; {year} PawsPlace. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <ul className="footer-nav" role="list">
            <li><a href="#pets">Our Pets</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
