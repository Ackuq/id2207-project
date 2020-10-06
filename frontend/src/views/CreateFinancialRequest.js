import React, { useContext } from "react";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import api from "../config/api";
import * as routes from "../config/routes";
import SnackContext from "../context/SnackContext";
import FinancialRequestForm from "../components/FinancialRequestForm";

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
}));

const CreateFinancialRequest = () => {
  const classes = useStyles();

  const setSnackState = useContext(SnackContext);

  const history = useHistory();

  const onSubmit = (values) => {
    return api
      .createFinancialRequest(values)
      .then((res) => {
        history.push(routes.financialRequestUrl(res.data.id));
        setSnackState({
          open: true,
          message: "Financial request created",
          severity: "success",
        });
      })
      .catch(() => {
        setSnackState({
          open: true,
          message: "Could not create financial request",
          severity: "error",
        });
      });
  };

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Create Financial Request</Typography>
      <FinancialRequestForm classes={classes} onSubmit={onSubmit} />
    </Paper>
  );
};

export default CreateFinancialRequest;
