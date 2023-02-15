import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useCallback, useState } from "react";
import { GypsieUser } from "../types/navigation";

const useAuthManager = () => {
  const [user, setUser] = useState<GypsieUser>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loginHandler = useCallback(async () => {
    console.warn("logging in");
  }, []);

  const googleSigninHandler = useCallback(async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      console.log("USER: ", userInfo);
      console.warn("Signed in");
      //   setPhoto(userInfo.user.photo || "");
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation log in is in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available
      } else {
        // some other error happened
      }
    }
    setLoading(false);
  }, [GoogleSignin, setLoading, setUser]);

  const logoutHandler = useCallback(async () => {
    console.warn("logging out");
    setUser(null);
    // remove token
    console.warn("Logged out");
  }, []);

  return { user, loading, loginHandler, googleSigninHandler, logoutHandler };
};

export default useAuthManager;
