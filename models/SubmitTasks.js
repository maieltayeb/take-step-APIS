var mongoose = require("mongoose");
const _ =require('lodash');
const SubmitTAsksSchema = new mongoose.Schema(
  {
    volunteerId: {
        type: mongoose.Types.ObjectId,
        ref: "Volunteer"
      },
    bussinessOwnerId: {
        type: mongoose.Types.ObjectId,
        ref: "BusinessOwner"
      },
    jobId: {
      type: String,
    },
    jobTitle: {
        type: String,
      },
    taskLink:{
        type: String,
        required: true
    },
    VolunteerComment:{
        type: String,
      }
  },
  {
    timestamps:true,
    toJSON:{
        virtuals:true,
        transform:(doc)=>{
            return _.pick(doc,["_id",'volunteerId','bussinessOwnerId','jobId','jobTitle','taskLink','VolunteerComment'])
        }
    }
  
  }
);
const SubmitTasks = mongoose.model("SubmitTasks", SubmitTAsksSchema);

module.exports = SubmitTasks;
