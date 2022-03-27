import React, { createContext, useState } from "react";

export const DialogDisplayContext = createContext();

function StateProvider({ children }) {
  const [display, setDisplay] = useState("none");
  const changeDisplay = (newDisplay) => {
    setDisplay(newDisplay);
  };
  return (
    <DialogDisplayContext.Provider value={{ display, changeDisplay }}>
      {children}
    </DialogDisplayContext.Provider>
  );
}

export default StateProvider;
