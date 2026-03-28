import { useState, useEffect, useCallback, useRef } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const cartBtnRef = useRef(null)

  const addToCart = useCallback((pet) => {
    if (pet.status === 'reserved') return
    setCart((prev) => {
      if (prev.find((i) => i.id === pet.id)) return prev
      return [...prev, pet]
    })
  }, [])

  const removeFromCart = useCallback((petId) => {
    setCart((prev) => prev.filter((i) => i.id !== petId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => {
    setIsOpen(false)
    setTimeout(() => cartBtnRef.current?.focus(), 0)
  }, [])

  // Lock body scroll while cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && isOpen) closeCart()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, closeCart])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return { cart, total, isOpen, cartBtnRef, addToCart, removeFromCart, clearCart, openCart, closeCart }
}
