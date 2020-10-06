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
import { recruitmentRequestUrl } from "../config/routes";

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

const RecruitmentRequests = () => {
  const classes = useStyles();
  const history = useHistory();

  const [recruitmentRequests, setRecruitmentRequests] = useState([]);

  useEffect(() => {
    api.getRecruitmentRequests().then((res) => {
      setRecruitmentRequests(res.data);
    });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography className={classes.title} variant="h4">
          Recruitment Requests
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Experience</TableCell>
              <TableCell align="right">Part time</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruitmentRequests.map((recruitmentRequest) => (
              <TableRow
                className={classes.row}
                key={recruitmentRequest.id}
                onClick={() => {
                  history.push(recruitmentRequestUrl(recruitmentRequest.id));
                }}
              >
                <TableCell component="th" scope="row">
                  {recruitmentRequest.id}
                </TableCell>
                <TableCell>{recruitmentRequest.position}</TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {recruitmentRequest.department}
                </TableCell>
                <TableCell align="right">
                  {recruitmentRequest.experience}
                </TableCell>
                <TableCell align="right">
                  {recruitmentRequest.partTime ? "✅" : "❌"}
                </TableCell>
                <TableCell
                  align="right"
                  style={{ textTransform: "capitalize" }}
                >
                  {recruitmentRequest.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecruitmentRequests;
