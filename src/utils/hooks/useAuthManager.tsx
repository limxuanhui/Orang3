import { useCallback, useEffect, useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import type { GypsieUser } from '@navigators/types/types';
import { printPrettyJson } from '@helpers/functions';
import { queryClient } from '@helpers/singletons';
import { urlFactory } from '@helpers/factory';
import Toast from 'react-native-toast-message';
import { TOAST_TITLE_STYLE } from '@constants/constants';
import useTokensManager from '@hooks/useTokensManager';
import useAxiosManager from '@hooks/useAxiosManager';

const useAuthManager = () => {
  const [user, setUser] = useState<GypsieUser>();
  console.log('useAuthManager user refreshed: ', user?.bio);
  const {
    retrieveToken,
    removeAllTokens,
    storeToken,
    decodeIdToken,
    checkAllTokensExist,
  } = useTokensManager();
  const { axiosPublic, axiosPrivate } = useAxiosManager();
  const [googlePlacesApiKey, setGooglePlacesApiKey] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const retrieveUserData = useCallback(async () => {
    console.info('Retrieving user data...');
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (!userData) {
        console.error('User data is null');
        return;
      }
      return JSON.parse(userData);
    } catch (error: any) {
      console.error('An error occurred while retrieving user data: ' + error);
    }
  }, []);

  const storeUserData = useCallback(
    async (userData: any) => {
      try {
        await AsyncStorage.setItem('user_data', JSON.stringify(userData));
        const newUserData = await retrieveUserData();
        if (!newUserData) {
          throw new Error('User data is not set properly');
        }
      } catch (error: any) {
        console.error('An error occurred while setting user data: ' + error);
      }
    },
    [retrieveUserData],
  );

  const removeUserData = useCallback(async () => {
    console.info('Removing user data...');
    try {
      const userData = await retrieveUserData();
      if (!userData) {
        // throw new Error("User data is undefined");
        console.error('No user data');
        return;
      }
      await AsyncStorage.removeItem('user_data');
    } catch (error: any) {
      console.error('An error occurred while removing user data: ' + error);
    }
  }, [retrieveUserData]);

  const refreshUserData = useCallback(
    async (userData: GypsieUser) => {
      await storeUserData(userData);
      setUser(userData);
      console.log('Refreshed user, should be updated now');
    },
    [storeUserData],
  );

  const googleSigninHandler = useCallback(async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      console.info('Awaiting Google sign in...');
      const userInfo = await GoogleSignin.signIn();
      console.info('Google sign in complete!');

      if (userInfo.idToken) {
        const { sub, name, email, picture } = decodeIdToken(userInfo.idToken);
        const requestBody: { user: GypsieUser; idToken: string } = {
          user: {
            id: sub,
            name,
            handle: name.replace(' ', ''),
            email,
            bio: '',
            avatar: {
              id: uuidv4(),
              type: 'image/unknown',
              uri: picture,
              height: -1,
              width: -1,
            },
            isDeactivated: false,
          },
          idToken: userInfo.idToken,
        };

        const response = await axiosPublic.post(
          urlFactory('user-authentication'),
          requestBody,
          {},
        );
        if (response.data) {
          printPrettyJson(response.data);
          await storeToken(response.data.accessToken, 'access_token');
          await storeToken(response.data.refreshToken, 'refresh_token');
          await storeToken(
            response.data.googlePlacesApiKey,
            'google_places_api_key',
          );
          await storeUserData(response.data.user);
          setGooglePlacesApiKey(response.data.googlePlacesApiKey);
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign in flow
        console.log('Status Code: SIGN_IN_CANCELLED');
        Toast.show({
          type: 'error',
          swipeable: true,
          text1: 'Sign in cancelled',
          text1Style: TOAST_TITLE_STYLE,
        });
        setLoading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign in is in progress
        console.log('Status Code: IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available
        console.log('Status Code: PLAY_SERVICES_NOT_AVAILABLE');
        Toast.show({
          type: 'error',
          swipeable: true,
          text1: 'Play services are not available',
          text1Style: TOAST_TITLE_STYLE,
        });
      } else {
        // Some other error happened
        console.error(
          'An unknown error occurred: Code:',
          error.code,
          'Error:',
          error.stack,
        );
        Toast.show({
          type: 'error',
          swipeable: true,
          text1: `An unknown error occurred: ${error}`,
          text1Style: TOAST_TITLE_STYLE,
        });
      }
    }

    setLoading(false);
  }, [axiosPublic, decodeIdToken, storeToken, storeUserData]);

  const logoutHandler = useCallback(async () => {
    console.log('Logging out!!!!');
    await removeUserData();
    await removeAllTokens();
    setUser(undefined);
    setIsLoggedIn(false);
    setGooglePlacesApiKey('');
    queryClient.clear();
  }, [removeUserData, removeAllTokens]);

  const deactivateUserHandler = useCallback(async () => {
    console.log('Deactivating user...', user?.id);
    setLoading(true);
    if (user?.id) {
      try {
        console.log('Starting deactivation of user...');
        const response = await axiosPrivate.post(
          urlFactory('user-account-deactivate-by-userid', { id: user.id }),
        );
        console.log('Deactivated user...');
        printPrettyJson(response.data);

        await logoutHandler();
      } catch (err) {
        console.error(err);
      }
    }
    setLoading(false);
  }, [axiosPrivate, logoutHandler, user?.id]);

  const deleteUserHandler = useCallback(
    async (userId: string) => {
      console.log('Deleting user...', userId, user?.id);
      setLoading(true);
      if (userId === user?.id) {
        try {
          console.log('Starting deletion of user...');
          const response = await axiosPrivate.delete(
            urlFactory('user-account-delete-by-userid', { id: userId }),
          );
          console.log('Deleted user...');
          printPrettyJson(response.data);

          await logoutHandler();
        } catch (err) {
          console.error(err);
        }
      }
      setLoading(false);
    },
    [axiosPrivate, logoutHandler, user?.id],
  );

  useEffect(() => {
    console.log('useAuthManager useEffect called...');
    // Check if user is logged in when app is newly launched
    const checkUserLoggedIn = async () => {
      if (!checkAllTokensExist()) {
        await logoutHandler();
        return;
      }

      const fetchedUser = await retrieveUserData();
      const apiKey = await retrieveToken('google_places_api_key');
      if (fetchedUser && apiKey) {
        setUser(fetchedUser);
        setGooglePlacesApiKey(apiKey);
        setIsLoggedIn(true);
      }
    };

    checkUserLoggedIn();
  }, [checkAllTokensExist, logoutHandler, retrieveToken, retrieveUserData]);

  return {
    user,
    isLoggedIn,
    loading,
    googlePlacesApiKey,
    refreshUserData,
    googleSigninHandler,
    logoutHandler,
    deactivateUserHandler,
    deleteUserHandler,
  };
};

export default useAuthManager;
