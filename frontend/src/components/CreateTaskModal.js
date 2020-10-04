import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  InputLabel,
  MenuItem,
  TextField,
  FormHelperText,
  Button,
  FormControl,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

import api from "../config/api";

const CreateTaskModal = ({ open, close, onSubmit, classes }) => {
  const [subTeam, setSubTeam] = useState([]);

  useEffect(() => {
    if (open && subTeam.length === 0) {
      api.getSubTeam().then((res) => {
        setSubTeam(res.data);
      });
    }
  }, [open, subTeam.length]);

  const createTaskForm = useFormik({
    initialValues: {
      assignee: "",
      description: "",
      priority: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      assignee: yup.string().required("Required"),
      description: yup.string().required("Required"),
      priority: yup
        .string()
        .oneOf(["high", "medium", "low"], "Invalid priority")
        .required("Required"),
    }),
    onSubmit,
  });

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <form className={classes.createTaskForm}>
          <FormControl
            variant="filled"
            className={classes.formField}
            error={
              createTaskForm.touched.assignee &&
              !!createTaskForm.errors.assignee
            }
          >
            <InputLabel shrink id="assignee-label">
              Assignee
            </InputLabel>
            <Select
              labelId="assignee-label"
              id="assignee"
              name="assignee"
              onBlur={createTaskForm.handleBlur}
              onChange={createTaskForm.handleChange}
              value={createTaskForm.values.assignee}
            >
              {subTeam.map((teamMember) => (
                <MenuItem value={teamMember.id}>{teamMember.name}</MenuItem>
              ))}
            </Select>
            {createTaskForm.touched.assignee &&
              !!createTaskForm.errors.assignee && (
                <FormHelperText>
                  {createTaskForm.errors.assignee}
                </FormHelperText>
              )}
          </FormControl>
          <TextField
            multiline
            rows={3}
            variant="filled"
            className={classes.formField}
            size="medium"
            id="task-description"
            name="description"
            helperText={
              createTaskForm.touched.description &&
              createTaskForm.errors.description
            }
            error={
              createTaskForm.touched.description &&
              !!createTaskForm.errors.description
            }
            onChange={createTaskForm.handleChange}
            onBlur={createTaskForm.handleBlur}
            value={createTaskForm.values.description}
            label="Description"
          />
          <FormControl
            variant="filled"
            className={classes.formControl}
            error={
              createTaskForm.touched.priority &&
              !!createTaskForm.errors.priority
            }
          >
            <InputLabel shrink id="priority-label">
              Priority
            </InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              name="priority"
              onBlur={createTaskForm.handleBlur}
              onChange={createTaskForm.handleChange}
              value={createTaskForm.values.priority}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
            {createTaskForm.touched.priority &&
              !!createTaskForm.errors.priority && (
                <FormHelperText>
                  {createTaskForm.errors.priority}
                </FormHelperText>
              )}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={createTaskForm.submitForm}
          variant="contained"
          color="primary"
          disabled={!createTaskForm.isValid || createTaskForm.isSubmitting}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;
