
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-poppins font-bold text-xl text-primary">
                Farm Fresh
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Farm Fresh delivers the freshest fruits, vegetables, and organic products 
              straight from farms to your doorstep. We believe in quality, sustainability,
              and making healthy food accessible to all.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fresh+Fruits" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fresh Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fresh+Vegetables" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=Dry+Fruits" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dry Fruits
                </Link>
              </li>
              <li>
                <Link to="/products?category=Snacks" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Snacks
                </Link>
              </li>
              <li>
                <Link to="/products?category=Organic+Products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Organic Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Fresh+Juices" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Fresh Juices
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Harvest Road, Farmington, CA 95814
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">(800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">info@farmfresh.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Farm Fresh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
