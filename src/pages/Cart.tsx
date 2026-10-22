import { ShoppingCart, Plus, Minus, Trash2, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Navbar, { navigate } from '@/components/Navbar';
import { updateDocumentMeta } from '@/utils/seo';

function MedicalPlus({ size = 38, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-pink ${className}`}
      style={{ width: size, height: size }}
    >
      <Plus className="text-primary" strokeWidth={3} style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
}

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    updateDocumentMeta({
      title: 'Shopping Cart — MobilityOne',
      description: 'Review your selected prosthetics and orthotics before checkout.',
      canonicalPath: '/cart',
    });
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <div className="w-24 h-24 rounded-full bg-pink flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy mb-2">Your cart is empty</h1>
          <p className="text-navy/40 mb-8 text-center max-w-sm">
            Looks like you haven't added any products yet. Browse our catalog to find the right fit.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm font-semibold text-navy/50 hover:text-primary transition-colors mb-6"
          aria-label="Continue shopping"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Continue Shopping
        </button>

        <h1 className="text-3xl font-extrabold text-navy mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex gap-4"
              >
                <button
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 cursor-pointer"
                >
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </button>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-navy">{item.product.title}</h3>
                    <p className="text-sm text-navy/40">{item.product.category}</p>
                    <p className="text-lg font-extrabold text-primary mt-1">{item.product.priceDisplay}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-2 text-navy hover:bg-pink-50 transition-colors"
                        aria-label={`Decrease ${item.product.title} quantity`}
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span className="px-3 py-2 text-navy font-bold min-w-[2.5rem] text-center" aria-live="polite">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-2 text-navy hover:bg-pink-50 transition-colors"
                        aria-label={`Increase ${item.product.title} quantity`}
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-navy/30 hover:text-primary transition-colors"
                      aria-label={`Remove ${item.product.title} from cart`}
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-20">
              <h2 className="text-lg font-extrabold text-navy mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-navy/60">{item.product.title} × {item.quantity}</span>
                    <span className="font-semibold text-navy">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-navy">Total</span>
                  <span className="text-2xl font-extrabold text-primary">${total.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
              >
                Proceed to Checkout
              </button>
              <div className="flex items-center gap-2 mt-4 justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs text-navy/40">Secure checkout powered by SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
