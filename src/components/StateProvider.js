import React, { createContext, useState } from "react";
export const DialogDisplayContext = createContext();

function StateProvider({ children }) {
  console.log("state provider");
  const [dialogDisplay, setdialogDisplay] = useState("none");
  const [editButtonDisableStatus, seteditButtonDisableStatus] = useState(true);
  const [deleteButtonDisableStatus, setDeleteButtonDisableStatus] =
    useState(true);
  const [predictButtonDisableStatus, setpredictButtonDisableStatus] =
    useState(true);

  const [countTotalData, setcountTotalData] = useState(0);
  const [dialogBoxPassingData, setdialogBoxPassingData] = useState([]);

  const changeCountTotalData = (newCount) => {
    setcountTotalData(newCount);
  };
  const changeDialogDisplay = (newDisplay) => {
    setdialogDisplay(newDisplay);
  };

  const changeeditButtonDisableStatus = (newStatus) => {
    seteditButtonDisableStatus(newStatus);
  };
  const changeDeleteButtonDisableStatus = (newStatus) => {
    setDeleteButtonDisableStatus(newStatus);
  };
  const changepredictButtonDisableStatus = (newStatus) => {
    setpredictButtonDisableStatus(newStatus);
  };

  const changeDialogBoxPassingData = (data) => {
    setdialogBoxPassingData(data);
  };
  return (
    <DialogDisplayContext.Provider
      value={{
        dialogDisplay,
        changeDialogDisplay,
        editButtonDisableStatus,
        changeeditButtonDisableStatus,
        deleteButtonDisableStatus,
        changeDeleteButtonDisableStatus,
        predictButtonDisableStatus,
        changepredictButtonDisableStatus,
        countTotalData,
        changeCountTotalData,
        dialogBoxPassingData,
        changeDialogBoxPassingData,
      }}
    >
      {children}
    </DialogDisplayContext.Provider>
  );
}

export default React.memo(StateProvider);
