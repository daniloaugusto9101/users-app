import React from "react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = React.useState<AuthState>({
    isAuthenticated: false,
    token: null,
  });

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token,
      });
    }
  }, []);

  const login = React.useCallback((token: string) => {
    localStorage.setItem('authToken', token);
    setAuthState({
      isAuthenticated: true,
      token,
    });
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem('authToken');
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    token: authState.token,
    login,
    logout,
  };
}