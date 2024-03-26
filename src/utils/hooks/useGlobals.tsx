const useGlobals = () => {
  // return { mode: __DEV__ ? 'development' : 'production' };
  return { mode: __DEV__ ? 'production' : 'development' };
};

export default useGlobals;
