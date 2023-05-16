import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AuthorForm from "./components/AuthorForm";
import AuthorEdit from "./components/AuthorEdit";
import AuthorNotFound from "./components/AuthorNotFound";

function App() {
  const [authors, setAuthors] = useState([]);

  const removeFromDom = (authorID) => {
    setAuthors(authors.filter((author) => author._id !== authorID));
  };

  return (
    <div className="container p-5">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              authors={authors}
              setAuthors={setAuthors}
              removeFromDom={removeFromDom}
            />
          }
        />
        <Route
          path="/authors/new/"
          element={<AuthorForm authors={authors} setAuthors={setAuthors} />}
        />
        <Route path="/authors/edit/:id" element={<AuthorEdit />} />
        <Route path="/authors/edit/notfound" element={<AuthorNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
