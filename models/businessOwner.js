var mongoose = require("mongoose");
const _ = require("lodash");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
require("dotenv").config();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

const BusinessOwnerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    country: {
      type: mongoose.ObjectId,
      ref: "Country"
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    paymentData: {
      cardNum: {
        type: Number
        // required: true
      },
      secretNum: {
        type: Number
        // required: true
      },
      phone: {
        type: Number
        // required: true
      },
      total: {
        type: Number
        // required: true
      }
    },
    jobTitle: {
      type: String
    },
    imgUrl: {
      type: String
    },
    description: {
      type: String
    },
    companyName: {
      type: String
    },
    submitTasks: []
  },
  {
    collection: "BusinessOweners",
    toJSON: {
      virtuals: true,
      transform: doc => {
        return _.pick(doc, [
          "id",
          "firstName",
          "lastName",
          "password",
          "email",
          "country",
          "description",
          "companyName",
          "jobTitle",
          "imgUrl",
          "paymentData",
          "submitTasks"
        ]);
      }
    }
  }
);
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

BusinessOwnerSchema.pre("save", async function() {
  const userInstance = this;
  if (this.isModified("password")) {
    userInstance.password = await bcrypt.hash(
      userInstance.password,
      saltRounds
    );
  }
});
//---------------------to check password of spesifed user-----------------//
BusinessOwnerSchema.methods.comparePassword = async function(plainPassword) {
  const userInstance = this;
  return bcrypt.compare(plainPassword, userInstance.password);
};
//---------------------generate token for this user------------------------------//
BusinessOwnerSchema.methods.generateToken = async function(expiresIn = "3w") {
  const userInstance = this;
  return sign({ Id: userInstance.id }, jwtSecret, { expiresIn });
};
///----------------get user from token----------------------//
BusinessOwnerSchema.statics.getUserFromToken = async function(token) {
  const User = this;
  const payload = await verify(token, jwtSecret);
  const currentUser = await User.findById(payload.Id);
  if (!currentUser) throw Error("bussiness not found");
  return currentUser;
};

const BusinessOwner = mongoose.model("BusinessOwner", BusinessOwnerSchema);

module.exports = BusinessOwner;
