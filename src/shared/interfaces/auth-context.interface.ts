import { User } from 'firebase/auth';

export interface AuthContextType {
  currentUser: User | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
}
