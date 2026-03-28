import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import PetsGrid from './components/PetsGrid'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDialog from './components/CartDialog'
import { useCart } from './hooks/useCart'
import { useAnnouncer } from './hooks/useAnnouncer'

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { cart, total, isOpen, cartBtnRef, addToCart, removeFromCart, clearCart, openCart, closeCart } = useCart()
  const { message, announce } = useAnnouncer()

  const handleAddToCart = (pet) => {
    const alreadyInCart = cart.find((i) => i.id === pet.id)
    if (alreadyInCart) {
      announce(`${pet.name} is already in your cart.`)
      return
    }
    addToCart(pet)
    announce(`${pet.name} added to cart.`)
  }

  const handleRemoveFromCart = (petId) => {
    const pet = cart.find((i) => i.id === petId)
    removeFromCart(petId)
    if (pet) announce(`${pet.name} removed from cart.`)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      announce('Your cart is empty. Please add items before checking out.')
      return
    }
    clearCart()
    closeCart()
    announce('Thank you for your order! We will contact you shortly.')
  }

  return (
    <>
      {/* Screen-reader live announcer */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {message}
      </div>

      {/* Skip link */}
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <Header
        cartCount={cart.length}
        cartBtnRef={cartBtnRef}
        onCartOpen={openCart}
      />

      <main id="main-content">
        <Hero />
        <Categories activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <PetsGrid activeFilter={activeFilter} onAddToCart={handleAddToCart} />
        <Services />
        <Contact />
      </main>

      <Footer />

      {isOpen && (
        <CartDialog
          cart={cart}
          total={total}
          onClose={closeCart}
          onRemove={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}
    </>
  )
}
