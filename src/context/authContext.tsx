import { createContext } from 'react';

import { AuthContextType } from '@/shared/interfaces/auth-context.interface';

// Create the context with default empty object casted to our type
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
