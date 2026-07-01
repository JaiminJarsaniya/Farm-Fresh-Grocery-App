
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "@/store";
import { fetchProductsSuccess } from "@/store/slices/productSlice";
import { mockProducts, mockCategories, mockTestimonials } from "@/lib/mockData";

import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import CategoryCard from "@/components/shared/CategoryCard";
import SectionHeading from "@/components/shared/SectionHeading";
import TestimonialCard from "@/components/shared/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Truck, HeartHandshake, Clock } from "lucide-react";

const Index = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    // Load mock products if products are not already loaded
    if (products.length === 0) {
      dispatch(fetchProductsSuccess(mockProducts));
    }
  }, [dispatch, products.length]);

  const featuredProducts = mockProducts.filter((product) => product.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-farmfresh-100 to-farmfresh-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="max-w-lg animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-poppins">
                Fresh from <br />
                <span className="text-primary">Farm to Table</span>
              </h1>
              <p className="text-lg mb-6 text-gray-700">
                Discover the freshest organic produce, delivered straight from the farm to your doorstep. Taste the difference of truly fresh fruits and vegetables.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-zoom-in">
              <img
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=800&auto=format&fit=crop"
                alt="Fresh vegetables and fruits"
                className="rounded-lg shadow-xl object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg md:flex items-center hidden">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-medium">100% Organic Certified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start p-6 bg-farmfresh-50 rounded-xl">
              <div className="bg-primary/10 p-3 rounded-lg mr-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-2">Free Delivery</h3>
                <p className="text-muted-foreground text-sm">Free shipping on all orders over $50</p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-farmfresh-50 rounded-xl">
              <div className="bg-primary/10 p-3 rounded-lg mr-4">
                <HeartHandshake className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-2">Satisfaction Guaranteed</h3>
                <p className="text-muted-foreground text-sm">30-day money-back guarantee</p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-farmfresh-50 rounded-xl">
              <div className="bg-primary/10 p-3 rounded-lg mr-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-lg mb-2">Same Day Shipping</h3>
                <p className="text-muted-foreground text-sm">Order before 2pm for same day shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Shop by Category"
            subtitle="Explore our wide variety of fresh and organic products"
            centered
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {mockCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              title="Featured Products"
              subtitle="Our handpicked selection of premium products"
            />
            <Link
              to="/products"
              className="hidden md:flex items-center text-primary hover:underline"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="What Our Customers Say"
            subtitle="Hear from our satisfied customers about their Farm Fresh experience"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                image={testimonial.image}
                testimonial={testimonial.testimonial}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Ready to Experience the Farm Fresh Difference?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of happy customers enjoying fresh, organic produce delivered to their doorstep
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
