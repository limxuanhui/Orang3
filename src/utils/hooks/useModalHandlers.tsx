import { useCallback, useState } from "react";

const useModalHandlers = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

  const openModal = useCallback(() => {
    setModalIsOpen(true);
  }, [setModalIsOpen]);

  return { modalIsOpen, closeModal, openModal };
};

export default useModalHandlers;
