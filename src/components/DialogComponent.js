import { TextField } from "@mui/material";
import React, { useContext } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import ButtonComponent from "./ButtonComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DialogDisplayContext } from "./StateProvider";

function DialogComponent({ dialogName, dialogElement }) {
  console.log("dialogcomponent");
  // using DialogDisplayContext
  const { dialogDisplay, changeDialogDisplay } =
    useContext(DialogDisplayContext);

  // variable "actionType" for defining working of buttons
  let actionType = "";

  // variable "grid_col_value_class" for defining grid for particular actionType
  let grid_col_value_class = "";

  // Checking type of Dialog for by "dialogName" prop
  if (dialogName === "Add") {
    grid_col_value_class = "relative grid grid-cols-4";
    actionType = "ADD";
  } else if (dialogName === "Advance Search") {
    grid_col_value_class = "relative grid grid-cols-2";
    actionType = "SEARCH";
  } else if (dialogName === "Edit") {
    grid_col_value_class = "relative grid grid-cols-2";
    actionType = "EDIT";
  } else if (dialogName === "Delete Records ?") {
    grid_col_value_class = "relative grid grid-cols-2";
    actionType = "DELETE";
  }

  // Cancel Button Function
  const cancelFunction = () => {
    changeDialogDisplay("none");
  };

  const addFunction = () => {
    console.log("addfunction");
  };

  const editFunction = () => {
    console.log("editfunction");
  };

  const deleteFunction = () => {
    console.log("deletefunction");
  };
  const searchFunction = () => {
    console.log("searchfunction");
  };
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen items-center justify-center z-10"
      style={{ display: `${dialogDisplay}` }}
    >
      <div className="relative border h-auto w-auto m-10 p-5 flex flex-col rounded-md bg-grid">
        <div className="relative text-white m-5 text-2xl">{dialogName}</div>
        <div className={`${grid_col_value_class}`}>
          {actionType !== "DELETE"
            ? dialogElement.map((element, index) =>
                element.type === "text" ? (
                  <TextField
                    InputProps={{ disableUnderline: true }}
                    key={index}
                    label={element.field}
                    type={element.type}
                    variant="standard"
                    required
                    sx={{
                      backgroundColor: "white",
                      // width: "25rem",
                      margin: "1rem",
                      borderRadius: "0.2rem",
                      paddingLeft: "10px",
                    }}
                  />
                ) : (
                  <LocalizationProvider
                    key={index}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      label={element.field}
                      views={["year", "month", "day"]}
                      renderInput={(params) => (
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          required
                          {...params}
                          variant="standard"
                          sx={{
                            backgroundColor: "white",
                            // width: "25rem",
                            margin: "1rem",
                            borderRadius: "0.2rem",
                            paddingRight: "10px",
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )
              )
            : dialogElement.map((element, index) => (
                <b
                  key={index}
                  style={{
                    color: "white",
                    margin: "1rem",
                    borderRadius: "0.2rem",
                    paddingLeft: "10px",
                  }}
                >
                  {element.field}
                </b>
              ))}
        </div>
        <div className="relative m-5 flex flex-1">
          {actionType !== "DELETE" ? (
            <ButtonGroup
              fullWidth
              sx={{ position: "relative", display: "flex", flex: "1" }}
            >
              {actionType === "ADD" ? (
                <ButtonComponent
                  name={actionType}
                  workingFunction={addFunction}
                />
              ) : actionType === "EDIT" ? (
                <ButtonComponent
                  name={actionType}
                  workingFunction={editFunction}
                />
              ) : (
                actionType === "SEARCH" && (
                  <ButtonComponent
                    name={actionType}
                    workingFunction={searchFunction}
                  />
                )
              )}
              <ButtonComponent name="CANCEL" workingFunction={cancelFunction} />
            </ButtonGroup>
          ) : (
            <ButtonGroup
              fullWidth
              sx={{ position: "relative", display: "flex", flex: "1" }}
            >
              <ButtonComponent name="CANCEL" workingFunction={cancelFunction} />
              <ButtonComponent
                name={actionType}
                workingFunction={deleteFunction}
              />
            </ButtonGroup>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(DialogComponent);
