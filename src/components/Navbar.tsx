import { useState } from 'react';
import { Plus, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function MedicalPlus({ size = 38, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-pink ${className}`}
      style={{ width: size, height: size }}
    >
      <Plus
        className="text-primary"
        strokeWidth={3}
        style={{ width: size * 0.5, height: size * 0.5 }}
      />
    </div>
  );
}

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-soft" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => go('/')} className="flex items-center gap-2.5 cursor-pointer" aria-label="OrthoCare home">
            <MedicalPlus size={38} />
            <span className="text-xl font-extrabold text-navy tracking-tight">OrthoCare</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => go('/')} className="text-sm font-semibold text-navy/70 hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => go('/#products')} className="text-sm font-semibold text-navy/70 hover:text-primary transition-colors">
              Products
            </button>
            <button onClick={() => go('/')} className="text-sm font-semibold text-navy/70 hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => go('/')} className="text-sm font-semibold text-navy/70 hover:text-primary transition-colors">
              Contact
            </button>
            <button onClick={() => go('/admin')} className="text-sm font-semibold text-navy/70 hover:text-primary transition-colors">
              Admin
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="p-2 text-navy/50 hover:text-primary transition-colors" aria-label="View wishlist">
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => go('/cart')}
              className="p-2 text-navy/50 hover:text-primary transition-colors relative"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-navy" aria-label="Toggle navigation menu" aria-expanded={open}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <button onClick={() => go('/')} className="block w-full text-left px-3 py-2 text-sm font-semibold text-navy/70 hover:text-primary hover:bg-pink-50 rounded-lg transition-colors">
              Home
            </button>
            <button onClick={() => go('/#products')} className="block w-full text-left px-3 py-2 text-sm font-semibold text-navy/70 hover:text-primary hover:bg-pink-50 rounded-lg transition-colors">
              Products
            </button>
            <button onClick={() => go('/')} className="block w-full text-left px-3 py-2 text-sm font-semibold text-navy/70 hover:text-primary hover:bg-pink-50 rounded-lg transition-colors">
              About
            </button>
            <button onClick={() => go('/')} className="block w-full text-left px-3 py-2 text-sm font-semibold text-navy/70 hover:text-primary hover:bg-pink-50 rounded-lg transition-colors">
              Contact
            </button>
            <button onClick={() => go('/admin')} className="block w-full text-left px-3 py-2 text-sm font-semibold text-navy/70 hover:text-primary hover:bg-pink-50 rounded-lg transition-colors">
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
