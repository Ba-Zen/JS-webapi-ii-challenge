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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified id does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error, error: "the post information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ error: "Please provide title and contents for the post" });
  } else {
    db.insert(req.body)
      .then(post => {
        res.status(201).json(req.body);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error, message: "error saving post to database" });
      });
  }
});

module.exports = router;
