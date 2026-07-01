
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Ensure the user is an admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Feedback",
      path: "/admin/feedback",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Mobile */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile sidebar backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile sidebar panel */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-all duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-center h-16 border-b">
            <Link
              to="/admin"
              className="flex items-center gap-2 font-bold text-xl text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0z"
                  clipRule="evenodd"
                />
              </svg>
              Admin Panel
            </Link>
          </div>

          <nav className="mt-5 flex flex-col gap-2 px-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <Button
              variant="ghost"
              className="mt-4 flex items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive/10 hover:text-destructive justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>

            <div className="mt-auto mb-4 flex items-center gap-3 px-3 py-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Return to Site
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r bg-white">
        <div className="flex items-center justify-center h-16 border-b">
          <Link
            to="/admin"
            className="flex items-center gap-2 font-bold text-xl text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0z"
                clipRule="evenodd"
              />
            </svg>
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto pt-5 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary/10"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 space-y-2">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive/10 hover:text-destructive justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>

            <Link 
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="h-3 w-3 rotate-90" />
              Return to Site
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center">
          <div className="container flex justify-between items-center">
            <div className="lg:hidden w-8"></div>
            <div className="hidden lg:block"></div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">View Site</Link>
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="text-sm text-right hidden md:block">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
