
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/shared/ProductCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon } from "lucide-react";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchResults, setSearchResults] = useState<{
    products: Product[];
    categories: string[];
  }>({
    products: [],
    categories: [],
  });
  
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = (term: string) => {
    const lowerTerm = term.toLowerCase();
    
    // Search for products
    const matchedProducts = products.filter(
      product =>
        product.name.toLowerCase().includes(lowerTerm) ||
        product.description.toLowerCase().includes(lowerTerm) ||
        product.category.toLowerCase().includes(lowerTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
    
    // Get unique categories from matched products
    const uniqueCategories = Array.from(
      new Set(matchedProducts.map(product => product.category))
    );
    
    setSearchResults({
      products: matchedProducts,
      categories: uniqueCategories,
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
      performSearch(searchTerm);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Filter products based on active tab
  const filteredProducts = activeTab === "all" 
    ? searchResults.products 
    : searchResults.products.filter(product => product.category === activeTab);

  return (
    <Layout>
      <SectionHeading title="Search Products" />

      <div className="max-w-3xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products, categories, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {query ? (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-2">
              Search results for "{query}"
            </h2>
            <p className="text-muted-foreground">
              Found {searchResults.products.length} products across {searchResults.categories.length} categories
            </p>
          </div>

          {searchResults.products.length > 0 ? (
            <>
              <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All Results</TabsTrigger>
                  {searchResults.categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-primary/10 rounded-full mb-6">
                <SearchIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any products matching "{query}".
                Try using different keywords or browse our categories.
              </p>
              <Link to="/categories">
                <Button>Browse Categories</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-primary/10 rounded-full mb-6">
            <SearchIcon className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-medium mb-2">Search for products</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Enter keywords related to the products you're looking for,
            or browse our popular categories below.
          </p>
          
          <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-8">
            <Link to="/search?q=organic">
              <Button variant="outline" className="w-full">Organic</Button>
            </Link>
            <Link to="/search?q=fruit">
              <Button variant="outline" className="w-full">Fruits</Button>
            </Link>
            <Link to="/search?q=vegetable">
              <Button variant="outline" className="w-full">Vegetables</Button>
            </Link>
            <Link to="/search?q=snack">
              <Button variant="outline" className="w-full">Snacks</Button>
            </Link>
            <Link to="/search?q=nut">
              <Button variant="outline" className="w-full">Nuts</Button>
            </Link>
            <Link to="/search?q=dried">
              <Button variant="outline" className="w-full">Dried Fruits</Button>
            </Link>
            <Link to="/search?q=fresh">
              <Button variant="outline" className="w-full">Fresh</Button>
            </Link>
            <Link to="/search?q=seasonal">
              <Button variant="outline" className="w-full">Seasonal</Button>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Search;
