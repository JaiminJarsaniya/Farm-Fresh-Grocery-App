
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical,
  Package,
  Edit,
  Trash2
} from "lucide-react";
import { products, categories } from "@/lib/data";
import { toast } from "@/components/ui/sonner";
import AddProductModal from "./AddProductModal";
import { useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "@/store/slices/productSlice";

const ProductsList = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const dispatch = useDispatch();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };

  const handleDelete = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      toast.success("Product deleted successfully");
    }
  };

  const handleAddProduct = (newProduct: any) => {
    // In a real app, we would save to the database
    dispatch(addProduct({
      id: products.length + 1,
      ...newProduct,
      rating: 0,
      reviews: [],
      featured: false
    }));
    setIsAddModalOpen(false);
    toast.success("Product added successfully");
  };
  
  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Package className="h-6 w-6" /> Products
          </h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
          <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter("all")}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={categoryFilter === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryFilter(category.name)}
              >
                {category.name}
              </Button>
            ))}
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{product.category}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    {product.discountedPrice ? (
                      <div>
                        <span className="font-medium">${product.discountedPrice.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground line-through ml-1">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {product.stock > 10 ? (
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          In Stock ({product.stock})
                        </div>
                      ) : product.stock > 0 ? (
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          Low Stock ({product.stock})
                        </div>
                      ) : (
                        <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                          Out of Stock
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredProducts.length}</span> of{" "}
            <span className="font-medium">{products.length}</span> products
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
      
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </AdminLayout>
  );
};

export default ProductsList;
