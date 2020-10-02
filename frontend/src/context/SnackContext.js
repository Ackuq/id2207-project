import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const SnackContext = React.createContext();

export const SnackContextProvider = ({ children }) => {
  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const closeSnack = () => {
    setSnackState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <SnackContext.Provider value={setSnackState}>
      {children}
      <Snackbar
        autoHideDuration={3000}
        open={snackState.open}
        onClose={closeSnack}
      >
        <Alert onClose={closeSnack} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </SnackContext.Provider>
  );
};

export default SnackContext;
