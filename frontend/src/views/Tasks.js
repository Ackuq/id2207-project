import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../config/api";
import { taskUrl } from "../config/routes";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(3),
  },

  row: {
    transition: "background-color 0.3s",
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.palette.grey[200] },
  },
}));

const Tasks = () => {
  const classes = useStyles();
  const history = useHistory();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.getTasks().then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h4">
          Tasks
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Project ID</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                className={classes.row}
                key={task.id}
                onClick={() => {
                  history.push(taskUrl(task.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {task.id}
                </TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell align="right">{task.status}</TableCell>
                <TableCell align="right">{task.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tasks;
