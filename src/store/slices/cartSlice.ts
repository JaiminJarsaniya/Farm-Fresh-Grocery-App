
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/lib/types';
import { toast } from '@/components/ui/sonner';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = calculateTotal(state.items);
      toast("Item added to cart");
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      state.total = calculateTotal(state.items);
      toast("Item removed from cart");
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      toast("Cart cleared");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
