import { supabase } from '@/lib/supabase';
import type { Product, Category } from '@/types/database';

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function fetchRelatedProducts(categoryId: string, excludeSlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('slug', excludeSlug)
    .limit(3);

  if (error) throw error;
  return data ?? [];
}

type OrderInput = {
  customer_name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  total: number;
  items: { product_id: string; product_name: string; quantity: number; unit_price: number }[];
};

export async function createOrder(orderData: OrderInput): Promise<{ orderId: string }> {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: orderData.customer_name,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      zip: orderData.zip,
      total: orderData.total,
      status: 'pending',
    })
    .select('id')
    .single();

  if (orderError) throw orderError;
  if (!order) throw new Error('Failed to create order');

  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) throw itemsError;

  return { orderId: order.id };
}

type EnquiryInput = {
  name: string;
  email: string;
  phone: string | null;
  message: string;
  product_id: string | null;
};

export async function createEnquiry(enquiryData: EnquiryInput): Promise<void> {
  const { error } = await supabase.from('enquiries').insert({
    name: enquiryData.name,
    email: enquiryData.email,
    phone: enquiryData.phone,
    message: enquiryData.message,
    product_id: enquiryData.product_id,
    status: 'new',
  });

  if (error) throw error;
}
