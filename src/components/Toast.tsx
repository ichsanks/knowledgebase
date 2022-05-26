import { ReactNode } from "react";
import {
  FaTimes,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { toastHide, useToastDispatch, useToastState } from "store";

export function Toast() {
  const dispatch = useToastDispatch();
  const { show, message, type } = useToastState();

  const handleClose = () => {
    toastHide(dispatch);
  };

  return (
    <>
      {show && (
        <div className={`toast toast--${type}`}>
          <div className="toast__wrapper">
            <span className="toast__icon">{IconType[type]}</span>
            <div className="toast__content">
              <h4>{type}</h4>
              <p>{message}</p>
            </div>
            <button className="toast__close" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

type Icon = {
  [key: string]: ReactNode;
  error: ReactNode;
  warning: ReactNode;
  info: ReactNode;
  success: ReactNode;
};

const IconType: Icon = {
  error: <FaExclamationCircle />,
  warning: <FaExclamationTriangle />,
  info: <FaInfoCircle />,
  success: <FaCheckCircle />,
};
