import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import api from "../config/api";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },
}));

const Task = () => {
  const classes = useStyles();

  const match = useRouteMatch();
  const { id } = match.params;

  const [task, setTask] = useState(null);

  useEffect(() => {
    api.getTask(id).then((res) => {
      setTask(res.data);
    });
  }, [id]);

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Task #{id}</Typography>
      <Typography variant="h5">
        For event project #{!!task ? task.project : ""}
      </Typography>
    </Paper>
  );
};

export default Task;
