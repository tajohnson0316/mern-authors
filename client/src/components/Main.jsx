import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Main = (props) => {
  const { authors, setAuthors, removeFromDom } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/authors")
      .then((response) => {
        console.log("✔ GET REQUEST SUCCESSFUL =>", response.data.results);
        setAuthors(response.data.results);
      })
      .catch((error) => {
        console.log("❌ERROR IN GET REQUEST =>", error);
      });
  }, [setAuthors]);

  const deleteAuthor = (authorID) => {
    axios
      .delete(`http://localhost:8001/api/authors/${authorID}`)
      .then((response) => {
        console.log("✔ DELETE REQUEST SUCCESSFUL =>", response.data.results);
        removeFromDom(authorID);
      })
      .catch((error) => {
        console.log("❌ERROR IN DELETE REQUEST =>", error);
      });
  };

  return (
    <div>
      <div className="card">
        <div className="card-header text-center">
          <h1>Favorite Authors</h1>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Author Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, idx) => {
                return (
                  <tr key={author._id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{author.name}</td>
                    <td className="d-flex justify-content-center gap-3">
                      <Link
                        className="text-warning"
                        to={`/authors/edit/${author._id}`}
                      >
                        Edit
                      </Link>
                      <span> | </span>
                      <Link
                        className="text-danger"
                        onClick={(e) => deleteAuthor(author._id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Link to="/authors/new">Add An Author</Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
