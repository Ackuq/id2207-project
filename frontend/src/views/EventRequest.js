import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import api from "../config/api";
import EventRequestForm from "../components/EventRequestForm";
import SnackContext from "../context/SnackContext";

const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

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

const EventRequest = () => {
  const classes = useStyles();
  const setSnackState = useContext(SnackContext);

  const match = useRouteMatch();
  const { id } = match.params;

  const [eventRequest, setEventRequest] = useState(null);
  const [reporter, setReporter] = useState(null);

  const getReporter = (userId) => {
    api.getUser(userId).then((res) => {
      setReporter(res.data);
    });
  };

  useEffect(() => {
    api.getEventRequest(id).then((res) => {
      // Format date to a valid format
      const data = { ...res.data, date: formatDate(res.data.date) };
      setEventRequest(data);
      getReporter(data.reporter);
    });
  }, [id]);

  const onSubmit = (values) => {
    return api
      .updateEventRequest(id, values)
      .then(() => {
        setSnackState({
          open: true,
          message: "Event request updated",
          severity: "success",
        });
      })
      .catch((err) => {
        setSnackState({
          open: true,
          message: err.error,
          severity: "error",
        });
      });
  };

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">
        Event Request #{id} {eventRequest?.archived ? "[ARCHIVED]" : ""}
      </Typography>
      <Typography variant="h5">Reporter: {reporter?.name ?? ""}</Typography>
      {eventRequest ? (
        <EventRequestForm
          classes={classes}
          eventRequest={eventRequest}
          onSubmit={onSubmit}
        />
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default EventRequest;
