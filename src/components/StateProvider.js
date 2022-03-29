import React, { createContext, useState } from "react";
export const DialogDisplayContext = createContext();

function StateProvider({ children }) {
  console.log("state provider");
  const [dialogDisplay, setdialogDisplay] = useState("none");
  const [editButtonDisableStatus, seteditButtonDisableStatus] = useState(true);
  const [deleteButtonDisableStatus, setDeleteButtonStatus] = useState(true);
  const [predictButtonDisableStatus, setpredictButtonDisableStatus] =
    useState(true);

  const changeDialogDisplay = (newDisplay) => {
    setdialogDisplay(newDisplay);
  };

  const changeeditButtonDisableStatus = (newStatus) => {
    seteditButtonDisableStatus(newStatus);
  };
  const changeDeleteButtonStatus = (newStatus) => {
    setDeleteButtonStatus(newStatus);
  };
  const changepredictButtonDisableStatus = (newStatus) => {
    setpredictButtonDisableStatus(newStatus);
  };

  return (
    <DialogDisplayContext.Provider
      value={{
        dialogDisplay,
        changeDialogDisplay,
        editButtonDisableStatus,
        changeeditButtonDisableStatus,
        deleteButtonDisableStatus,
        changeDeleteButtonStatus,
        predictButtonDisableStatus,
        changepredictButtonDisableStatus,
      }}
    >
      {children}
    </DialogDisplayContext.Provider>
  );
}

export default React.memo(StateProvider);
