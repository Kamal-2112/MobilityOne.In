export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count_label: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  image: string;
  stock: number;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  total: number;
  status: OrderStatus;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  created_at: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  product_id: string | null;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
};
