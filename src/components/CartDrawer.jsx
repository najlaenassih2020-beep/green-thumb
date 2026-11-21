import { useCart } from "../context/CartContext";
import { ShoppingBag, Sprout, X } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQty, clearCart, cartTotal, cartCount } =
    useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sage/10">
          <h2 className="font-heading text-lg font-semibold text-forest flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-forest" />
            Your Cart
            {cartCount > 0 && (
              <span className="ml-1 text-xs bg-terracotta text-white px-2 py-0.5 rounded-full font-heading font-semibold">
                {cartCount}
              </span>
            )}
          </h2>
          <button
            id="cart-close"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sage/10 transition-colors text-charcoal-light"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Sprout className="w-16 h-16 text-sage/40 mb-4 animate-bounce" />
              <p className="font-heading text-lg font-medium text-charcoal mb-1">
                Your cart is empty
              </p>
              <p className="text-sm text-charcoal-light">
                Add some green friends to get started!
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 bg-white rounded-xl p-3 shadow-sm border border-sage/5"
                >
                  {/* Image thumbnail */}
                  <div className="w-14 h-14 rounded-lg bg-sage/5 overflow-hidden flex items-center justify-center shrink-0 border border-sage/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-medium text-sm text-charcoal truncate">
                      {item.name}
                    </p>
                    <p className="text-terracotta font-semibold text-sm">
                      ${item.price}
                    </p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-full border border-sage/20 flex items-center justify-center text-xs hover:bg-sage/10 transition-colors"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full border border-sage/20 flex items-center justify-center text-xs hover:bg-sage/10 transition-colors"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-charcoal-light hover:text-red-500 transition-colors"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sage/10 px-6 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-charcoal-light">Subtotal</span>
              <span className="font-heading text-xl font-bold text-forest">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              id="checkout-btn"
              className="w-full py-3 rounded-xl bg-forest text-cream font-heading font-semibold text-sm hover:bg-forest-light transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-xs text-charcoal-light hover:text-terracotta transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
