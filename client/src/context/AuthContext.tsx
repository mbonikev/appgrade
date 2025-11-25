import { createContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

// Use environment variable or fallback to 5000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken"); // get JWT
      if (!token) {
        setUser(null);
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // optional if you also use cookies
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user after login: ", err);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
