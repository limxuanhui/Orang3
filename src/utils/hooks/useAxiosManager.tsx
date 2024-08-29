import { useContext, useEffect } from 'react';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { urlFactory } from '@helpers/factory';
import { printPrettyJson } from '@helpers/functions';
import { axiosPublic, axiosPrivate } from '@helpers/singletons';
import useTokensManager from '@hooks/useTokensManager';
import { AuthContext } from '@contexts/AuthContext';

const useAxiosManager = () => {
  const userInfo = useContext(AuthContext);
  const { retrieveToken, storeToken } = useTokensManager();

  useEffect(() => {
    axiosPrivate.interceptors.request.use(
      async (config: InternalAxiosRequestConfig<any>) => {
        if (!config.headers['Authorization']) {
          console.info('!!!!!!!!!!!!!!!! Request Intercepted !!!!!!!!!!!!!!!!');
          const accessToken = await retrieveToken('access_token');
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
        console.info('!!!!!!!!!!!!!!!! Response Intercepted !!!!!!!!!!!!!!!!');
        const prevRequest = error.config;

        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          const refreshToken: string | undefined =
            await retrieveToken('refresh_token');

          if (refreshToken) {
            const requestData = {
              refreshToken,
              userId: userInfo.user?.id,
            };

            try {
              const response: AxiosResponse = await axiosPublic.post(
                urlFactory('user-auth-refresh-tokens'),
                requestData,
              );

              console.info('Response from refresh token');
              printPrettyJson(response.data);

              console.log('!!!!!!!!!!!!!!!! Tokens Refreshed !!!!!!!!!!!!!!!!');
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
            } catch (err) {
              console.error(`An error occurred when refreshing tokens: ${err}`);
            }
          }
        }

        userInfo.logoutHandler();
        return Promise.reject(error);
      },
    );
    return () => {
      axiosPrivate.interceptors.request.clear();
      axiosPrivate.interceptors.response.clear();
    };
  }, [retrieveToken, storeToken, userInfo]);

  return { axiosPublic, axiosPrivate };
};

export default useAxiosManager;
