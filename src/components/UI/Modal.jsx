import { createPortal } from "react-dom";
import { forwardRef,useEffect } from "react";
import classModal from "./style/Modal.module.css";

const Modal = forwardRef(function Modal({ children }, ref) {
useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const updateBodyScroll = () => {
      if (dialog.open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    const observer = new MutationObserver(() => {
      updateBodyScroll();
    });

    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

    return () => {
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, [ref]);

  return createPortal(
    <dialog className={classModal.dialog} ref={ref}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
});

export default Modal;
