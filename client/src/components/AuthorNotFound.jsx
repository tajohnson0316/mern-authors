import React from "react";
import { Link } from "react-router-dom";

const AuthorNotFound = (_props) => {
  return (
    <div>
      <h4>
        {" "}
        We're sorry, but we could not find the author you are looking for. Would
        you like to{" "}
        <Link to="/authors/new">add this author to our database?</Link>
      </h4>
      <hr />
      <p className="mb-3">
        <Link to="/">Return Home</Link>
      </p>
    </div>
  );
};

export default AuthorNotFound;
