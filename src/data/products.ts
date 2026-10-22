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

export const products: Product[] = [
  {
    id: 'carbon-fiber-prosthetic-leg',
    title: 'Carbon Fiber Prosthetic Leg',
    category: 'Prosthetics',
    price: 2450,
    priceDisplay: '$2,450',
    rating: 4.8,
    image:
      'https://images.pexels.com/photos/8436963/pexels-photo-8436963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Engineered with aerospace-grade carbon fiber, this prosthetic leg delivers exceptional strength-to-weight ratio and energy return for active users. Features a dynamic response foot, waterproof construction, and adjustable suspension for a secure, comfortable fit.',
  },
  {
    id: 'myoelectric-prosthetic-arm',
    title: 'Myoelectric Prosthetic Arm',
    category: 'Prosthetics',
    price: 3200,
    priceDisplay: '$3,200',
    rating: 4.9,
    image:
      'https://images.pexels.com/photos/8437039/pexels-photo-8437039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A state-of-the-art myoelectric prosthetic arm with multi-grip myoelectric hand, intuitive muscle-signal control, and a lightweight silicone skin for a natural appearance. Offers proportional speed control and all-day battery life.',
  },
  {
    id: 'knee-orthosis-brace',
    title: 'Knee Orthosis Brace',
    category: 'Orthotics',
    price: 320,
    priceDisplay: '$320',
    rating: 4.6,
    image:
      'https://images.pexels.com/photos/3913024/pexels-photo-3913024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A custom-fit knee orthosis brace designed to stabilize and protect the knee joint during recovery. Features adjustable hinges, breathable neoprene construction, and anti-slip silicone bands for all-day comfort.',
  },
  {
    id: 'lightweight-wheelchair',
    title: 'Lightweight Wheelchair',
    category: 'Mobility Aids',
    price: 890,
    priceDisplay: '$890',
    rating: 4.7,
    image:
      'https://images.pexels.com/photos/6195475/pexels-photo-6195475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'An ultra-lightweight aluminum wheelchair weighing only 26 lbs. Features quick-release wheels, foldable frame for easy transport, ergonomic seating, and adjustable footrests for maximum user comfort.',
  },
  {
    id: 'rehab-therapy-kit',
    title: 'Rehab Therapy Kit',
    category: 'Rehabilitation',
    price: 540,
    priceDisplay: '$540',
    rating: 4.5,
    image:
      'https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A comprehensive rehabilitation therapy kit including resistance bands, balance pads, grip strengtheners, and a guided exercise guide. Ideal for post-surgery recovery and ongoing physical therapy at home.',
  },
  {
    id: 'ankle-foot-orthosis',
    title: 'Ankle Foot Orthosis',
    category: 'Orthotics',
    price: 175,
    priceDisplay: '$175',
    rating: 4.4,
    image:
      'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'A lightweight ankle-foot orthosis (AFO) designed to support weak or unstable ankle joints. Features a low-profile carbon fiber strut, padded lining, and adjustable calf strap for a secure fit.',
  },
];

export const categories = [
  {
    title: 'Prosthetics',
    description:
      'Advanced prosthetic limbs engineered for comfort, durability, and natural movement.',
    image:
      'https://images.pexels.com/photos/8436963/pexels-photo-8436963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    products: '24 products',
  },
  {
    title: 'Orthotics',
    description:
      'Custom orthotic braces and supports designed to stabilize, protect, and enhance mobility.',
    image:
      'https://images.pexels.com/photos/3913024/pexels-photo-3913024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    products: '18 products',
  },
  {
    title: 'Mobility Aids',
    description:
      'Wheelchairs, walkers, and mobility solutions to support independence in daily life.',
    image:
      'https://images.pexels.com/photos/6195475/pexels-photo-6195475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    products: '32 products',
  },
  {
    title: 'Rehabilitation',
    description:
      'Therapy equipment and rehabilitation tools to accelerate recovery and build strength.',
    image:
      'https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    products: '15 products',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
