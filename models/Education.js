var mongoose = require("mongoose");
// const _ = require('lodash');
// const validator=require('validator');
const _ =require('lodash');

const EducationSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Types.ObjectId,
    ref: "Volunteer"
  },

  universityId: {
    type: mongoose.Types.ObjectId,
    ref: "University"
  },
  facultyName: {
    type: String,
    lowercase: true
  },
  degree: {
    type: String
  },
  img: {
    type: String
  },
  graduationYear: {
    type:String,
    min: '1990-01-1',
    max: '2020-01-1'
  },
  location: {
    type: String
  },
  grade: {
    type: String
  }
},
{
  timestamps:true,
  toJSON:{
      virtuals:true,
      transform:(doc)=>{
          return _.pick(doc,["_id",'volunteerId','facultyName','degree','img','graduationYear','location','grade'])
      }
  }

}
);

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;
