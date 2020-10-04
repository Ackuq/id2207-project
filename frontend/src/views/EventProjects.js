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
import { eventProjectUrl } from "../config/routes";

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

const EventProjects = () => {
  const classes = useStyles();
  const history = useHistory();

  const [eventProjects, setEventProjects] = useState([]);

  useEffect(() => {
    api.getEventProjects().then((res) => {
      setEventProjects(res.data);
    });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h4">
          Event Projects
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Client</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Participants</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventProjects.map((eventProject) => (
              <TableRow
                className={classes.row}
                key={eventProject.id}
                onClick={() => {
                  history.push(eventProjectUrl(eventProject.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {eventProject.id}
                </TableCell>
                <TableCell align="right">{eventProject.client}</TableCell>
                <TableCell align="right">{eventProject.type}</TableCell>
                <TableCell align="right">{eventProject.participants}</TableCell>
                <TableCell align="right">{eventProject.budget}</TableCell>
                <TableCell align="right">{eventProject.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EventProjects;
