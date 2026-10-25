import { useState, useEffect } from 'react';
import { ChevronLeft, ShieldCheck, Plus, AlertCircle, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Navbar, { navigate } from '@/components/Navbar';
import { updateDocumentMeta } from '@/utils/seo';
import { createOrder } from '@/services/catalog';

type FormErrors = {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
};

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

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    updateDocumentMeta({
      title: 'Checkout — MobilityOne',
      description: 'Complete your prosthetics and orthotics purchase securely.',
      canonicalPath: '/checkout',
    });
  }, []);

  if (orderSuccess) {
    return (
      <div className="bg-surface min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-emerald-600" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-extrabold text-navy mb-3">Order Received</h1>
            <p className="text-navy/50 mb-6">
              Thank you for your order. We've received your delivery details and our team will contact you shortly to confirm and arrange shipping.
            </p>
            <p className="text-sm text-navy/40 mb-8">No payment has been processed. Payment is arranged after order confirmation.</p>
            <button
              onClick={() => navigate('/')}
              className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-extrabold text-navy mb-2">Your cart is empty</h1>
          <p className="text-navy/40 mb-8">Add products to your cart before checking out.</p>
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

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    else if (form.name.trim().length < 2) e.name = 'Please enter a valid name';

    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[\d\s\-\+\(\)]{7,}$/.test(form.phone.trim())) e.phone = 'Please enter a valid phone number';

    if (!form.address.trim()) e.address = 'Delivery address is required';
    else if (form.address.trim().length < 10) e.address = 'Please enter a complete address';

    if (!form.city.trim()) e.city = 'City is required';
    if (!form.zip.trim()) e.zip = 'ZIP code is required';
    else if (!/^[\d\w\s\-]{3,}$/.test(form.zip.trim())) e.zip = 'Please enter a valid ZIP code';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setOrderError(null);

    try {
      await createOrder({
        customer_name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        zip: form.zip.trim(),
        total,
        items: items.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.title,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
      });
      clearCart();
      setOrderSuccess(true);
      setSubmitting(false);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
      setSubmitting(false);
    }
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
      errors[field]
        ? 'border-primary bg-pink-50/50'
        : 'border-gray-100 focus:border-primary'
    }`;

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-1.5 text-sm font-semibold text-navy/50 hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-extrabold text-navy mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="text-lg font-extrabold text-navy mb-5">Delivery Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className={fieldClass('name')}
                  />
                  {errors.name && (
                    <p className="flex items-center gap-1.5 text-sm text-primary mt-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className={fieldClass('phone')}
                  />
                  {errors.phone && (
                    <p className="flex items-center gap-1.5 text-sm text-primary mt-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-1.5">Delivery Address *</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="123 Main Street, Apt 4B"
                    rows={3}
                    className={fieldClass('address')}
                  />
                  {errors.address && (
                    <p className="flex items-center gap-1.5 text-sm text-primary mt-1.5">
                      <AlertCircle className="w-4 h-4" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">City *</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="New York"
                      className={fieldClass('city')}
                    />
                    {errors.city && (
                      <p className="flex items-center gap-1.5 text-sm text-primary mt-1.5">
                        <AlertCircle className="w-4 h-4" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">ZIP Code *</label>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      placeholder="10001"
                      className={fieldClass('zip')}
                    />
                    {errors.zip && (
                      <p className="flex items-center gap-1.5 text-sm text-primary mt-1.5">
                        <AlertCircle className="w-4 h-4" />
                        {errors.zip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-20">
              <h2 className="text-lg font-extrabold text-navy mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto scrollbar-thin">
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
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-navy/50">Subtotal</span>
                  <span className="font-semibold text-navy">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-navy/50">Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-lg font-bold text-navy">Total</span>
                  <span className="text-2xl font-extrabold text-primary">${total.toLocaleString()}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
              {orderError && (
                <div className="flex items-center gap-1.5 text-sm text-primary mt-3 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {orderError}
                </div>
              )}
              <div className="flex items-center gap-2 mt-4 justify-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs text-navy/40">No payment details required. Payment arranged after confirmation.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
