import { useEffect } from 'react';
import {
  Plus,
  ShoppingCart,
  Heart,
  ChevronRight,
  ShieldCheck,
  Clock,
  PhoneCall,
  Stethoscope,
  Star,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Navbar, { navigate } from '@/components/Navbar';
import { updateDocumentMeta, SITE_URL } from '@/utils/seo';

function MedicalPlus({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-pink ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Plus
        className="text-primary"
        strokeWidth={3}
        style={{ width: size * 0.5, height: size * 0.5 }}
      />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white" aria-label="MobilityOne prosthetics and orthotics">
      <Plus className="plus-decoration top-12 right-[8%] w-20 h-20 text-pink/60" strokeWidth={1.5} aria-hidden="true" />
      <Plus className="plus-decoration top-1/2 right-[5%] w-12 h-12 text-pink/40" strokeWidth={2} aria-hidden="true" />
      <Plus className="plus-decoration bottom-16 left-[3%] w-16 h-16 text-pink/40" strokeWidth={1.5} aria-hidden="true" />
      <div className="plus-decoration top-1/4 left-[40%] w-32 h-32 rounded-full bg-pink/30 blur-2xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink text-primary text-sm font-semibold mb-6">
              <MedicalPlus size={20} className="!bg-transparent" />
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Trusted by 500+ clinics nationwide
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy leading-tight tracking-tight">
              Restoring Mobility,<br />
              <span className="text-primary">Rebuilding</span> Lives
            </h1>
            <p className="mt-6 text-lg text-navy/50 leading-relaxed max-w-lg">
              Premium prosthetics and orthotics crafted with precision engineering.
              Empowering movement and confidence for every step of your journey.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                aria-label="Shop prosthetics and orthotics products"
              >
                Shop Products
              </button>
              <button
                className="px-7 py-3.5 border-2 border-navy/10 text-navy font-semibold rounded-xl hover:bg-pink-50 hover:border-pink transition-all"
                aria-label="Book a prosthetics or orthotics consultation"
              >
                Book a Consultation
              </button>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-3xl font-extrabold text-navy">10k+</p>
                <p className="text-sm text-navy/40">Patients Served</p>
              </div>
              <div className="w-px h-12 bg-gray-200" aria-hidden="true" />
              <div>
                <p className="text-3xl font-extrabold text-primary">98%</p>
                <p className="text-sm text-navy/40">Satisfaction Rate</p>
              </div>
              <div className="w-px h-12 bg-gray-200" aria-hidden="true" />
              <div>
                <p className="text-3xl font-extrabold text-navy">15+</p>
                <p className="text-sm text-navy/40">Years Experience</p>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card">
              <img
                src="https://images.pexels.com/photos/8437039/pexels-photo-8437039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Prosthetic leg technology in a clinical setting"
                className="w-full h-full object-cover"
                width={940}
                height={705}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-hover p-5 hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">Certified Experts</p>
                <p className="text-xs text-navy/40">FDA Approved Products</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-hover p-5 hidden sm:flex items-center gap-3">
              <MedicalPlus size={48} />
              <div>
                <p className="text-sm font-bold text-navy">Expert Care</p>
                <p className="text-xs text-navy/40">Free Consultations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: ShieldCheck, label: 'Certified & FDA Approved' },
    { icon: Clock, label: '24/7 Customer Support' },
    { icon: PhoneCall, label: 'Free Doctor Consultation' },
    { icon: Stethoscope, label: 'Expert Clinical Fittings' },
  ];

  return (
    <section className="bg-white border-b border-gray-100 py-6" aria-label="Trust indicators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <span className="text-sm font-semibold text-navy/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const { addToCart } = useCart();

  return (
    <section id="products" className="bg-surface py-16 md:py-24 scroll-mt-20" aria-label="Featured prosthetics and orthotics products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Plus className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            Top-Rated <span className="text-primary">Products</span>
          </h2>
          <p className="mt-4 text-navy/50 max-w-2xl mx-auto">
            Discover our most popular prosthetics, orthotics, and mobility solutions,
            trusted by patients and clinics alike.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              aria-label={`${product.title}, ${product.priceDisplay}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                <img
                  src={product.image}
                  alt={`${product.title} — ${product.category} from MobilityOne`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={940}
                  height={705}
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-navy">
                  {product.category}
                </span>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-navy/40 hover:text-primary transition-colors"
                  aria-label={`Add ${product.title} to wishlist`}
                >
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-primary fill-primary" aria-hidden="true" />
                  <span className="text-sm font-semibold text-navy">{product.rating}</span>
                  <span className="text-xs text-navy/40 ml-1">/ 5.0</span>
                </div>
                <h3 className="text-base font-bold text-navy mb-3 leading-snug">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-primary">{product.priceDisplay}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow-md"
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCards() {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden" aria-label="Product categories">
      <Plus className="plus-decoration top-10 right-[5%] w-24 h-24 text-pink/40" strokeWidth={1} aria-hidden="true" />
      <Plus className="plus-decoration bottom-10 left-[5%] w-16 h-16 text-pink/30" strokeWidth={1.5} aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink text-primary text-xs font-bold uppercase tracking-wider mb-3">
            <Plus className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
            Our Catalog
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy tracking-tight">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="mt-4 text-navy/50 max-w-2xl mx-auto">
            Explore our comprehensive range of prosthetics, orthotics, and mobility solutions
            tailored to your needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <article
              key={cat.title}
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              aria-label={`Browse ${cat.title}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
                <img
                  src={cat.image}
                  alt={`${cat.title} category — ${cat.description}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  width={940}
                  height={705}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-navy">{cat.title}</h3>
                  <span className="text-xs font-bold text-primary bg-pink-50 px-2.5 py-1 rounded-full">
                    {cat.products}
                  </span>
                </div>
                <p className="text-sm text-navy/50 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                  Explore
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceStrip() {
  const items = [
    { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $150' },
    { icon: ShieldCheck, title: '2-Year Warranty', desc: 'Full coverage on all products' },
    { icon: CheckCircle2, title: '30-Day Returns', desc: 'Hassle-free return policy' },
    { icon: PhoneCall, title: 'Expert Support', desc: 'Consult our specialists anytime' },
  ];

  return (
    <section className="bg-navy py-12" aria-label="Our services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs text-white/50">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <MedicalPlus size={38} />
              <span className="text-xl font-extrabold tracking-tight">MobilityOne</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Premium prosthetics and orthotics for a life in motion.
            </p>
          </div>
          <nav aria-label="Products">
            <h2 className="text-sm font-bold mb-4">Products</h2>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="/#products" className="hover:text-primary transition-colors">Prosthetics</a></li>
              <li><a href="/#products" className="hover:text-primary transition-colors">Orthotics</a></li>
              <li><a href="/#products" className="hover:text-primary transition-colors">Mobility Aids</a></li>
              <li><a href="/#products" className="hover:text-primary transition-colors">Rehabilitation</a></li>
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="text-sm font-bold mb-4">Company</h2>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="/" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </nav>
          <nav aria-label="Support">
            <h2 className="text-sm font-bold mb-4">Support</h2>
            <ul className="space-y-2 text-sm text-white/50">
              <li><a href="/" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Shipping</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Warranty</a></li>
            </ul>
          </nav>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">© 2026 MobilityOne. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="/" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    updateDocumentMeta({
      title: 'MobilityOne — Premium Prosthetics & Orthotics E-Commerce',
      description: 'Shop premium prosthetics and orthotics from MobilityOne. Prosthetic legs, AFO and KAFO braces, orthotic insoles, spinal orthoses, and custom orthotic solutions for restored mobility.',
      canonicalPath: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'MobilityOne',
          url: SITE_URL,
          description: 'Premium prosthetics and orthotics e-commerce for a life in motion.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'MobilityOne',
          url: SITE_URL,
        },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <FeaturedProducts />
        <CategoryCards />
        <ServiceStrip />
      </main>
      <Footer />
    </div>
  );
}
