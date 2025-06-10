import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import FriendsPage from "./pages/Friends/FriendsPage";
//import { ProfileRedirect } from "./components/ProfileRedirect";
import { getMe } from "./services/userMe";


// docs: https://reactrouter.com/en/main/start/overview

// Create User Context
export const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/feed",
    element: <FeedPage />,
  },
  {
    path: "/friends",
    element: <FriendsPage />,
  },
  // {
  //   path: "/profile",
  //   element: <ProfileRedirect />
  // },
  {
    path: "/profile/:id",
    element: <ProfilePage />
  }
]);


function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to get current user from backend
  const getCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return null;
    }
    
    try {
      const userData = await getMe(token);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check for existing session on app load
  useEffect(() => {
    getCurrentUser();
  }, []);

  // Function to refresh user data (can be called after login from other components)
  const refreshUser = async () => {
    await getCurrentUser();
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }


  return (
    <UserContext.Provider value={{ user, setUser, getCurrentUser, refreshUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
