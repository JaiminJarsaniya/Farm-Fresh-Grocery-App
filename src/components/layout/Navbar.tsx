
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Heart, Search, Menu, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b transition-all duration-300",
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              FarmFresh
            </Link>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <li key={item.name} className="group">
                  <Link
                    to={item.path}
                    className="relative text-gray-600 hover:text-primary transition-colors py-2 story-link overflow-hidden"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Icons and Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search Button */}
            <Link 
              to="/search" 
              className="text-gray-600 hover:text-primary transition-colors hover:scale-110 transform duration-200"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Favorites Button */}
            <Link 
              to="/favorites" 
              className="relative text-gray-600 hover:text-primary transition-colors hover:scale-110 transform duration-200"
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5" />
              {totalFavorites > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="relative text-gray-600 hover:text-primary transition-colors hover:scale-110 transform duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-fade-in">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Authentication Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/account" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors group"
                >
                  <User className="h-5 w-5 group-hover:scale-110 transform duration-200" />
                  <span className="hidden md:inline font-medium">{user?.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden md:flex hover:bg-primary hover:text-white transition-colors duration-300 items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 transition-colors duration-300"
                  asChild
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-primary transition-colors p-1 rounded-md focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}>
          <ul className="space-y-2 pb-3 border-b">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block py-2 px-4 text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {isAuthenticated ? (
            <div className="py-3 space-y-2">
              <Link
                to="/account"
                className="flex items-center py-2 px-4 text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                <span>My Account</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center py-2 px-4 text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 py-3">
              <Link
                to="/login"
                className="block py-2 px-4 text-gray-600 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 px-4 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
