
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/lib/types';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    searchQuery: string;
  };
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    searchQuery: '',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.filteredProducts = applyFilters(state.products, state.filters);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      state.filteredProducts = applyFilters(state.products, state.filters);
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload;
      state.filteredProducts = applyFilters(state.products, {
        ...state.filters,
        category: action.payload,
      });
    },
    setPriceFilter: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.filters.minPrice = action.payload.min;
      state.filters.maxPrice = action.payload.max;
      state.filteredProducts = applyFilters(state.products, {
        ...state.filters,
        minPrice: action.payload.min,
        maxPrice: action.payload.max,
      });
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.filteredProducts = applyFilters(state.products, {
        ...state.filters,
        searchQuery: action.payload,
      });
    },
    resetFilters: (state) => {
      state.filters = {
        category: null,
        minPrice: null,
        maxPrice: null,
        searchQuery: '',
      };
      state.filteredProducts = state.products;
    },
  },
});

// Helper function to apply filters
const applyFilters = (products: Product[], filters: ProductState['filters']) => {
  let result = [...products];

  // Apply category filter
  if (filters.category) {
    result = result.filter(product => product.category === filters.category);
  }

  // Apply price filters
  if (filters.minPrice !== null) {
    result = result.filter(product => product.price >= (filters.minPrice as number));
  }
  if (filters.maxPrice !== null) {
    result = result.filter(product => product.price <= (filters.maxPrice as number));
  }

  // Apply search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return result;
};

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  updateProduct,
  deleteProduct,
  setCategoryFilter,
  setPriceFilter,
  setSearchQuery,
  resetFilters,
} = productSlice.actions;

export default productSlice.reducer;
