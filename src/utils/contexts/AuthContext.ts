import { createContext } from "react";
import { GypsieUser } from "../types/navigation";

type Auth = {
  user: GypsieUser;
  loading: boolean;
  loginHandler: () => void;
  googleSigninHandler: () => void;
  logoutHandler: () => void;
};

export const AuthContext = createContext<Auth>({
  user: null,
  loading: false,
  loginHandler: () => {},
  googleSigninHandler: () => {},
  logoutHandler: () => {},
});
