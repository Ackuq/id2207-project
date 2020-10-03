import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import api from "../config/api";
import SnackContext from "../context/SnackContext";
import AuthContext from "../context/AuthContext";
import roles from "../config/roles";

const formatDate = (date) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(3),
  },

  form: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    minWidth: 300,
  },

  formField: {
    marginBottom: "0.5rem",
  },
}));

const EventRequestForm = ({ eventRequest, classes, id }) => {
  const { user } = useContext(AuthContext);
  const setSnackState = useContext(SnackContext);

  const form = useFormik({
    initialValues: eventRequest,
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
        .oneOf(["cancelled", "pending", "approved"], "Must be a valid status")
        .required("Required"),
    }),

    onSubmit: (values) => {
      return api
        .updateEventRequest(id, values)
        .then(() => {
          setSnackState({
            open: true,
            message: "Event request updated",
            severity: "success",
          });
        })
        .catch((err) => {
          setSnackState({
            open: true,
            message: err.message,
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
          disabled={user.role !== roles.seniorCustomerService}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
        </Select>
        {form.touched.status && !!form.errors.status && (
          <FormHelperText>{form.errors.status}</FormHelperText>
        )}
      </FormControl>

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
    </form>
  );
};

const EventRequest = () => {
  const classes = useStyles();

  const match = useRouteMatch();
  const { id } = match.params;

  const [eventRequest, setEventRequest] = useState(null);
  const [reporter, setReporter] = useState(null);

  const getReporter = (userId) => {
    api.getUser(userId).then((res) => {
      setReporter(res.data);
    });
  };

  useEffect(() => {
    api.getEventRequest(id).then((res) => {
      // Format date to a valid format
      const data = { ...res.data, date: formatDate(res.data.date) };
      setEventRequest(data);
      getReporter(data.reporter);
    });
  }, [id]);

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Event Request #{id}</Typography>
      <Typography variant="h5">Reporter: {reporter?.name ?? ""}</Typography>
      {eventRequest ? (
        <EventRequestForm
          classes={classes}
          eventRequest={eventRequest}
          id={id}
        />
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export default EventRequest;
