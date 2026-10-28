import React, { useEffect } from "react";
import { useStore } from "../context/StoreContext";

export const Toast = () => {
  const { toastMessage, setToastMessage } = useStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="toast-notification-wrap">
      <div className="toast-notification-body">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
