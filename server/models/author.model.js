const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please the author's name."],
      minLength: [
        2,
        "Author's name must be at least (2) characters in length.",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
