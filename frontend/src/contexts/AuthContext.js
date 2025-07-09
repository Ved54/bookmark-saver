import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to load user', error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    const response = await authAPI.login(userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

