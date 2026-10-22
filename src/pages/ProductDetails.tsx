import { useState, useEffect } from 'react';
import {
  Plus,
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Navbar, { navigate } from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { updateDocumentMeta, SITE_URL } from '@/utils/seo';

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

export default function ProductDetails({ productId }: { productId: string }) {
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (!product) {
      updateDocumentMeta({
        title: 'Product Not Found — MobilityOne',
        description: 'The requested product could not be found.',
        canonicalPath: '/404',
      });
      return;
    }

    const canonicalPath = `/product/${product.id}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    updateDocumentMeta({
      title: `${product.title} — MobilityOne`,
      description: product.description.slice(0, 155),
      canonicalPath,
      ogType: 'product',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: product.description,
          category: product.category,
          image: product.image,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: canonicalUrl,
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/#products` },
            { '@type': 'ListItem', position: 3, name: product.title, item: canonicalUrl },
          ],
        },
      ],
    });
  }, [productId, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
          <p className="text-xl font-bold text-navy">Product not found</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/' },
            { label: product.title },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-card bg-gray-50">
              <img
                src={product.image}
                alt={`${product.title} — ${product.category} from MobilityOne`}
                className="w-full h-full object-cover"
                width={940}
                height={940}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="absolute top-4 left-4" aria-hidden="true">
              <MedicalPlus size={48} />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit px-3 py-1 rounded-full bg-pink-50 text-primary text-xs font-bold uppercase tracking-wider mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 mb-6" aria-label={`Rated ${product.rating} out of 5`}>
              <div className="flex items-center gap-1" role="img" aria-label={`${product.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-primary fill-primary' : 'text-gray-200'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-navy">{product.rating}</span>
              <span className="text-sm text-navy/40">/ 5.0</span>
            </div>
            <p className="text-2xl font-extrabold text-primary mb-6">{product.priceDisplay}</p>
            <p className="text-navy/60 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-navy" id="qty-label">Quantity</span>
              <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden" role="group" aria-labelledby="qty-label">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2.5 text-navy hover:bg-pink-50 transition-colors font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2.5 text-navy font-bold min-w-[3rem] text-center" aria-live="polite">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2.5 text-navy hover:bg-pink-50 transition-colors font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl transition-all shadow-lg ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-primary text-white hover:bg-primary-dark shadow-primary/25'
                }`}
                aria-label={`Add ${product.title} to cart`}
              >
                {added ? (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                className="px-6 py-3.5 border-2 border-navy/10 text-navy font-semibold rounded-xl hover:bg-pink-50 hover:border-pink transition-all flex items-center gap-2"
                aria-label={`Add ${product.title} to wishlist`}
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 p-5 bg-surface rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-navy">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-sm font-semibold text-navy">2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-navy mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  role="article"
                  aria-label={`${p.title}, ${p.priceDisplay}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                      src={p.image}
                      alt={`${p.title} — ${p.category} from MobilityOne`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={940}
                      height={705}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-navy mb-2">{p.title}</h3>
                    <span className="text-lg font-extrabold text-primary">{p.priceDisplay}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
