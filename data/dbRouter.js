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

router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  db.findCommentById(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: "the post with the specified id does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error,
        error: "the comments information could not be retrieved"
      });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const post = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ error: "Please provide title and contents for the post" });
  } else {
    db.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error, message: "error saving post to database" });
      });
  }
});

router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const newComment = {
    text: text,
    post_id: id
  };

  if (text) {
    db.findById(id).then(post => {
      if (post.length > 0) {
        db.insertComment(newComment)
          .then(comment => {
            res.status(201).json(comment);
          })
          .catch(error => {
            res
              .status(500)
              .json({ error, message: "error saving post to database" });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    });
  }
});
module.exports = router;
