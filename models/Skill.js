var mongoose = require("mongoose");
// const _ = require('lodash');
// const validator=require('validator');
const SkillSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Types.ObjectId,
    ref: "Volunteer",
  },

  skillName: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.model("Skill", SkillSchema);
module.exports = Skill;
