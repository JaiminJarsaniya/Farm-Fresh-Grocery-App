
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toast } from "@/components/ui/sonner";
import { loginSuccess, loginFailure, logout, registerSuccess, registerFailure } from '@/store/slices/authSlice';
import { users } from '@/lib/data';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = (email: string, password: string) => {
    // In a real app, this would be an API call to authenticate
    const user = users.find(user => user.email === email);
    
    if (user) {
      // In a real app, we'd verify the password against a hashed version
      dispatch(loginSuccess(user));
      toast.success("Login successful!");
      return true;
    } else {
      dispatch(loginFailure("Invalid email or password"));
      toast.error("Invalid email or password");
      return false;
    }
  };

  const register = (name: string, email: string, password: string) => {
    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    
    if (userExists) {
      dispatch(registerFailure("Email already in use"));
      toast.error("Email already in use");
      return false;
    }
    
    // In a real app, this would be an API call to register the user
    // and the password would be hashed
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role: "user" as const,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop"
    };
    
    // In a real app, we would add the new user to the database
    users.push(newUser);
    
    dispatch(registerSuccess(newUser));
    toast.success("Registration successful!");
    return true;
  };

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const isAdmin = () => {
    return auth.isAuthenticated && auth.user?.role === 'admin';
  };

  return {
    ...auth,
    login,
    register,
    logout: logoutUser,
    isAdmin,
  };
};
