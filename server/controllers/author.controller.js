const Author = require("../models/author.model");

const findAllAuthors = (_request, response) => {
  Author.find()
    .then((allAuthors) => {
      let alphabetizedAuthors = [];
      const authorNames = allAuthors.filter((author) => author.name).sort();
      for (let authorName of authorNames) {
        for (let author of allAuthors) {
          if (author.name == authorName) {
            alphabetizedAuthors.push(author);
          }
        }
      }
      console.log({ results: alphabetizedAuthors });
      response.status(200).response.json({ results: alphabetizedAuthors });
    })
    .catch((error) => {
      response.status(400).json(error);
    });
};

const createNewAuthor = (request, response) => {
  const { name } = request.body;
  Author.create({ name })
    .then((newAuthor) => {
      console.log({ results: newAuthor });
      response.status(200).json({ results: newAuthor });
    })
    .catch((error) => {
      response.status(400).json(error);
    });
};
