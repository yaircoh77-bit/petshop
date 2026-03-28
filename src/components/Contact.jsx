import { useState } from 'react'

export default function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) return
    setSubmitted(true)
    setFields({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="container contact-inner">
        <div className="contact-info">
          <h2 id="contact-heading" className="section-title">Visit Us</h2>
          <address>
            <p><span aria-hidden="true">📍</span> 42 Pawsome Street, Tel Aviv, IL</p>
            <p><span aria-hidden="true">📞</span> <a href="tel:+97212345678">+972 12-345-678</a></p>
            <p><span aria-hidden="true">✉️</span> <a href="mailto:hello@pawsplace.com">hello@pawsplace.com</a></p>
          </address>
          <p className="hours">
            <strong>Hours:</strong><br />
            Sun–Thu: 09:00–19:00<br />
            Fri: 09:00–14:00<br />
            Sat: Closed
          </p>
        </div>

        <form className="contact-form" noValidate aria-label="Send us a message" onSubmit={handleSubmit}>
          <h3 className="form-title">Send a Message</h3>

          <div className="form-group">
            <label htmlFor="contact-name">
              Full Name <span className="required" aria-label="required">*</span>
            </label>
            <input
              type="text" id="contact-name" name="name"
              autoComplete="name" required aria-required="true"
              placeholder="Jane Smith"
              value={fields.name} onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">
              Email Address <span className="required" aria-label="required">*</span>
            </label>
            <input
              type="email" id="contact-email" name="email"
              autoComplete="email" required aria-required="true"
              placeholder="jane@example.com"
              value={fields.email} onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">
              Message <span className="required" aria-label="required">*</span>
            </label>
            <textarea
              id="contact-message" name="message" rows={4}
              required aria-required="true"
              placeholder="How can we help you?"
              value={fields.message} onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Send Message</button>

          {submitted && (
            <p className="form-success" role="alert" aria-live="assertive">
              ✅ Thanks! We&apos;ll be in touch soon.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
