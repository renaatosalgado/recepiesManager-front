import React, { createContext, useState } from "react";

export const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [message, setMessage] = useState(null);

  function handleClose() {
    setMessage(null);
  }

  return (
    <AlertContext.Provider value={{ message, setMessage, handleClose }}>
      {children}
    </AlertContext.Provider>
  );
}
