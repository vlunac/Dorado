import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // { id, email, full_name, role }
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // On mount, decode the stored token to restore user state without an extra API call
  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ id: payload.sub, role: payload.role });
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    const { data } = await authApi.login(email, password);
    const { access_token } = data;
    localStorage.setItem("token", access_token);
    setToken(access_token);
    const payload = JSON.parse(atob(access_token.split(".")[1]));
    setUser({ id: payload.sub, role: payload.role });
    return payload.role; // so the caller can redirect to the right dashboard
  }

  async function register(formData) {
    await authApi.register(formData);
    return login(formData.email, formData.password);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
