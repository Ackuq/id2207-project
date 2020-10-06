import React, { useContext } from "react";

import {
  InputLabel,
  MenuItem,
  TextField,
  FormHelperText,
  Button,
  FormControl,
  Select,
  CircularProgress,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";

import AuthContext from "../context/AuthContext";
import SnackContext from "../context/SnackContext";
import api from "../config/api";
import roles from "../config/roles";
import role from "../config/roles";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const EventProjectForm = ({ eventProject, classes, id }) => {
  const { user } = useContext(AuthContext);
  const setSnackState = useContext(SnackContext);

  const form = useFormik({
    initialValues: eventProject,
    initialTouched: {
      status: true,
    },
    validationSchema: yup.object({
      client: yup.string().required("Required"),
      participants: yup
        .number()
        .integer("Must be an integer")
        .positive("Must be positive")
        .required("Required"),
      date: yup.date().min(today, "Must be after today").required("Required"),
      description: yup.string().required("Required"),
      type: yup.string().required("Required"),
      budget: yup.number().positive("Must be positive").required("Required"),
      status: yup
        .string()
        .oneOf(["cancelled", "planning", "completed"], "Must be a valid status")
        .required("Required"),
    }),

    onSubmit: (values) => {
      return api
        .updateEventProject(id, values)
        .then(() => {
          setSnackState({
            open: true,
            message: "Event project updated",
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
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className={classes.form}>
      <TextField
        variant="filled"
        className={classes.formField}
        size="medium"
        id="client"
        name="client"
        helperText={form.touched.client && form.errors.client}
        error={form.touched.client && !!form.errors.client}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.client}
        label="Client"
        disabled={
          eventProject.archived || user.role !== role.administrationManager
        }
      />

      <TextField
        variant="filled"
        id="description"
        name="description"
        multiline
        rows={3}
        className={classes.formField}
        helperText={form.touched.description && form.errors.description}
        error={form.touched.description && !!form.errors.description}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.description}
        label="Description"
        disabled={
          eventProject.archived || user.role !== role.administrationManager
        }
      />

      <TextField
        variant="filled"
        id="type"
        name="type"
        className={classes.formField}
        helperText={form.touched.type && form.errors.type}
        error={form.touched.type && !!form.errors.type}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.type}
        label="Type"
        disabled={
          eventProject.archived || user.role !== role.administrationManager
        }
      />

      <TextField
        variant="filled"
        id="date"
        type="date"
        className={classes.formField}
        helperText={form.touched.date && form.errors.date}
        error={form.touched.date && !!form.errors.date}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.date}
        label="Date"
        InputLabelProps={{
          shrink: true,
        }}
        disabled={
          eventProject.archived || user.role !== role.administrationManager
        }
      />

      <TextField
        variant="filled"
        id="participants"
        name="participants"
        type="number"
        className={classes.formField}
        helperText={form.touched.participants && form.errors.participants}
        error={form.touched.participants && !!form.errors.participants}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.participants}
        label="Participants"
        disabled={
          eventProject.archived || user.role !== role.administrationManager
        }
      />

      <TextField
        variant="filled"
        id="budget"
        name="budget"
        type="number"
        className={classes.formField}
        helperText={form.touched.budget && form.errors.budget}
        error={form.touched.budget && !!form.errors.budget}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.budget}
        label="Budget"
        disabled={
          (user.role !== role.administrationManager &&
            user.role !== role.financialManager) ||
          eventProject.archived
        }
      />

      <FormControl
        variant="filled"
        className={classes.formControl}
        error={form.touched.status && !!form.errors.status}
      >
        <InputLabel shrink id="status-label">
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          onBlur={form.handleBlur}
          onChange={form.handleChange}
          value={form.values.status}
          disabled={
            user.role !== roles.administrationManager || !eventProject.archived
          }
        >
          <MenuItem value="planning">Planning</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
        {form.touched.status && !!form.errors.status && (
          <FormHelperText>{form.errors.status}</FormHelperText>
        )}
      </FormControl>
      {!eventProject.archived && (
        <Button
          disableRipple
          color="primary"
          style={{ marginTop: "1rem" }}
          variant="contained"
          type="submit"
          disabled={!form.isValid || form.isSubmitting}
        >
          {form.isSubmitting ? <CircularProgress size={25} /> : "Update"}
        </Button>
      )}
    </form>
  );
};

export default EventProjectForm;
