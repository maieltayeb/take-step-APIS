const BusinessOwner = require("../models/businessOwner");
const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication");
const validationMiddleWare = require("../middlewares/validationMiddleware");
require("express-async-errors");
const router = express.Router();
const { check } = require("express-validator");

//-------------------multer-upload img -----------------------------
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

//----------------------get all users-----------------------------//
router.get(

  "/getAllBussinessUsers",
   // authenticationMiddleware,
  async (req, res, next) => {
    const users = await BusinessOwner.find().populate("country");
    res.json(users);
  }
);
//-----------------get user by id ---------------------------//
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  //const users=await User.find();
  const user = await BusinessOwner.findById(id).populate("country");
  res.json(user);
});

//---------------------------UpdateUser---------------------------//
router.patch(
  "/Edit/:id",
  authenticationMiddleware,
  upload.single("imgUrl"),
  async (req, res, next) => {
    const imgUrl = req.file.path;
    id = req.user.id;
    const {
      password,
      firstName,
      lastName,
      country,
      email,
      paymentData,
      jobTitle,
      description,
      companyName
    } = req.body;
    const user = await BusinessOwner.findByIdAndUpdate(
      id,
      {
        $set: {
          password,
          firstName,
          lastName,
          country,
          email,
          paymentData,
          jobTitle,
          description,
          companyName,
          imgUrl
        }
      },
      {
        new: true,
        runValidators: true,
        omitUndefined: true
      }
    ).populate("country");
    res.status(200).json(user);
  }
);

///-----------------------Register-----------------//
router.post(
  "/register",
  validationMiddleWare(
    check("password")
      .isLength({
        min: 4
      })
      .withMessage("must be at least 4 chars long"),
    check("email").isEmail()
  ),
  async (req, res, next) => {
    const {
      email,
      firstName,
      lastName,
      password,
      country,
      paymentData
    } = req.body;
    const user = new BusinessOwner({
      firstName,
      lastName,
      password,
      country,
      paymentData,
      email
    });

    await user.save(function(err) {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          // Duplicate username
          return res
            .status(422)
            .send({ succes: false, message: " email already exist!" });
        }

        // Some other error
        return res.status(422).send(err);
      }

      res.json({
        success: true,
        user
      });
    });
  }
);

////------------------------------login-----------------------///
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await BusinessOwner.findOne({ email }).populate("country");
  if (!user) throw new Error("wrong email or password");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("wrong email or password");

  const token = await user.generateToken();

  if (!token) throw new Error("token  cant created");

  res.json({ token, user });
});

module.exports = router;
