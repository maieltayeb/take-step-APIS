const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = process.env.PORT || 4402;
const bussinessOwnerRouter = require("./routes/BussinessOwner");
const volunteerRouter = require("./routes/Volunteer");
const countryRouter = require("./routes/country");
const universityRouter = require("./routes/university");
require("express-async-errors");
require("dotenv").config();
var cors = require("cors");
require("./db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));
// parse application/json
app.use(bodyParser.json());
//  app.use(express.json());
// app.use(express.urlencoded());

app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/bussinessOwner", bussinessOwnerRouter);
app.use("/volunteer", volunteerRouter);
app.use("/country", countryRouter);
app.use("/university", universityRouter);

///global error handler
// app.use((err,req,res,next) => {
//     console.log(err)
//     const statusCode= err.statusCode || 500;

//     res.status(statusCode).json({

//         meesage:err.message,
//         type:err.type,
//         details:err.details
//     })
// });
//////////////

app.use((err, req, res, next) => {
  console.log("errrr",err);
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    return res.status(statusCode).json({
      message: err.message,
      type: "INTERNAL_SERVER_ERROR",
      details: [],
    });
  } else {

    res.status(statusCode).json({
      message: err.message,
      type: err.type,
      details: err.details,
    });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
// .listen(process.env.PORT || 5000)
