import { useCallback, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardHandlers = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);

  const closeKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [setKeyboardIsVisible]);

  return { keyboardIsVisible, closeKeyboard };
};

export default useKeyboardHandlers;
