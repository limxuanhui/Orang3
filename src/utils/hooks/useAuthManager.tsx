import { useCallback, useEffect, useState } from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { v4 as uuidv4 } from "uuid";
import type { GypsieUser } from "../../components/navigators/types/types";
import { printPrettyJson } from "../helpers/functions";
import { BACKEND_BASE_URL } from "@env";

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
  const [user, setUser] = useState<GypsieUser>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const url = BACKEND_BASE_URL + "/api/auth/signin";

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
        if (!newUserData) {
          throw new Error("User data is not set properly");
        }
      } catch (error: any) {
        console.error("An error occurred while setting user data: " + error);
      }
    },
    [AsyncStorage],
  );

  const retrieveUserIdToken = useCallback(async () => {
    console.info("Retrieving user id token...");
    try {
      const idToken = await EncryptedStorage.getItem("id_token");
      if (!idToken) {
        throw new Error("User id token is null");
      }
      return idToken;
    } catch (error: any) {
      console.error(
        "An error occurred while retrieving user id token: " + error,
      );
    }
  }, [EncryptedStorage]);

  const retrieveUserData = useCallback(async () => {
    console.info("Retrieving user data...");
    try {
      const userData = await AsyncStorage.getItem("user_data");
      if (!userData) {
        console.error("User data is null");
        return;
      }
      return JSON.parse(userData);
    } catch (error: any) {
      console.error("An error occurred while retrieving user data: " + error);
    }
  }, [AsyncStorage]);

  const removeUserIdToken = useCallback(async () => {
    console.info("Removing user id token...");
    try {
      const idToken = await retrieveUserIdToken();
      if (idToken === undefined) {
        // throw new Error("User id token is undefined");
        console.error("No user id token");
        return;
      }
      await EncryptedStorage.removeItem("id_token");
    } catch (error: any) {
      console.error("An error occurred while removing user id token: " + error);
    }
  }, [EncryptedStorage, retrieveUserIdToken]);

  const removeUserData = useCallback(async () => {
    console.info("Removing user data...");
    try {
      const userData = await retrieveUserData();
      if (!userData) {
        // throw new Error("User data is undefined");
        console.error("No user data");
        return;
      }
      await AsyncStorage.removeItem("user_data");
    } catch (error: any) {
      console.error("An error occurred while removing user data: " + error);
    }
  }, [AsyncStorage, retrieveUserData]);

  const clearStorage = useCallback(async () => {
    console.info("Clearing storage...");
    try {
      await EncryptedStorage.clear();
      await AsyncStorage.clear();
    } catch (error: any) {
      console.error("An error occurred while clearing storage: " + error);
    }
  }, [EncryptedStorage, AsyncStorage]);

  const logoutHandler = useCallback(async () => {
    // Remove token
    await removeUserData();
    await removeUserIdToken();
    setUser(undefined);
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
      console.info("Checking if id token expired...");
      console.info("idToken: ", idToken);
      if (idToken) {
        const decodedIdToken: GoogleIdToken = decodeIdToken(idToken);
        const currentTime = Math.floor(Date.now() / 1000);
        console.info("Decoded jwt: ", JSON.stringify(decodedIdToken, null, 4));
        console.info("Token expires at: ", decodedIdToken.exp);
        console.info("Time now: ", currentTime);
        console.info("Time left: ", decodedIdToken.exp - currentTime);
        return currentTime < decodedIdToken.exp;
      }
      return false;
    },
    [decodeIdToken],
  );

  const googleSigninHandler = useCallback(async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      console.info("Awaiting Google sign in...");
      const userInfo = await GoogleSignin.signIn();
      console.info(
        "Google sign in complete!\nUser info:" +
          JSON.stringify(userInfo, null, 4),
      );

      if (userInfo.idToken) {
        const { sub, name, email, picture } = decodeIdToken(userInfo.idToken);
        const requestBody: { user: GypsieUser; idToken: string } = {
          user: {
            id: sub,
            name,
            handle: name.replace(" ", ""),
            email,
            avatar: { id: uuidv4(), type: "image/unknown", uri: picture, height: -1, width: -1 },
          },
          idToken: userInfo.idToken,
        };

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
        // User cancelled the sign in flow
        console.log("Status Code: SIGN_IN_CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign in is in progress
        console.log("Status Code: IN_PROGRESS");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available
        console.log("Status Code: PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        // Some other error happened
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
    uuidv4,
    decodeIdToken,
    printPrettyJson,
    setIsLoggedIn,
    setLoading,
    setUser,
    storeUserIdToken,
    storeUserData,
  ]);

  useEffect(() => {
    console.log("useAuthManager useEffect called...");
    const checkUserLoggedIn = async () => {
      // Check for existence of valid id token
      const idToken = await retrieveUserIdToken();
      const tokenIsValid = await checkIfIdTokenIsValid(idToken);
      if (!tokenIsValid) {
        setUser(undefined);
        setIsLoggedIn(false);
        await removeUserIdToken();
        await removeUserData();
        return;
      }
      const fetchedUser = await retrieveUserData();
      console.log("fetchedUser: ", fetchedUser);
      if (fetchedUser) {
        setUser(fetchedUser);
        setIsLoggedIn(true);
      }
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
    googleSigninHandler,
    logoutHandler,
  };
};

export default useAuthManager;
