/**
 * This file contains the defition and logic for the creating a query form component.
 * This includes the submit button as well since this is treated as a form.
 * The component interacts with the backend using pre-defined routes imported from the backend-services module.
 * @author Christopher Curtis
 */
import { FieldValues, useForm } from "react-hook-form";
import { useEffect } from "react";
import Papa from "papaparse";
import { z } from "zod";
import { useState } from "react";
import {
  // Backend model route options
  createResponseService, // Default
  createLikeService,
  createExpertResponseService
} from "../services/backend-service";
import ExpandableText from "./ExpandableText";

// This defines the schema for the form used, expand here for form input validation
const schema = z.object({
  interest: z.string(),
  neighborhood: z.string(),
  values: z.string(),
  lingo: z.string(),
});
type FormData = z.infer<typeof schema>;

/**
 * Formats the string in a parsable way for the GPT model on the backend
 * @param interest the subject to ask the GPT model about
 * @param neighborhood the neighborhood to tailor the response to
 * @param values additional info the for the model to be aware of
 * @param lingo how much lingo to use in the response
 * @return formated string to be sent as query to model
 */
const formatString = (
  interest: string,
  neighborhood: string,
  values: string,
  lingo: string
) => {
  return (
    "Propose a solution to repurpose the excess parking to increase the amount of: [" +
    interest +
    "], in the following neighborhood: [" +
    neighborhood +
    "]" +
    ", with the user having these values : [" +
    values +
    "]" + 
    ", taking into account the user's familiarity of urban planning lingo: [" +
    lingo +
    "]."
  );
};

/**
 * Creates a query box, interacting with a gpt backend service.
 * Created using a React Hook Form, with fields as defined in the above schema.
 * @returns a QueryBox component
 */
const ParkingQueryForm = () => {
  // These variables are used for interacting with the form's state
  const {
    register, // Tracks the form fields
    handleSubmit, // Calls the on-submit logic
    formState: { errors, isValid }, // Tracks errors and wether or not the form is valid
  } = useForm<FormData>();

  // These variables trach the state of the component
  const [isLoading, setIsLoading] = useState(false); // Wether to show loading animation or not
  const [error, setError] = useState(""); // The error message (if any)
//   const [query, setQuery] = useState(""); // The most recent user query
  const [queryResponse, setQueryResponse] = useState(""); // The most recent query response
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    fetch("/data/nhood_summary.csv")
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setCsvData(results.data);
          },
        });
      });
  }, []);
//   // Handles the like functionality TODO: Implement this
//   const onLike = () => {
//     // We construct post request to include the interaction history
//     const { request, cancel } = createLikeService().post([
//       { role: "user", content: query },
//       { role: "assistant", content: queryResponse },
//     ]);
//     // Request is sent
//     request
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         setError(err.message);
//         return false;
//       });

//     return true;
//   };
  // Handles the on-sumbit logic for the form
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setIsLoading(true); // Triggers the loading animation

    // Creates post request for backend gpt model
    const { request, cancel } = createExpertResponseService().postMessages([
      {
        role: "user",
        content: formatString(data.interest, data.neighborhood, data.values, data.lingo),
      },
    ]);

    // Request is sent
    request
      .then((res) => {
        // Succesful request logic
        setQueryResponse(res.data); // We update the most recent query response
        console.log(res.data);
        setIsLoading(false); // We stop the loading animation
      })
      .catch((err) => {
        // Error handling logic
        setError(err.message); // We display the error message
        setIsLoading(false); // We stop the loading animation
      });
  };

  // We return the react markup needed for the component
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-danger">{error}</p>}
        <h2>Request from me an idea on how to use excess parking</h2>
        <div className="mb-3">
        <label htmlFor="interest" className="form-label">
            What are you most interested in?:
          </label>
          <select
            {...register("interest")}
            id="interest"
            className="form-select"
          >
            <option value="">Select an interest</option>
            <option value="green areas">Green areas</option>
            <option value="affordable housing">Affordable housing</option>
            <option value="bike lanes">Bike lanes</option>
          </select>

          <label htmlFor="neighborhood" className="form-label">
            Neighborhood:
          </label>
          <select
            {...register("neighborhood")}
            id="neighborhood"
            className="form-select"
          >
            <option value="">Select a neighborhood</option>
            <option value="Inman">Inman Square</option>
            <option value="Mattapan">Mattapan</option>
            <option value="Roxbury">Roxbury</option>
            <option value="Seaport">Seaport</option>
          </select>
        </div>

        <label htmlFor="values" className="form-label">
            What are your personal preferences?
          </label>
          <select
            {...register("values")}
            id="values"
            className="form-select"
          >
            <option value="">Select a value</option>
            <option value="Minimize impact on mobility for low-income people">Minimize impact on mobility for low-income people</option>
            <option value="incentivize active mobility">Incentivize active mobility</option>
            <option value="increase social mixing">Increase social mixing</option>
          </select>

          <label htmlFor="lingo" className="form-label">
            How familiar are you with urban planning lingo?
          </label>
          <select
            {...register("lingo")}
            id="lingo"
            className="form-select"
          >
            <option value="">Select a familiarity level</option>
            <option value="not familiar">Not familiar</option>
            <option value="familiar">Familiar</option>
          </select>
        <button className="btn btn-primary mb-3">Submit</button>
      </form>
    {/* Add a space between this and the next button */}
      {isLoading && <div className="spinner-border"></div>}
      {queryResponse}
      {/* <ExpandableText>{queryResponse}</ExpandableText> */}
      <div></div>
      <br />
      <b>*NOTE: PLEASE REFER TO THE TABLE WITH FURTHER CONTEXT ON SOCIOECONOMIC AND MOBILITY OPTIONS</b>
      <br />
      <table className="table">
        <thead>
          <tr>
            <th>Neighborhood</th>
            <th>Walk Score</th>
            <th>Jobs 30min</th>
            <th>Rent per Unit</th>
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              <td>{row.nhood}</td>
              <td>{row.walk_score}</td>
              <td>{row.jobs_30min}</td>
              <td>{row.rent_punit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingQueryForm;
