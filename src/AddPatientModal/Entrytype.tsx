import React from "react";
import { Field } from "formik";
import { TextField, NumberField } from "./FormField";
import { TypeOptions } from "../types";
import { Typography } from "@material-ui/core";

interface Props {
  entryType: TypeOptions;
}

const EntryType: React.FC<Props> = ({ entryType }) => {
  switch (entryType) {
    case TypeOptions.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case TypeOptions.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />

          <Typography>Sick Leave</Typography>

          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );

    case TypeOptions.Hospital:
      return (
        <>
          <Typography>Discharge</Typography>

          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    default:
      return null;
  }
};

export default EntryType;