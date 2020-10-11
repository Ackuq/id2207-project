import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import AuthContext from "../context/AuthContext";
import roles from "../config/roles";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const EventRequestForm = ({ eventRequest, classes, onSubmit }) => {
  const { user } = useContext(AuthContext);

  const form = useFormik({
    initialValues: eventRequest,
    initialTouched: {
      status: true,
    },
    validateOnMount: true,
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
        .oneOf(
          ["cancelled", "feasible", "pending", "approved"],
          "Must be a valid status"
        )
        .required("Required"),
      budgetApproved: yup.boolean(),
    }),

    onSubmit,
  });

  const disabled =
    eventRequest.archived ||
    (form.values.status === "pending" && eventRequest.reporter !== user.id);

  const actionButtonClick = (status) => () => {
    form.setFieldValue("status", status, true);
    onSubmit({ status });
  };

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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
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
        disabled={disabled}
      />
      {user.role === roles.seniorCustomerService &&
        form.values.status === "pending" && (
          <div className={classes.actionButtons}>
            <Button
              variant="contained"
              style={{ width: "25%" }}
              onClick={actionButtonClick("cancelled")}
            >
              Reject
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "25%" }}
              onClick={actionButtonClick("feasible")}
            >
              Accept
            </Button>
          </div>
        )}
      {form.values.status !== "pending" && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                disabled={
                  user.role !== roles.financialManager || eventRequest.archived
                }
                color="primary"
                id="budgetApproved"
                name="budgetApproved"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                checked={form.values.budgetApproved}
              />
            }
            label="Approve budget"
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
                user.role !== roles.administrationManager ||
                eventRequest.archived
              }
            >
              <MenuItem disabled value="pending">
                Pending
              </MenuItem>
              <MenuItem value="feasible">Feasible</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
            </Select>
            {form.touched.status && !!form.errors.status && (
              <FormHelperText>{form.errors.status}</FormHelperText>
            )}
          </FormControl>
        </>
      )}
      {!eventRequest.archived &&
        (form.values.status !== "pending" ||
          user.id === eventRequest.reporter) && (
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

export default EventRequestForm;
