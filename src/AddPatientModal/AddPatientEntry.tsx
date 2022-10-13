import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField } from "./FormField";
import { Entry, TypeOptions } from "../types";
import { DiagnosisSelection } from "./FormField";
import EntryType from "./Entrytype";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddPatientEntryForm = ({ onSubmit, onCancel }: Props) => {
    
    const [{ diagnoses }] = useStateValue();
    
  return (
  <>
    <Formik
      initialValues={{
        type: TypeOptions.Hospital || TypeOptions.OccupationalHealthcare || TypeOptions.HealthCheck,
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: []

      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <>
          <select>
              <option value={TypeOptions.Hospital}>Hospital</option>
              <option value={TypeOptions.HealthCheck}>HealthCheck</option>
              <option value={TypeOptions.OccupationalHealthcare}>Occupational Healthcare</option>
            </select>
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
        
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <EntryType entryType={values.type}/>
          
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
          </>
        );
      }}
    </Formik>
  </>
  );
}; 

export default AddPatientEntryForm;
