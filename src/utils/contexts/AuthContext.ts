import { createContext } from "react";
import type { GypsieUser } from "../../components/navigators/types/types";

type Auth = {
  user: GypsieUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  googleSigninHandler: () => void;
  logoutHandler: () => void;
};

export const AuthContext = createContext<Auth>({
  user: null,
  isLoggedIn: false,
  loading: false,
  googleSigninHandler: () => {},
  logoutHandler: () => {},
});
