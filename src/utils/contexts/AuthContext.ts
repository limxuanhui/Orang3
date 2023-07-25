import { createContext } from "react";
import type { GypsieUser } from "../../components/navigators/types/types";

type Auth = {
  user: GypsieUser;
  isLoggedIn: boolean;
  loading: boolean;
  loginHandler: () => void;
  googleSigninHandler: () => void;
  logoutHandler: () => void;
};

export const AuthContext = createContext<Auth>({
  user: null,
  isLoggedIn: false,
  loading: false,
  loginHandler: () => {},
  googleSigninHandler: () => {},
  logoutHandler: () => {},
});
