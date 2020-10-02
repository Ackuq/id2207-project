import React, { useContext, useState } from "react";

import {
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../config/api";
import AuthContext from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    textAlign: "center",
    padding: "2rem 3rem",
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

const Login = () => {
  const classes = useStyles();

  const { handleLogin } = useContext(AuthContext);

  const [errorSnack, setErrorSnack] = useState({ open: false, message: "" });

  const closeErrorSnack = () => {
    setErrorSnack((prevState) => ({ ...prevState, open: false }));
  };

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("Required"),
      password: yup
        .string()
        .min(8, "At least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      return api
        .login(values.email, values.password)
        .catch((res) => {
          setErrorSnack({ open: true, message: res.error });
        })
        .then(handleLogin);
    },
  });

  return (
    <div className={classes.container}>
      <Paper className={classes.card}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={form.handleSubmit} className={classes.form}>
          <TextField
            variant="filled"
            className={classes.formField}
            size="medium"
            type="email"
            id="email"
            name="email"
            helperText={form.errors.email}
            error={!!form.errors.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.email}
            placeholder="E-mail address"
          />

          <TextField
            variant="filled"
            className={classes.formField}
            type="password"
            id="password"
            name="password"
            helperText={form.errors.password}
            error={!!form.errors.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.password}
            placeholder="Password"
          />

          <Button
            variant="contained"
            type="submit"
            disabled={!form.isValid || form.isSubmitting}
          >
            {form.isSubmitting ? <CircularProgress size={25} /> : "Login"}
          </Button>
        </form>
      </Paper>
      <Snackbar
        autoHideDuration={6000}
        open={errorSnack.open}
        onClose={closeErrorSnack}
      >
        <Alert onClose={closeErrorSnack} severity="error">
          {errorSnack.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
