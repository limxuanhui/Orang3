import { createContext } from 'react';
import type { GypsieUser } from '@navigators/types/types';

type Auth = {
  user: GypsieUser | undefined;
  isLoggedIn: boolean;
  loading: boolean;
  googlePlacesApiKey: string;
  refreshUserData: (user: GypsieUser) => void;
  googleSigninHandler: () => void;
  logoutHandler: () => void;
  deactivateUserHandler: () => void;
  deleteUserHandler: (userId: string) => void;
};

export const AuthContext = createContext<Auth>({
  user: undefined,
  isLoggedIn: false,
  loading: false,
  googlePlacesApiKey: '',
  refreshUserData: () => {},
  googleSigninHandler: () => {},
  logoutHandler: () => {},
  deactivateUserHandler: () => {},
  deleteUserHandler: () => {},
});
