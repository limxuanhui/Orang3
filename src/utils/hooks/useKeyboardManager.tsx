import { useCallback, useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardManager = () => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);

  const closeKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardIsVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
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

export default useKeyboardManager;
