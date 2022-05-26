import {
  useCallback,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";

const modalElement = document.getElementById("modal-root");

export const Modal = forwardRef(function ({ children }, ref) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => e.keyCode === 27 && close(),
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className="modal modal-fade">
        <div className="modal-overlay" onClick={close} />
        <span
          role="button"
          className="modal-close"
          aria-label="close"
          onClick={close}
        >
          <FaTimes />
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  );
});
