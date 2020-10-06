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
import { financialRequestUrl } from "../config/routes";

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

const FinancialRequests = () => {
  const classes = useStyles();
  const history = useHistory();

  const [financialRequests, setFinancialRequests] = useState([]);

  useEffect(() => {
    api.getFinancialRequests().then((res) => {
      setFinancialRequests(res.data);
    });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h4">
          Financial Requests
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Project ID</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financialRequests.map((financialRequest) => (
              <TableRow
                className={classes.row}
                key={financialRequest.id}
                onClick={() => {
                  history.push(financialRequestUrl(financialRequest.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {financialRequest.id}
                </TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {financialRequest.department}
                </TableCell>
                <TableCell align="right">{financialRequest.amount}</TableCell>
                <TableCell align="right">{financialRequest.project}</TableCell>
                <TableCell
                  align="right"
                  style={{ textTransform: "capitalize" }}
                >
                  {financialRequest.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FinancialRequests;
