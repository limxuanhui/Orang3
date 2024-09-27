/* eslint-disable dot-notation */
import { useContext, useEffect } from 'react';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { urlFactory } from '@helpers/factory';
import { axiosPublic, axiosPrivate } from '@helpers/singletons';
import useTokensManager from '@hooks/useTokensManager';
import { AuthContext } from '@contexts/AuthContext';

const useAxiosManager = () => {
  const { user, logoutHandler } = useContext(AuthContext);
  const { retrieveToken, storeToken } = useTokensManager();

  useEffect(() => {
    if (!user) {
      return;
    }

    axiosPrivate.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<any>) => {
        if (!config.headers['Authorization']) {
          console.info('!!!!!!!!!!!!!!!! Request Intercepted !!!!!!!!!!!!!!!!');
          const accessToken = await retrieveToken('access_token');
          console.log('Access token intercepted: ', accessToken);
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      async (error: any) => {
        return Promise.reject(error);
      },
    );

    axiosPrivate.interceptors.response.use(
      async (config: AxiosResponse) => config,
      async (error: any) => {
        const prevRequest = error.config;

        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const refreshToken: string | undefined =
            await retrieveToken('refresh_token');

          if (refreshToken) {
            const requestData = {
              refreshToken,
              userId: user.id,
            };

            try {
              const response: AxiosResponse = await axiosPublic.post(
                urlFactory('user-auth-refresh-tokens'),
                requestData,
              );

              const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              } = response.data;
              await storeToken(newAccessToken, 'access_token');
              await storeToken(newRefreshToken, 'refresh_token');

              if (newAccessToken && newRefreshToken) {
                prevRequest.headers['Authorization'] =
                  `Bearer ${newAccessToken}`;
              } else {
                throw Error('Access token or refresh token are not refreshed');
              }

              return axiosPrivate(prevRequest);
            } catch (err: any) {
              console.error(
                `An error occurred when refreshing tokens: ${err?.response.data}`,
              );
            }
          }
          logoutHandler();
        }
        return Promise.reject('An error occurred:(');
      },
    );
    return () => {
      axiosPrivate.interceptors.request.clear();
      axiosPrivate.interceptors.response.clear();
    };
  }, [logoutHandler, retrieveToken, storeToken, user]);

  return { axiosPublic, axiosPrivate };
};

export default useAxiosManager;
