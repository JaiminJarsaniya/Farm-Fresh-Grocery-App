
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users, products, orders } from "@/lib/data";
import AdminLayout from "./AdminLayout";
import { 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  DollarSign 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data for charts
const salesData = [
  { name: "Jan", total: 1400 },
  { name: "Feb", total: 1800 },
  { name: "Mar", total: 2200 },
  { name: "Apr", total: 2600 },
  { name: "May", total: 3200 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4200 },
];

const AdminDashboard = () => {
  const { isAuthenticated, user, isAdmin } = useAuth();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  
  // Calculate statistics
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Get recent orders
  const recentOrders = [...orders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bol">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+12.4% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">+8 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">+5 new today</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Sales Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent orders */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/orders">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3">Order ID</th>
                  <th className="text-left pb-3">Customer</th>
                  <th className="text-left pb-3">Date</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-right pb-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map(order => {
                  const customer = users.find(user => user.id === order.userId);
                  return (
                    <tr key={order.id}>
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{customer?.name || "Unknown"}</td>
                      <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 text-right">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
