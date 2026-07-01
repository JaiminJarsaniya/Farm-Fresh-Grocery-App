
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import UsersList from "./pages/admin/UsersList";
import ProductsList from "./pages/admin/ProductsList";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/products" element={<ProductsList />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
