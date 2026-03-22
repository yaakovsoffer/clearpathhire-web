import { useState } from "react";

// Stub auth hook — client portal auth will be re-implemented in a future phase.
// For now, all auth-dependent pages show "coming soon" or redirect.
export const useAuth = () => {
  const [loading] = useState(false);

  return {
    user: null,
    session: null,
    loading,
    signIn: async (_email: string, _password: string) => {
      return { error: new Error("Authentication is not yet available.") };
    },
    signUp: async (_email: string, _password: string) => {
      return { error: new Error("Authentication is not yet available.") };
    },
    signOut: async () => {
      return { error: null };
    },
    isAuthenticated: false,
  };
};
