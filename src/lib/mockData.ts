
import { Product, Category, Review, User, Order } from './types';

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Fresh Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=300&auto=format&fit=crop',
    productCount: 10,
  },
  {
    id: 2,
    name: 'Fresh Vegetables',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=1170&auto=format&fit=crop',
    productCount: 10,
  },
  {
    id: 3,
    name: 'Dry Fruits',
    image: 'https://images.unsplash.com/photo-1767877609689-beff32b9c0ac?q=80&w=2069&auto=format&fit=crop',
    productCount: 10,
  },
  {
    id: 4,
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=1632&auto=format&fit=crop',
    productCount: 10,
  },
  {
    id: 5,
    name: 'Organic Products',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=684&auto=format&fit=crop',
    productCount: 4,
  },
  {
    id: 6,
    name: 'Fresh Juices',
    image: 'https://images.unsplash.com/photo-1657101455328-6821c90b0ad3?q=80&w=881&auto=format&fit=crop',
    productCount: 5,
  },
];

export const mockReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent product! Very fresh and tasty.',
    date: '2023-08-15',
  },
  {
    id: 2,
    userId: 2,
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Good quality and fast delivery.',
    date: '2023-07-22',
  },
  {
    id: 3,
    userId: 3,
    userName: 'Mike Johnson',
    rating: 5,
    comment: 'The freshest fruits I have ever ordered online.',
    date: '2023-08-05',
  },
  {
    id: 4,
    userId: 4,
    userName: 'Sarah Williams',
    rating: 3,
    comment: 'The product was good but delivery was delayed.',
    date: '2023-06-30',
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Fresh Apples',
    description: 'Crisp and juicy apples harvested from organic farms. Perfect for snacking, baking, or adding to your favorite recipes.',
    price: 2.99,
    discountedPrice: 2.49,
    category: 'Fresh Fruits',
    tags: ['apple', 'fruit', 'organic', 'fresh'],
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.5,
    reviews: mockReviews.slice(0, 2),
    featured: true,
  },
  {
    id: 2,
    name: 'Organic Bananas',
    description: 'Naturally sweet and nutritious organic bananas. Rich in potassium and perfect for smoothies, baking, or eating fresh.',
    price: 1.99,
    category: 'Fresh Fruits',
    tags: ['banana', 'fruit', 'organic', 'fresh'],
    stock: 75,
    images: [
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.2,
    reviews: mockReviews.slice(1, 3),
    featured: false,
  },
  {
    id: 3,
    name: 'Fresh Spinach Bundle',
    description: 'Farm-fresh organic spinach leaves, washed and ready to use. Perfect for salads, sautéing, or adding to smoothies.',
    price: 3.49,
    discountedPrice: 2.99,
    category: 'Fresh Vegetables',
    tags: ['spinach', 'vegetable', 'organic', 'greens', 'fresh'],
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.8,
    reviews: mockReviews.slice(0, 1),
    featured: false,
  },
  {
    id: 4,
    name: 'Blueberries',
    description: 'Antioxidant-rich blueberries packed with flavor. Great for baking, smoothies, or as a healthy snack.',
    price: 7.99,
    category: 'Fresh Fruits',
    tags: ['fruit', 'blueberry', 'antioxidant'],
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1769&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=1769&auto=format&fit=crop',
    ],
    rating: 4.9,
    reviews: mockReviews.slice(0, 2),
    featured: true,
  },
  {
    id: 5,
    name: 'Banana Chips',
    description: 'Crunchy, lightly salted banana chips made from fresh bananas. A delightful and healthy snack for any time of day.',
    price: 4.99,
    discountedPrice: 3.99,
    category: 'Snacks',
    tags: ['banana', 'chips', 'snack', 'healthy'],
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1613919113683-8a397179b383?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613919113683-8a397179b383?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.3,
    reviews: mockReviews.slice(1, 2),
    featured: false,
  },
  {
    id: 6,
    name: 'Organic Honey',
    description: 'Pure, unprocessed honey sourced from organic farms. Rich in antioxidants and natural sweetness.',
    price: 8.99,
    category: 'Organic Products',
    tags: ['honey', 'organic', 'natural', 'sweetener'],
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.9,
    reviews: mockReviews.slice(0, 3),
    featured: true,
  },
  {
    id: 7,
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice with no added sugar or preservatives. Rich in vitamin C and perfect for breakfast.',
    price: 5.99,
    category: 'Fresh Juices',
    tags: ['juice', 'orange', 'fresh', 'breakfast', 'vitamin'],
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.7,
    reviews: mockReviews.slice(2, 3),
    featured: true,
  },
  {
    id: 8,
    name: 'Organic Bell Peppers',
    description: 'Colorful organic bell peppers - red, yellow, and green. Perfect for salads, stir-fries, or grilling.',
    price: 4.49,
    discountedPrice: 3.79,
    category: 'Fresh Vegetables',
    tags: ['peppers', 'vegetables', 'organic', 'fresh'],
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=600&auto=format&fit=crop',
    ],
    rating: 4.4,
    reviews: mockReviews.slice(1, 3),
    featured: true,
  },
];

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=5',
    address: {
      street: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
    },
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@farmfresh.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=12',
    address: {
      street: '789 Oak St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60007',
      country: 'USA',
    },
  },
];

export const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        productId: 1,
        quantity: 2,
        name: 'Fresh Apples',
        price: 2.49,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=600&auto=format&fit=crop',
      },
      {
        productId: 3,
        quantity: 1,
        name: 'Fresh Spinach Bundle',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop',
      },
    ],
    totalAmount: 7.97,
    status: 'delivered',
    paymentMethod: 'card',
    createdAt: '2023-07-15T10:30:00Z',
    updatedAt: '2023-07-16T14:20:00Z',
  },
  {
    id: 2,
    userId: 2,
    items: [
      {
        productId: 5,
        quantity: 3,
        name: 'Banana Chips',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1613919113683-8a397179b383?q=80&w=600&auto=format&fit=crop',
      },
    ],
    totalAmount: 11.97,
    status: 'processing',
    paymentMethod: 'cod',
    createdAt: '2023-08-01T15:45:00Z',
    updatedAt: '2023-08-02T09:15:00Z',
  },
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    image: "https://i.pravatar.cc/150?img=32",
    testimonial: "Farm Fresh has transformed how my family eats. The fruits and vegetables are always crisp and delicious, just like from my own garden!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?img=11",
    testimonial: "As someone who cooks professionally, the quality of ingredients matters. Farm Fresh delivers excellence consistently with their organic produce.",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Health Coach",
    image: "https://i.pravatar.cc/150?img=20",
    testimonial: "I recommend Farm Fresh to all my clients. Their organic options are perfect for anyone serious about clean eating and healthy living.",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Loyal Customer",
    image: "https://i.pravatar.cc/150?img=53",
    testimonial: "Quick delivery, excellent packaging, and the freshest produce in town. I've never been disappointed in over two years as a customer!",
    rating: 5
  }
];
