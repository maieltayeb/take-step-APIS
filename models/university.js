var mongoose = require("mongoose");
const UniversitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: true
    }
  },
  {}
);
const University = mongoose.model("University", UniversitySchema);

module.exports = University;
