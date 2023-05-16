import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthorForm = (props) => {
  const navigate = useNavigate();

  const { authors, setAuthors } = props;

  const [authorName, setAuthorName] = useState("");

  const [errors, setErrors] = useState([]);

  const createAuthor = (e) => {
    e.preventDefault();

    const newAuthor = {
      name: authorName,
    };

    axios
      .post("http://localhost:8001/api/authors", newAuthor)
      .then((response) => {
        console.log("✔ POST REQUEST SUCCESSFUL =>", response);
        setAuthors([...authors, response.data.results]);
        navigate("/");
      })
      .catch((error) => {
        console.log("❌ERROR IN SERVER RESPONSE =>", error);
        const errorResponse = error.response.data.errors; // Get the errors from error.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message);
        }
        // Set Errors
        setErrors(errorArr);
      });
  };

  return (
    <div>
      <div className="mb-3 fs-3">
        <Link to="/">Home</Link>
      </div>
      <div className="card">
        <div className="card-header text-center">
          <h1>New Author Form</h1>
        </div>
        <div className="card-body">
          <form onSubmit={createAuthor}>
            <div className="text-danger fw-bold">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="authorName" className="form-label">
                Author Name:
              </label>
              <input
                type="text"
                name="authorName"
                id="authorName"
                className="form-control"
                onChange={(e) => setAuthorName(e.target.value)}
                value={authorName}
              />
            </div>
            <div className="d-flex justify-content-between mb-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button className="btn btn-danger">
                <Link className="text-reset text-decoration-none" to="/">
                  Cancel
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorForm;
