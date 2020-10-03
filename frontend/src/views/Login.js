import React, { useContext } from "react";

import {
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "../config/api";
import AuthContext from "../context/AuthContext";
import SnackContext from "../context/SnackContext";

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
  const setSnackState = useContext(SnackContext);

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
        .then(handleLogin)
        .catch((res) => {
          setSnackState({ open: true, message: res.error, severity: "error" });
        });
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
            label="E-mail address"
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
            label="Password"
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            disabled={!form.isValid || form.isSubmitting}
          >
            {form.isSubmitting ? <CircularProgress size={25} /> : "Login"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
