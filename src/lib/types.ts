
// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  tags: string[];
  stock: number;
  images: string[];
  rating: number;
  reviews: Review[];
  featured: boolean;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Cart Types
export interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

// Order Types
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cod" | "card" | "upi";
  createdAt: string;
  updatedAt: string;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
}
