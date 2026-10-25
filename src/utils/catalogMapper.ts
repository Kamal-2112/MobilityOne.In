import type { Product as DbProduct, Category as DbCategory } from '@/types/database';

export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  priceDisplay: string;
  rating: number;
  image: string;
  description: string;
};

export type Category = {
  title: string;
  description: string;
  image: string;
  products: string;
};

export function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function mapProduct(db: DbProduct): Product {
  return {
    id: db.slug,
    title: db.name,
    category: db.categories?.name ?? 'Uncategorized',
    price: Number(db.price),
    priceDisplay: formatPrice(Number(db.price)),
    rating: Number(db.rating),
    image: db.image,
    description: db.description,
  };
}

export function mapCategory(db: DbCategory): Category {
  return {
    title: db.name,
    description: db.description,
    image: db.image,
    products: db.product_count_label,
  };
}
