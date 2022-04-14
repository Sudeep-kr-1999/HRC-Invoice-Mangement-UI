import React, { createContext, useState } from "react";
export const DialogDisplayContext = createContext();

function StateProvider({ children }) {
  const [dialogDisplay, setdialogDisplay] = useState("none");
  const [isRefreshed, setisRefreshed] = useState(0);
  const [editDialogrow, seteditDialogrow] = useState([]);
  const [editButtonDisableStatus, seteditButtonDisableStatus] = useState(true);
  const [deleteButtonDisableStatus, setDeleteButtonDisableStatus] =
    useState(true);
  const [predictButtonDisableStatus, setpredictButtonDisableStatus] =
    useState(true);
  const [countTotalData, setcountTotalData] = useState(0);
  const [dialogBoxPassingData, setdialogBoxPassingData] = useState([]);
  const [searchData, setsearchData] = useState(null);
  const [pageNumber, setpageNumber] = useState(1);
  const [searchCustomerExpression, setsearchCustomerExpression] = useState({
    customer_number: "",
  });
  const [editStatus, seteditStatus] = useState(0);
  const [additionStatus, setadditionStatus] = useState(0);
  const [deletionStatus, setdeletionStatus] = useState(0);
  const [predictRow, setpredictRow] = useState([]);

  
  const changePredictRow = (newpredictrow) => {
    setpredictRow(newpredictrow);
  };
  const changeEditStatus = (newStatus) => {
    seteditStatus(newStatus);
  };
  const changeAdditionStatus = (newStatus) => {
    setadditionStatus(newStatus);
  };
  const changeDeletionStatus = (newStatus) => {
    setdeletionStatus(newStatus);
  };
  const changeisRefreshed = (newRefreshStatus) => {
    setisRefreshed(newRefreshStatus);
  };
  const changeEditDialogRow = (newrow) => {
    seteditDialogrow(newrow);
  };
  const changePageNumber = (newpageNumber) => {
    setpageNumber(newpageNumber);
  };
  const changeCustomerExpression = (newExpression) => {
    setsearchCustomerExpression({ customer_number: newExpression });
  };
  const changeSearchData = (newData) => {
    setsearchData(newData);
  };
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
        searchData,
        changeSearchData,
        searchCustomerExpression,
        changeCustomerExpression,
        pageNumber,
        changePageNumber,
        editDialogrow,
        changeEditDialogRow,
        isRefreshed,
        changeisRefreshed,
        editStatus,
        changeEditStatus,
        additionStatus,
        changeAdditionStatus,
        deletionStatus,
        changeDeletionStatus,
        predictRow,
        changePredictRow,
      }}
    >
      {children}
    </DialogDisplayContext.Provider>
  );
}

export default React.memo(StateProvider);
