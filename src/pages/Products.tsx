
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "@/store";
import { fetchProductsStart, fetchProductsSuccess, setCategoryFilter, setPriceFilter, setSearchQuery, resetFilters } from "@/store/slices/productSlice";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import SectionHeading from "@/components/shared/SectionHeading";
import { categories, products } from "@/lib/data";

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filteredProducts, loading, filters } = useSelector((state: RootState) => state.products);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20]);
  
  // Get all prices to determine min and max
  const allPrices = products.map(product => product.discountedPrice || product.price);
  const minPrice = Math.floor(Math.min(...allPrices));
  const maxPrice = Math.ceil(Math.max(...allPrices));

  useEffect(() => {
    // Simulate fetching products
    dispatch(fetchProductsStart());
    setTimeout(() => {
      dispatch(fetchProductsSuccess(products));
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        dispatch(setCategoryFilter(categoryParam));
      }
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    // Apply category filter from URL if present
    if (!loading) {
    const categoryParam = searchParams.get('category');
      dispatch(setCategoryFilter(categoryParam));
    }
  }, [dispatch, searchParams, loading]);

  const handleCategoryFilter = (category: string | null) => {
    dispatch(setCategoryFilter(category));
    setSearchParams((prevParams) => {
      if (category) {
        prevParams.set('category', category);
      } else {
        prevParams.delete('category');
      }
      return prevParams;
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    dispatch(setPriceFilter({ min: values[0], max: values[1] }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setPriceRange([minPrice, maxPrice]);
    setSearchParams({});
  };

  return (
    <Layout>
      <SectionHeading 
        title="Our Products" 
        subtitle="Explore our range of fresh, organic products directly from farms to your table."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Search</h3>
            <Input 
              placeholder="Search products..." 
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              <Button
                variant={filters.category === null ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => handleCategoryFilter(null)}
              >
                All Products
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={filters.category === category.name ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleCategoryFilter(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Price Range</h3>
            <div className="px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={1}
                value={[
                  filters.minPrice !== null ? filters.minPrice : minPrice,
                  filters.maxPrice !== null ? filters.maxPrice : maxPrice
                ]}
                onValueChange={handlePriceRangeChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Separator />

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleResetFilters}
          >
            Reset Filters
          </Button>
        </div>

        {/* Products grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg aspect-square animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <Button onClick={handleResetFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
