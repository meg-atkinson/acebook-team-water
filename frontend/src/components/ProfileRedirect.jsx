import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const ProfileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.sub;
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error("Token decoding error:", err);
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default ProfileRedirect;