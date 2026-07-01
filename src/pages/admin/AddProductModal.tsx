
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { categories } from "@/lib/data";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
}

const AddProductModal = ({ isOpen, onClose, onSubmit }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    category: "",
    tags: "",
    stock: "",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"] // Default placeholder
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.stock) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Convert string values to appropriate types
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : undefined,
      stock: parseInt(formData.stock),
      tags: formData.tags.split(",").map(tag => tag.trim())
    };
    
    onSubmit(processedData);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      price: "",
      discountedPrice: "",
      category: "",
      tags: "",
      stock: "",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"]
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
              <Input
                id="discountedPrice"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity *</Label>
              <Input
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                type="number"
                min="0"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="organic, fruit, vegetable, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="images">Image URL</Label>
            <Input
              id="images"
              name="images"
              value={formData.images[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-muted-foreground">Enter a URL for the product image, or leave the default placeholder</p>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
