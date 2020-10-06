import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import AuthContext from "../context/AuthContext";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import api from "../config/api";

const TaskForm = ({ initialValues, onSubmit, classes }) => {
  const { user } = useContext(AuthContext);

  const [subTeam, setSubTeam] = useState([]);

  const taskForm = useFormik({
    initialValues,
    validationSchema: yup.object({
      budgetConflict: yup.bool(),
      description: yup.string().required("Required"),
      plan: yup.string().when("status", {
        is: "accepted",
        then:
          user.role === initialValues.assignee
            ? yup.string().required("Required")
            : yup.string(),
        otherwise: yup.string(),
      }),
      priority: yup.string().oneOf(["high", "medium", "low"]),
      status: yup
        .string()
        .oneOf(["pending", "completed", "accepted", "rejected"]),
    }),
    validateOnMount: true,
    onSubmit,
  });

  useEffect(() => {
    api.getSubTeam().then((res) => {
      setSubTeam(res.data);
    });
  }, []);

  const actionButtonClick = (status) => () => {
    taskForm.setFieldValue("status", status, true);
    onSubmit({ status });
  };

  return (
    <form onSubmit={taskForm.handleSubmit} className={classes.form}>
      <FormControl
        variant="filled"
        className={classes.formField}
        error={taskForm.touched.assignee && !!taskForm.errors.assignee}
      >
        {subTeam.length && (
          <>
            <InputLabel shrink id="assignee-label">
              Assignee
            </InputLabel>
            <Select
              labelId="assignee-label"
              id="assignee"
              name="assignee"
              onBlur={taskForm.handleBlur}
              onChange={taskForm.handleChange}
              value={taskForm.values.assignee}
            >
              {subTeam.map((teamMember) => (
                <MenuItem key={teamMember.id} value={teamMember.id}>
                  {teamMember.name}
                </MenuItem>
              ))}
            </Select>
            {taskForm.touched.assignee && !!taskForm.errors.assignee && (
              <FormHelperText>{taskForm.errors.assignee}</FormHelperText>
            )}
          </>
        )}
      </FormControl>
      <TextField
        variant="filled"
        className={classes.formField}
        size="medium"
        id="description"
        name="description"
        multiline
        rows={3}
        helperText={taskForm.touched.description && taskForm.errors.description}
        error={taskForm.touched.description && !!taskForm.errors.description}
        onChange={taskForm.handleChange}
        onBlur={taskForm.handleBlur}
        value={taskForm.values.description}
        label="Description"
        disabled={user.id !== taskForm.values.reporter}
      />
      <FormControl
        variant="filled"
        className={classes.formField}
        error={taskForm.touched.priority && !!taskForm.errors.priority}
      >
        <InputLabel shrink id="priority-label">
          Priority
        </InputLabel>
        <Select
          labelId="priority-label"
          id="priority"
          name="priority"
          onBlur={taskForm.handleBlur}
          onChange={taskForm.handleChange}
          value={taskForm.values.priority}
          disabled={user.id !== taskForm.values.reporter}
        >
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="filled"
        className={classes.formField}
        error={taskForm.touched.status && !!taskForm.errors.status}
      >
        <InputLabel shrink id="status-label">
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          onBlur={taskForm.handleBlur}
          onChange={taskForm.handleChange}
          value={taskForm.values.status}
          disabled={user.id !== taskForm.values.reporter}
        >
          <MenuItem
            value="pending"
            disabled={
              taskForm.values.status === "accepted" ||
              taskForm.values.status === "completed"
            }
          >
            Pending
          </MenuItem>
          <MenuItem value="accepted" disabled>
            Accepted
          </MenuItem>
          <MenuItem value="rejected" disabled>
            Rejected
          </MenuItem>
          <MenuItem
            value="completed"
            disabled={taskForm.values.status === "pending"}
          >
            Completed
          </MenuItem>
        </Select>
        {taskForm.touched.status && !!taskForm.errors.status && (
          <FormHelperText>{taskForm.errors.status}</FormHelperText>
        )}
      </FormControl>
      {taskForm.values.status !== "pending" &&
        taskForm.values.status !== "rejected" && (
          <>
            <TextField
              variant="filled"
              className={classes.formField}
              size="medium"
              id="plan"
              name="plan"
              multiline
              rows={3}
              helperText={taskForm.touched.plan && taskForm.errors.plan}
              error={taskForm.touched.plan && !!taskForm.errors.plan}
              onChange={taskForm.handleChange}
              onBlur={taskForm.handleBlur}
              value={taskForm.values.plan}
              label="Plan"
              disabled={user.id !== taskForm.values.assignee}
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled={user.id !== taskForm.values.assignee}
                  color="primary"
                  id="budgetConflict"
                  name="budgetConflict"
                  onChange={taskForm.handleChange}
                  onBlur={taskForm.handleBlur}
                  checked={taskForm.values.budgetConflict}
                />
              }
              label="Budget conflict"
            />
          </>
        )}
      {user.id === taskForm.values.assignee &&
        taskForm.values.status === "pending" && (
          <div className={classes.actionButtons}>
            <Button
              variant="contained"
              style={{ width: "25%" }}
              onClick={actionButtonClick("rejected")}
            >
              Reject
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "25%" }}
              onClick={actionButtonClick("accepted")}
            >
              Accept
            </Button>
          </div>
        )}
      {(user.id === taskForm.values.reporter ||
        (user.id === taskForm.values.assignee &&
          taskForm.values.status === "accepted")) && (
        <Button
          disableRipple
          color="primary"
          style={{ marginTop: "1rem" }}
          variant="contained"
          type="submit"
          disabled={!taskForm.isValid || taskForm.isSubmitting}
        >
          {taskForm.isSubmitting ? (
            <CircularProgress size={25} />
          ) : (
            "Update Task"
          )}
        </Button>
      )}
    </form>
  );
};

export default TaskForm;
