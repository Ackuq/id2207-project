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
import { eventRequestUrl } from "../config/routes";

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

const EventRequests = () => {
  const classes = useStyles();
  const history = useHistory();

  const [eventRequests, setEventRequests] = useState([]);

  useEffect(() => {
    api.getEventRequests().then((res) => {
      setEventRequests(res.data);
    });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h4">
          Event Requests
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
            {eventRequests.map((eventRequest) => (
              <TableRow
                className={classes.row}
                key={eventRequest.id}
                onClick={() => {
                  history.push(eventRequestUrl(eventRequest.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {eventRequest.id}
                </TableCell>
                <TableCell align="right">{eventRequest.client}</TableCell>
                <TableCell align="right">{eventRequest.type}</TableCell>
                <TableCell align="right">{eventRequest.participants}</TableCell>
                <TableCell align="right">{eventRequest.budget}</TableCell>
                <TableCell align="right">{eventRequest.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EventRequests;
