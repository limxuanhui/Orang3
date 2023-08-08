import { useCallback, useState } from "react";

const useModalHandler = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, [setModalIsOpen]);

  return { modalIsOpen, closeModal, openModal };
};

export default useModalHandler;
