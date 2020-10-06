import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import api from "../config/api";
import { eventProjectUrl } from "../config/routes";
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

const Task = () => {
  const classes = useStyles();
  const setSnackState = useContext(SnackContext);
  const match = useRouteMatch();
  const { id } = match.params;

  const [task, setTask] = useState(null);

  useEffect(() => {
    api
      .getTask(id)
      .then((res) => {
        setTask(res.data);
      })
      .catch((res) => {
        setSnackState({ open: true, message: res.error, severity: "error" });
      });
  }, [id, setSnackState]);

  const onSubmit = (values) =>
    api
      .updateTask(id, values)
      .then((res) => {
        setTask(res.data);
        setSnackState({
          open: true,
          message: "Updated task successfully",
          severity: "success",
        });
      })
      .catch((res) => {
        setSnackState({ open: true, message: res.error, severity: "error" });
      });

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Task #{id}</Typography>
      <Typography variant="h5">
        For{" "}
        {!!task && (
          <Link component={RouterLink} to={eventProjectUrl(task.project)}>
            event project #{!!task ? task.project : ""}
          </Link>
        )}
      </Typography>
      {!!task ? (
        <TaskForm classes={classes} initialValues={task} onSubmit={onSubmit} />
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default Task;
