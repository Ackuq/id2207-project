import React, { useContext, useEffect, useState } from "react";

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
import role from "../config/roles";
import api from "../config/api";

const FinancialRequestForm = ({ onSubmit, classes, initialValues }) => {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.getEventProjects().then((res) => {
      setProjects(res.data);
    });
  }, []);

  const form = useFormik({
    initialValues: initialValues ?? {
      reason: "",
      amount: 0,
      project: "",
      department: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      reason: yup.string().required("Required"),
      project: yup.string().required("Required"),
      amount: yup.number().positive("Must be positive").required("Required"),
      department: yup
        .string()
        .oneOf(
          ["administration", "service", "production", "financial"],
          "Must be a valid department"
        )
        .required("Required"),
    }),
    onSubmit,
  });

  const actionButtonClick = (status) => () => {
    form.setFieldValue("status", status, true);
    onSubmit({ status });
  };

  const fieldsDisabled =
    user.role === role.financialManager ||
    (form.values.status && form.values.status !== "pending");

  return (
    <form onSubmit={form.handleSubmit} className={classes.form}>
      <TextField
        variant="filled"
        className={classes.formField}
        size="medium"
        id="reason"
        name="reason"
        multiline
        rows={3}
        helperText={form.touched.reason && form.errors.reason}
        error={form.touched.reason && !!form.errors.reason}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.reason}
        label="Reason"
        disabled={fieldsDisabled}
      />

      <TextField
        variant="filled"
        id="amount"
        name="amount"
        type="number"
        className={classes.formField}
        helperText={form.touched.amount && form.errors.amount}
        error={form.touched.amount && !!form.errors.amount}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.amount}
        label="Amount"
        disabled={fieldsDisabled}
      />

      <FormControl
        variant="filled"
        className={classes.formField}
        error={form.touched.department && !!form.errors.department}
      >
        <InputLabel shrink id="department-label">
          Department
        </InputLabel>
        <Select
          labelId="department-label"
          id="department"
          name="department"
          onBlur={form.handleBlur}
          onChange={form.handleChange}
          value={form.values.department}
          displayEmpty
          disabled={fieldsDisabled}
        >
          <MenuItem value="administration">Administration</MenuItem>
          <MenuItem value="service">Service</MenuItem>
          <MenuItem value="financial">Financial</MenuItem>
          <MenuItem value="production">Production</MenuItem>
        </Select>
        {form.touched.department && !!form.errors.department && (
          <FormHelperText>{form.errors.department}</FormHelperText>
        )}
      </FormControl>

      <FormControl
        variant="filled"
        className={classes.formField}
        error={form.touched.project && !!form.errors.project}
      >
        <InputLabel shrink id="project-label">
          Project
        </InputLabel>
        {projects.length && (
          <Select
            labelId="project-label"
            id="project"
            name="project"
            onBlur={form.handleBlur}
            onChange={form.handleChange}
            value={form.values.project}
            displayEmpty
            disabled={fieldsDisabled}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.id} - {project.client}
              </MenuItem>
            ))}
          </Select>
        )}
        {form.touched.project && !!form.errors.project && (
          <FormHelperText>{form.errors.project}</FormHelperText>
        )}
      </FormControl>

      {user.role !== role.financialManager &&
        (form.values.status === undefined ||
          form.values.status === "pending") && (
          <Button
            disableRipple
            color="primary"
            style={{ marginTop: "1rem" }}
            variant="contained"
            type="submit"
            disabled={!form.isValid || form.isSubmitting}
          >
            {form.isSubmitting ? (
              <CircularProgress size={25} />
            ) : initialValues ? (
              "Update"
            ) : (
              "Submit"
            )}
          </Button>
        )}
      {user.role === role.financialManager && form.values.status === "pending" && (
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
    </form>
  );
};

export default FinancialRequestForm;
