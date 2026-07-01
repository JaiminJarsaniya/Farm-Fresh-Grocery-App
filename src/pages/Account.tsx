
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { orders } from "@/lib/data";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/store/slices/authSlice";
import { toast } from "@/components/ui/sonner";

const Account = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const dispatch = useDispatch();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Get user's orders
  const userOrders = orders.filter(order => order.userId === user.id);
  
  // State for profile form
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    street: user.address?.street || "",
    city: user.address?.city || "",
    state: user.address?.state || "",
    zipCode: user.address?.zipCode || "",
    country: user.address?.country || "",
  });
  
  // State for password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user profile in Redux store
      dispatch(updateUserProfile({
        name: profileForm.name,
        email: profileForm.email,
        address: {
          street: profileForm.street,
          city: profileForm.city,
          state: profileForm.state,
          zipCode: profileForm.zipCode,
          country: profileForm.country,
        }
      }));
      
      toast.success("Profile updated successfully");
      setIsSubmitting(false);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout>
      <SectionHeading title="My Account" />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg border mb-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-medium">{user.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
              <p className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {user.role === "admin" ? "Admin Account" : "Customer"}
              </p>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mb-4" onClick={handleLogout}>
            Log Out
          </Button>
          
          {user.role === "admin" && (
            <Button className="w-full" asChild>
              <a href="/admin">Go to Admin Dashboard</a>
            </Button>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1">
          <Tabs defaultValue="orders">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders">
              <div className="bg-white rounded-lg border overflow-hidden">
                <h3 className="text-lg font-medium p-4 border-b">Order History</h3>
                
                {userOrders.length > 0 ? (
                  <div className="divide-y">
                    {userOrders.map((order) => (
                      <div key={order.id} className="p-4">
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <p>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <p className="font-medium">Total: ${order.totalAmount.toFixed(2)}</p>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="mb-4">You haven't placed any orders yet.</p>
                    <Button asChild>
                      <a href="/products">Start Shopping</a>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="bg-white rounded-lg border overflow-hidden">
                <h3 className="text-lg font-medium p-4 border-b">Profile Information</h3>
                
                <form onSubmit={handleProfileSubmit} className="p-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-4">Shipping Address</h4>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          name="street"
                          value={profileForm.street}
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={profileForm.city}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            value={profileForm.state}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={profileForm.zipCode}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            name="country"
                            value={profileForm.country}
                            onChange={handleProfileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="bg-white rounded-lg border overflow-hidden">
                <h3 className="text-lg font-medium p-4 border-b">Security Settings</h3>
                
                <form onSubmit={handlePasswordSubmit} className="p-4 space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">Change Password</h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
