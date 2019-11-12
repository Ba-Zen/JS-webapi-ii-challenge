const router = require("express").Router();

const db = require("./db.js");

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        error,
        error: "The posts information could not be retrieved."
      });
    });
});

module.exports = router;
