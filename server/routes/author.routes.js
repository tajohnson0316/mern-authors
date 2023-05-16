const authorController = require("../controllers/author.controller");

module.exports = (app) => {
  app.get("/api/authors", authorController.findAllAuthors);
  app.get("/api/authors/:id", authorController.findOneAuthor);

  app.post("/api/authors", authorController.createNewAuthor);

  app.patch("/api/authors/:id", authorController.updateOneAuthor);

  app.delete("/api/authors/:id", authorController.deleteOneAuthor);
};
