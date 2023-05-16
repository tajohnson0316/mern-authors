const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the author's name."],
      minLength: [
        3,
        "Author's name must be at least (3) characters in length.",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
