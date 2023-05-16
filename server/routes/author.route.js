const authorController = require("../controllers/author.controller");

module.exports = (app) => {
  app.get("/api/authors", authorController.findAllAuthors);
  app.post("/api/authors", authorController.createNewAuthor);
};
