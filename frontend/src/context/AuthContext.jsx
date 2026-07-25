import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .me()
      .then(({ user }) => setUser(user))
      .catch(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  // rememberMe=true -> persists across browser restarts (localStorage)
  // rememberMe=false -> cleared when the tab/session closes (sessionStorage)
  function persistSession(token, userData, rememberMe) {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', token);
    setUser(userData);
  }

  async function signup(payload) {
    const { token, user: newUser } = await api.signup(payload);
    persistSession(token, newUser, true);
    return newUser;
  }

  async function login(payload, rememberMe) {
    const { token, user: loggedInUser } = await api.login(payload);
    persistSession(token, loggedInUser, rememberMe);
    return loggedInUser;
  }

  function logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
