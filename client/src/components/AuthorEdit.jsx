import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AuthorForm = (_props) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [authorName, setAuthorName] = useState("");

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/api/authors/${id}`)
      .then((response) => {
        console.log("✔ GET REQUEST SUCCESSFUL =>", response.data.results);
        const author = response.data.results;
        setAuthorName(author.name);
      })
      .catch((error) => {
        console.log("❌ERROR IN GET REQUEST =>", error);
        navigate("/authors/edit/notfound");
      });
  }, [id, navigate]);

  const updateAuthor = (e) => {
    e.preventDefault();

    const updatedAuthor = {
      name: authorName,
    };

    axios
      .patch(`http://localhost:8001/api/authors/${id}`, updatedAuthor)
      .then((response) => {
        console.log("✔ PATCH REQUEST SUCCESSFUL =>", response);
        navigate("/");
      })
      .catch((error) => {
        console.log("❌ERROR IN PATCH REQUEST =>", error);
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
          <h1>Update Author Form</h1>
        </div>
        <div className="card-body">
          <form onSubmit={updateAuthor}>
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
              <button type="submit" className="btn btn-success">
                Update
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
