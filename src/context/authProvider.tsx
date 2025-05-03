import { useState, useEffect, ReactNode } from "react";

import { User, onAuthStateChanged, signOut as firebaseSignOut} from "firebase/auth";

import { AuthContext } from "./authContext";

import { auth } from "@/firebase";
import { AuthContextType } from "@/shared/interfaces/auth-context.interface";

// Define props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
  }
  
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const signOut = () => firebaseSignOut(auth);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  
  const value: AuthContextType = {
    currentUser,
    signOut,
    isLoading: loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}