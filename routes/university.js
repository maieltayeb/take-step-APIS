const express = require("express");
const router = express.Router();
const University = require("../models/university");

router.post("/add-university", async (req, res, next) => {
  const { universityName } = req.body;
  const university = new University({ universityName });
  await university.save();
  res.json({ message: "university added successfully", university });
});

module.exports = router;
