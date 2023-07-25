import { useEffect, useState } from "react";

const useUserProfileManager = ({ userId }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    bannerUri: "/Users/limxuanhui/bluextech/gypsie/assets/images/sample1.jpg"
  });

  useEffect(() => {
    // DUMMY request
    // HTTP request to get profile data with userId
  }, [userId]);

  return { isLoading, userData };
};

export default useUserProfileManager;
