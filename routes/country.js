const express = require("express");
const router = express.Router();
const Country = require("../models/Country");

//-----------------get all countries-----------------/
router.get("/getAllcountries", async (req, res, next) => {
  const countries = await Country.find();
  res.json(countries);
});

//----------------Add new country---------------//
router.post("/Addcountry", async (req, res, next) => {
  const { countryName } = req.body;
  const country = new Country({ countryName });
  await country.save();
  res.json({ message: "country added successfully", country });
});
module.exports = router;
