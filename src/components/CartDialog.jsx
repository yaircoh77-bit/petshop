import { useEffect, useRef } from 'react'

export default function CartDialog({ cart, total, onClose, onRemove, onCheckout }) {
  const closeBtnRef = useRef(null)

  // Focus the close button when dialog opens
  useEffect(() => {
    closeBtnRef.current?.focus()
  }, [])

  return (
    <div
      className="cart-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-dialog-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="cart-panel">
        <div className="cart-header">
          <h2 id="cart-dialog-title">Shopping Cart</h2>
          <button
            ref={closeBtnRef}
            className="cart-close-btn"
            aria-label="Close shopping cart"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <ul className="cart-items" role="list" aria-label="Items in cart">
          {cart.length === 0 ? (
            <li className="cart-empty">Your cart is empty.</li>
          ) : (
            cart.map((item) => (
              <li key={item.id} className="cart-item" role="listitem">
                <span className="cart-item-emoji" aria-hidden="true">{item.emoji}</span>
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price.toLocaleString()}</p>
                </div>
                <button
                  className="cart-item-remove"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="cart-footer">
          <p className="cart-total">
            Total: <strong>${total.toFixed(2)}</strong>
          </p>
          <button className="btn btn-primary" onClick={onCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
