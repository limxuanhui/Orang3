import { createContext } from 'react';
import type { GypsieUser } from '@navigators/types/types';

type Auth = {
  user: GypsieUser | undefined;
  isLoggedIn: boolean;
  loading: boolean;
  googleSigninHandler: () => void;
  logoutHandler: () => void;
  deactivateUserHandler: () => void;
  deleteUserHandler: (userId: string) => void;
};

export const AuthContext = createContext<Auth>({
  user: undefined,
  isLoggedIn: false,
  loading: false,
  googleSigninHandler: () => {},
  logoutHandler: () => {},
  deactivateUserHandler: () => {},
  deleteUserHandler: () => {},
});
