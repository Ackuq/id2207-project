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
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthContext from "../context/AuthContext";
import role from "../config/roles";

const RecruitmentRequestForm = ({ onSubmit, classes, initialValues }) => {
  const { user } = useContext(AuthContext);

  const form = useFormik({
    initialValues: initialValues ?? {
      description: "",
      partTime: false,
      position: "",
      experience: 0,
      department: "",
    },
    validateOnMount: true,
    validationSchema: yup.object({
      description: yup.string().required("Required"),
      partTime: yup.boolean(),
      position: yup.string().required("Required"),
      experience: yup
        .number()
        .min(0, "Must not be negative")
        .required("Required"),
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
    user.role === role.HR ||
    (form.values.status && form.values.status !== "pending");

  return (
    <form onSubmit={form.handleSubmit} className={classes.form}>
      <TextField
        variant="filled"
        className={classes.formField}
        size="medium"
        id="position"
        name="position"
        helperText={form.touched.position && form.errors.position}
        error={form.touched.position && !!form.errors.position}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.position}
        label="Position"
        disabled={fieldsDisabled}
      />

      <TextField
        variant="filled"
        id="experience"
        name="experience"
        type="number"
        className={classes.formField}
        helperText={form.touched.experience && form.errors.experience}
        error={form.touched.experience && !!form.errors.experience}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.experience}
        label="Experience"
        disabled={fieldsDisabled}
      />

      <FormControl
        variant="filled"
        className={classes.formControl}
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

      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            id="partTime"
            name="partTime"
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            checked={form.values.partTime}
            disabled={fieldsDisabled}
          />
        }
        label="Part time"
      />

      <TextField
        variant="filled"
        className={classes.formField}
        size="medium"
        id="description"
        name="description"
        multiline
        rows={3}
        helperText={form.touched.description && form.errors.description}
        error={form.touched.description && !!form.errors.description}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values.description}
        label="Description"
        disabled={fieldsDisabled}
      />

      {user.role !== role.HR &&
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
      {user.role === role.HR && form.values.status === "pending" && (
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

export default RecruitmentRequestForm;
