import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { Entry } from "../types";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { displayOnePatient } from "../state";
import { Box, Typography } from "@material-ui/core";
import { MedicalInformation } from "@mui/icons-material";
import { HealthAndSafety } from "@mui/icons-material";
import { Favorite } from "@material-ui/icons";
import { LocalHospital } from "@mui/icons-material";
import assertNever from "assert-never";



const PatientSingleView = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if(!id){
          console.error("there was a mistake");
        } else {
          const { data: displayPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(displayOnePatient(displayPatient));
        }
        
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const Hospital: React.FC<{entry: Entry}> = ({entry}) => {
   return <Box m={1} sx={{border: "1px solid black", borderRadius: "5px", padding: "10px", maxWidth:"60%"}}>
   
      <Typography>
        <LocalHospital />{" "}
        {entry.date}{" "}<br/> {entry.description}
      </Typography>
      <Typography>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </Typography>
       <Typography>
        {entry.specialist}
      </Typography>
      <Favorite color="primary"/>
    </Box>;
  };

  const OccupationalHealthcare: React.FC<{entry: Entry}> = ({entry}) => {
    return <Box m={1} sx={{border: "1px solid black", borderRadius: "5px", padding: "10px", maxWidth:"60%"}}>
       
      <Typography>
        <HealthAndSafety />{" "}
        {entry.date}{" "} <br/>{entry.description}
      </Typography>
      <Typography>
        {entry.specialist}
      </Typography>
      <Typography>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </Typography>
      <Favorite color="secondary"/>
    </Box>;
  };

 const HealthCheck: React.FC<{entry: Entry}> = ({entry}) => {
    return <Box m={1} sx={{border: "1px solid black", borderRadius: "5px", padding: "10px", maxWidth:"60%"}}>
      
      <Typography>
        <MedicalInformation />{" "}
        {entry.date}{" "}<br/>{entry.description}
      </Typography>
      
      <Typography>
        {entry.specialist}
      </Typography>
      <Typography>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code} {diagnoses[code].name}</li>)}
      </Typography>
      <Favorite color="disabled" />
    </Box>;
  };

  const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry}/>;
      case "HealthCheck":
        return <HealthCheck entry={entry}/>;
      default:
        return assertNever(entry);
    }
  };

    return (
        <>
        {
          Array.isArray(patient) &&
          patient.map((p:Patient) =>(
            <div key={p.id}>
              <h2>{p.name}</h2>
              <p>occupation: {p.occupation}</p>
              <p>ssn: {p.ssn}</p>
              <p>gender: {p.gender}</p>
              {" "}
              <h3>Entries</h3>
              {Object.values(p.entries).map((entry: Entry) => <EntryDetails key={entry.id} entry={entry}/>)}
            </div>
          ))
        }
        
        </>
    );
};

export default PatientSingleView;
