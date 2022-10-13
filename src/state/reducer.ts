import { State } from "./state";
import { Patient } from "../types";
import { Diagnosis } from "../types";

export const setPatientList = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
  };
};

export const displayOnePatient = (content: Patient): Action => {
  return {
    type: "DISPLAY_ONE_PATIENT",
    payload: content
  };
};

export const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  };
};

export const addPatientEntry = (newPatientData: Patient): Action => {
  return {
    type: "ADD_PATIENT_ENTRY",
    
    payload: newPatientData
  };
};

export const setDiagnoses = (content: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: content
  };
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "DISPLAY_ONE_PATIENT";
      payload: Patient;
  } 
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  } 
  | {
    type: "ADD_PATIENT_ENTRY",
    payload: Patient
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
       case "ADD_PATIENT_ENTRY":
        return {
        ...state,
        patient: action.payload
      };
      case "DISPLAY_ONE_PATIENT":
        return {
          ...state,
          patient: action.payload
        };
      case "SET_DIAGNOSES":
        return {
          ...state,
          diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
        };
    default:
      return state;
  }
};
