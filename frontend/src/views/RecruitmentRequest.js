import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import RecruitmentRequestForm from "../components/RecruitmentRequestForm";
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

const RecruitmentRequest = () => {
  const classes = useStyles();
  const setSnackState = useContext(SnackContext);
  const match = useRouteMatch();
  const { id } = match.params;

  const [recruitmentRequest, setRecruitmentRequest] = useState(null);

  useEffect(() => {
    api
      .getRecruitmentRequest(id)
      .then((res) => {
        setRecruitmentRequest(res.data);
      })
      .catch((res) => {
        setSnackState({ open: true, message: res.error, severity: "error" });
      });
  }, [id, setSnackState]);

  const onSubmit = (values) =>
    api
      .updateRecruitmentRequest(id, values)
      .then((res) => {
        setRecruitmentRequest(res.data);
        setSnackState({
          open: true,
          message: "Updated recruitment request successfully",
          severity: "success",
        });
      })
      .catch((res) => {
        setSnackState({ open: true, message: res.error, severity: "error" });
      });

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Recruitment Request #{id}</Typography>
      {recruitmentRequest && (
        <Typography variant="h5">
          Status:{" "}
          {recruitmentRequest.status.charAt(0).toUpperCase() +
            recruitmentRequest.status.slice(1)}
        </Typography>
      )}
      {!!recruitmentRequest ? (
        <RecruitmentRequestForm
          classes={classes}
          initialValues={recruitmentRequest}
          onSubmit={onSubmit}
        />
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default RecruitmentRequest;
