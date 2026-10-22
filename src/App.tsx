import { useState, useEffect } from 'react';
import { CartProvider } from '@/context/CartContext';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import ProductDetails from '@/pages/ProductDetails';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import NotFound from '@/pages/NotFound';

type Route = 'home' | 'admin' | 'product' | 'cart' | 'checkout' | 'notfound';

function parseRoute(): { route: Route; param?: string } {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const currentPath = window.location.pathname;
  const path = (
    basePath &&
    (currentPath === basePath ||
     currentPath.startsWith(`${basePath}/`))
    ? currentPath.slice(basePath.length) || '/'
    : currentPath
).toLowerCase();
  if (path === '/' || path === '') return { route: 'home' };
  if (path.startsWith('/admin')) return { route: 'admin' };
  if (path.startsWith('/cart')) return { route: 'cart' };
  if (path.startsWith('/checkout')) return { route: 'checkout' };
  if (path.startsWith('/product/')) {
    const param = path.slice('/product/'.length);
    if (param) return { route: 'product', param };
  }
  return { route: 'notfound' };
}

export default function App() {
  const [state, setState] = useState(parseRoute());

  useEffect(() => {
    const onPop = () => {
      setState(parseRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <CartProvider>
      {state.route === 'admin' && <Admin />}
      {state.route === 'cart' && <Cart />}
      {state.route === 'checkout' && <Checkout />}
      {state.route === 'product' && <ProductDetails productId={state.param!} />}
      {state.route === 'notfound' && <NotFound />}
      {state.route === 'home' && <Home />}
    </CartProvider>
  );
}
