import { jwtDecode } from 'jwt-decode';
import { useCallback } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

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
type TokenType =
  | 'id_token'
  | 'access_token'
  | 'refresh_token'
  | 'google_places_api_key';

const useTokensManager = () => {
  const retrieveToken = useCallback(async (tokenType: TokenType) => {
    console.info(`Retrieving ${tokenType}...`);
    try {
      const token = await EncryptedStorage.getItem(tokenType);
      if (!token) {
        throw new Error(`${tokenType} is null`);
      }
      return token;
    } catch (error: any) {
      // console.error(
      //   `An error occurred while retrieving ${tokenType}: ${error}`,
      // );
    }
  }, []);

  const storeToken = useCallback(
    async (token: string, tokenType: TokenType) => {
      try {
        await EncryptedStorage.setItem(tokenType, token);
        const newToken = await retrieveToken(tokenType);
        if (newToken === undefined) {
          throw new Error(`${tokenType} is not set properly`);
        }
      } catch (error: any) {
        // console.error(`An error occurred while storing ${tokenType}: ${error}`);
      }
    },
    [retrieveToken],
  );

  const removeToken = useCallback(
    async (tokenType: TokenType) => {
      console.info(`Removing ${tokenType}...`);
      try {
        const idToken = await retrieveToken(tokenType);
        if (!idToken) {
          // throw new Error("User id token is undefined");
          // console.error(`No ${tokenType} found`);
          return;
        }
        await EncryptedStorage.removeItem(tokenType);
      } catch (error: any) {
        // console.error(
        //   `An error occurred while removing ${tokenType}: ${error}`,
        // );
      }
    },
    [retrieveToken],
  );

  const removeAllTokens = useCallback(async () => {
    await Promise.all([
      removeToken('id_token'),
      removeToken('access_token'),
      removeToken('refresh_token'),
      removeToken('google_places_api_key'),
    ]);
  }, [removeToken]);

  const decodeIdToken = useCallback((idToken: string): GoogleIdToken => {
    return jwtDecode(idToken);
  }, []);

  const checkIfIdTokenIsValid = useCallback(
    async (idToken: string | undefined) => {
      console.info('Checking if id token expired...');
      console.info('idToken: ', idToken);
      if (idToken) {
        const decodedIdToken: GoogleIdToken = decodeIdToken(idToken);
        const currentTime = Math.floor(Date.now() / 1000);
        console.info('Decoded jwt: ', JSON.stringify(decodedIdToken, null, 4));
        console.info('Token expires at: ', decodedIdToken.exp);
        console.info('Time now: ', currentTime);
        console.info('Time left: ', decodedIdToken.exp - currentTime);
        return currentTime < decodedIdToken.exp;
      }
      return false;
    },
    [decodeIdToken],
  );

  const checkAllTokensExist = useCallback(async () => {
    const [idToken, accessToken, refreshToken, googlePlacesApiKey] =
      await Promise.all([
        retrieveToken('id_token'),
        retrieveToken('access_token'),
        retrieveToken('refresh_token'),
        retrieveToken('google_places_api_key'),
      ]);

    return idToken && accessToken && refreshToken && googlePlacesApiKey;
  }, [retrieveToken]);

  return {
    removeAllTokens,
    removeToken,
    retrieveToken,
    storeToken,
    decodeIdToken,
    checkIfIdTokenIsValid,
    checkAllTokensExist,
  };
};

export default useTokensManager;
