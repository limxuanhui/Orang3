import { useCallback, useEffect, useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import type { GypsieUser } from "../../components/navigators/types/types";
import { printPrettyJson } from "../helpers/functions";

type GoogleIdToken = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  nonce: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
};

const useAuthManager = () => {
  const [user, setUser] = useState<GypsieUser>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const url = "http://localhost:8080/auth/signin";

  const storeUserIdToken = useCallback(
    async (idToken: string) => {
      try {
        await EncryptedStorage.setItem("id_token", idToken);
        const newIdToken = await retrieveUserIdToken();
        if (newIdToken === undefined) {
          throw new Error("User id token is not set properly");
        }
      } catch (error: any) {
        console.error(
          "An error occurred while storing user id token: " + error,
        );
      }
    },
    [EncryptedStorage],
  );

  const storeUserData = useCallback(
    async (userData: any) => {
      try {
        await AsyncStorage.setItem("user_data", JSON.stringify(userData));
        const newUserData = await retrieveUserData();
        if (newUserData === undefined) {
          throw new Error("User data is not set properly");
        }
      } catch (error: any) {
        console.error("An error occurred while setting user data: " + error);
      }
    },
    [AsyncStorage],
  );

  const retrieveUserIdToken = useCallback(async () => {
    console.log("Retrieving user id token...");
    try {
      const idToken = await EncryptedStorage.getItem("id_token");
      if (idToken !== null) {
        return idToken;
      }
      throw new Error("User id token is null");
    } catch (error: any) {
      console.error(
        "An error occurred while retrieving user id token: " + error,
      );
    }
  }, [EncryptedStorage]);

  const retrieveUserData = useCallback(async () => {
    console.log("Retrieving user data...");
    try {
      const userData = await AsyncStorage.getItem("user_data");
      if (userData === null) {
        console.error("User data is null");
        return;
      }
      return JSON.parse(userData);
    } catch (error: any) {
      console.error("An error occurred while retrieving user data: " + error);
    }
  }, [AsyncStorage]);

  const removeUserIdToken = useCallback(async () => {
    console.log("Removing user id token...");
    try {
      const idToken = await retrieveUserIdToken();
      if (idToken === undefined) {
        // throw new Error("User id token is undefined");
        console.error("User id token is undefined");
        return;
      }
      await EncryptedStorage.removeItem("id_token");
    } catch (error: any) {
      console.error("An error occurred while removing user id token: " + error);
    }
  }, [EncryptedStorage, retrieveUserIdToken]);

  const removeUserData = useCallback(async () => {
    console.log("Removing user data...");
    try {
      const userData = await retrieveUserData();
      if (userData === undefined) {
        // throw new Error("User data is undefined");
        console.error("User data is undefined");
        return;
      }
      await AsyncStorage.removeItem("user_data");
    } catch (error: any) {
      console.error("An error occurred while removing user data: " + error);
    }
  }, [AsyncStorage, retrieveUserData]);

  const clearStorage = useCallback(async () => {
    console.log("Clearing storage...");
    try {
      await EncryptedStorage.clear();
      await AsyncStorage.clear();
    } catch (error: any) {
      console.error("An error occurred while clearing storage: " + error);
    }
  }, [EncryptedStorage, AsyncStorage]);

  const loginHandler = useCallback(async () => {
    console.warn("logging in");
  }, []);

  const googleSigninHandler = useCallback(async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      console.log("Awaiting google signin");
      const userInfo = await GoogleSignin.signIn();
      console.log("Google signin complete: " + userInfo);

      if (userInfo.idToken) {
        const { sub, name, email, picture } = decodeIdToken(userInfo.idToken);
        const requestBody = {
          user: { id: sub, name, handle: name, email, picture },
          id_token: userInfo.idToken,
        };
        console.log(JSON.stringify(requestBody, null, 4));
        const response = await axios.post(url, requestBody, {});

        if (response.data) {
          await storeUserIdToken(userInfo.idToken);
          await storeUserData(response.data);
          setUser(response.data);
          setIsLoggedIn(true);
        }
        printPrettyJson(response.data);
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("Status Code: SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation log in is in progress
        console.log("Status Code: IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available
        console.log("Status Code: PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        // some other error happened
        console.error(
          "An unknown error occurred: Code:",
          error.code,
          "Error:",
          error,
        );
      }
      setLoading(false);
    }
    setLoading(false);
  }, [
    GoogleSignin,
    printPrettyJson,
    setLoading,
    setUser,
    storeUserIdToken,
    storeUserData,
  ]);

  const logoutHandler = useCallback(async () => {
    // Remove token
    await removeUserData();
    await removeUserIdToken();
    setUser(null);
    setIsLoggedIn(false);
  }, [removeUserIdToken, removeUserData, setIsLoggedIn, setUser]);

  const decodeIdToken = useCallback(
    (idToken: string): GoogleIdToken => {
      return jwtDecode(idToken);
    },
    [jwtDecode],
  );

  const checkIfIdTokenIsValid = useCallback(
    async (idToken: string | undefined) => {
      console.log("Checking if id token expired...");
      console.log("idToken: ", idToken);
      if (idToken) {
        const decodedIdToken: GoogleIdToken = decodeIdToken(idToken);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("Decoded jwt: ", JSON.stringify(decodedIdToken, null, 4));
        console.log("Token expires at: ", decodedIdToken.exp);
        console.log("Time now: ", currentTime);
        console.log("Time left: ", decodedIdToken.exp - currentTime);
        return currentTime < decodedIdToken.exp;
      }
      return false;
    },
    [decodeIdToken],
  );

  useEffect(() => {
    console.log("useAuthManager useEffect called...");
    const checkUserLoggedIn = async () => {
      // Check for existence of valid id token
      const idToken = await retrieveUserIdToken();
      const tokenIsValid = await checkIfIdTokenIsValid(idToken);
      if (!tokenIsValid) {
        setUser(null);
        setIsLoggedIn(false);
        await removeUserIdToken();
        await removeUserData();
        return;
      }
      const fetchedUser = await retrieveUserData();
      console.log("fetchedUser: ", fetchedUser);
      setUser(fetchedUser);
      setIsLoggedIn(true);
    };

    checkUserLoggedIn();
  }, [
    retrieveUserData,
    checkIfIdTokenIsValid,
    removeUserIdToken,
    removeUserData,
    setIsLoggedIn,
  ]);

  return {
    user,
    isLoggedIn,
    loading,
    loginHandler,
    googleSigninHandler,
    logoutHandler,
  };
};

export default useAuthManager;
