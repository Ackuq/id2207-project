import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import FinancialRequestForm from "../components/FinancialRequestForm";
import api from "../config/api";
import SnackContext from "../context/SnackContext";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },

  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },

  formField: {
    marginBottom: "0.5rem",
  },

  actionButtons: {
    marginTop: "5rem",
    display: "flex",
    justifyContent: "space-around",
  },
}));

const FinancialRequest = () => {
  const classes = useStyles();
  const setSnackState = useContext(SnackContext);
  const match = useRouteMatch();
  const { id } = match.params;

  const [financialRequest, setFinancialRequest] = useState(null);

  useEffect(() => {
    api
      .getFinancialRequest(id)
      .then((res) => {
        setFinancialRequest(res.data);
      })
      .catch((res) => {
        setSnackState({ open: true, message: res.error, severity: "error" });
      });
  }, [id, setSnackState]);

  const onSubmit = (values) =>
    api
      .updateFinancialRequest(id, values)
      .then((res) => {
        setFinancialRequest(res.data);
        setSnackState({
          open: true,
          message: "Updated financial request successfully",
          severity: "success",
        });
      })
      .catch((res) => {
        setSnackState({ open: true, message: res.error, severity: "error" });
      });

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Financial Request #{id}</Typography>
      {financialRequest && (
        <Typography variant="h5">
          Status:{" "}
          {financialRequest.status.charAt(0).toUpperCase() +
            financialRequest.status.slice(1)}
        </Typography>
      )}
      {!!financialRequest ? (
        <FinancialRequestForm
          classes={classes}
          initialValues={financialRequest}
          onSubmit={onSubmit}
        />
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default FinancialRequest;
