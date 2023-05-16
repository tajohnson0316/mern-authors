const Author = require("../models/author.model");

// *** GET ALL ***
module.exports.findAllAuthors = (_request, response) => {
  /**
   * .find()
     @param: none 
   */
  Author.find()
    .then((allAuthors) => {
      let alphabetizedAuthors = [];
      const authorNames = allAuthors.map((author) => author.name).sort();
      for (let authorName of authorNames) {
        for (let author of allAuthors) {
          if (author.name == authorName) {
            alphabetizedAuthors.push(author);
          }
        }
      }

      console.log({ results: alphabetizedAuthors });
      response.status(200).json({ results: alphabetizedAuthors });
    })
    .catch((error) => {
      response.status(400).json(error);
    });
};

// *** GET ONE ***
module.exports.findOneAuthor = (request, response) => {
  /** 
    .findOne({_id: request.params.id})
    @param: the passed in "id" from the URL
  */
  Author.findOne({ _id: request.params.id })
    .then((author) => {
      console.log({ results: author });
      response.status(200).json({ results: author });
    })
    .catch((error) => {
      response.status(400).json(error);
    });
};

// *** CREATE ONE ***
module.exports.createNewAuthor = (request, response) => {
  /** 
    .create({request.body})
    @param: the body/data of the client request
  */
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

// *** UPDATE ONE ***
module.exports.updateOneAuthor = (request, response) => {
  /**
    .findOneAndUpdate({_id: request.params.id}, request.body, {new, runValidators})
    @param: the passed in "id" from the URL
    @param: the body/data of the client request
    @param: update options
  */
  Author.updateOne({ _id: request.params.id }, request.body, {
    new: true,
    runValidators: true,
  })
    .then((author) => {
      console.log("UPDATE RESULTS ==>", author);
      response.status(200).json({ results: author });
    })
    .catch((error) => {
      response.status(400).json(error);
    });
};

// *** DELETE ONE ***
module.exports.deleteOneAuthor = (request, response) => {
  /**
    .deleteOne({_id: request.params.id})
    @param: the passed in "id" from the URL
  */
  Author.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.status(200).json(deleteConfirmation))
    .catch((error) => response.status(400).json(error));
};
