
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
  UserPlus, 
  Filter, 
  MoreVertical,
  Users
} from "lucide-react";
import { users } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";

const UsersList = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }
  
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<"all" | "user" | "admin">("all");
  
  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = role === "all" || user.role === role;
    
    return matchesSearch && matchesRole;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (newRole: "all" | "user" | "admin") => {
    setRole(newRole);
  };

  const handleDelete = (userId: number) => {
    // In a real app, this would delete the user
    toast.success(`User ${userId} would be deleted in a real application`);
  };
  
  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Users className="h-6 w-6" /> Users
          </h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" /> Add New User
        </Button>
      </div>
      
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
          <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant={role === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("all")}
            >
              All
            </Button>
            <Button
              variant={role === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("admin")}
            >
              Admins
            </Button>
            <Button
              variant={role === "user" ? "default" : "outline"}
              size="sm"
              onClick={() => handleRoleFilter("user")}
            >
              Customers
            </Button>
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
                <th className="text-left py-3 px-4">User</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>
                      {user.role === "admin" ? "Admin" : "Customer"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Active
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
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
            Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
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
    </AdminLayout>
  );
};

export default UsersList;
