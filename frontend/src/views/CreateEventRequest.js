import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import api from "../config/api";
import * as routes from "../config/routes";
import SnackContext from "../context/SnackContext";

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

const CreateEventRequest = () => {
  const classes = useStyles();

  const setSnackState = useContext(SnackContext);

  const history = useHistory();

  const form = useFormik({
    initialValues: {
      client: "",
      participants: 0,
      date: formatDate(tomorrow),
      description: "",
      type: "",
      budget: 0,
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
    }),

    onSubmit: (values) => {
      return api
        .createEventRequest(values)
        .then((res) => {
          history.push(routes.eventRequestUrl(res.data.id));
          setSnackState({
            open: true,
            message: "Event request created",
            severity: "success",
          });
        })
        .catch(() => {
          setSnackState({
            open: true,
            message: "Could not create event request",
            severity: "error",
          });
        });
    },
  });

  return (
    <Paper className={classes.card}>
      <Typography variant="h4">Create Event Request</Typography>
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

        <Button
          variant="contained"
          type="submit"
          disabled={!form.isValid || form.isSubmitting}
        >
          {form.isSubmitting ? <CircularProgress size={25} /> : "Submit"}
        </Button>
      </form>
    </Paper>
  );
};

export default CreateEventRequest;
