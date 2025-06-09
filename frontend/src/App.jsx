import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import { EditProfilePage } from "./pages/EditProfile/EditProfilePage";
import { ProfilePage } from "./pages/Profile/ProfilePage";
import FriendsPage from "./pages/Friends/FriendsPage";
import { ProfileRedirect } from "./components/ProfileRedirect";

// docs: https://reactrouter.com/en/main/start/overview
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
  {
    path: "/editprofile/:id",
    element: <EditProfilePage />,
  },
  {
    path: "/profile",
    element: <ProfileRedirect />
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
