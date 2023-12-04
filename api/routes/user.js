const router = require("express").Router();
const User = require("../models/User");
// const cloudinary = require("../cloudinary");
const getSlug = require("speakingurl");
const { getPlaiceholder } = require("plaiceholder");



// Update Post
router.put("/:id", async (req, res) => {
  try {
    const product = await User.findById(req.params.id);
    let slug;
    if (getSlug(User.title) === getSlug(req.body.title)) {
      slug = User.slug;
    } else {
      const countPost = await User.findOne({
        slug: getSlug(req.body.title),
      }).countDocuments();
      if (countPost === 1) {
        slug =
          getSlug(req.body.title) + "-" + Math.random().toString(36).slice(-8);
      } else {
        slug = getSlug(req.body.title);
      }
    }

    const imgArray = req.body.photos;
    // console.log(imgArray);
    try {
      const imgs = await Promise.all(
        imgArray.map(async (img) => {
          const imgBase64 = await getPlaiceholder(
            img.src,
            (options = {
              size: 32,
            })
          ).then(({ base64 }) => {
            return {
              src: img.src,
              base64: base64,
              public_id: img.public_id,
            };
          });

          return imgBase64;
        })
      );
      console.log(imgs);
      const photos = [...imgs];
      try {
        const updatedPost = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: { ...req.body, ...{ slug }, ...{ photos } },
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      err;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    try {
      await user.delete();
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get post
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all User
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const q = getSlug(req.query.q);
  const newest = req.query.newest;
  const page = parseInt(req.query.page || 1);
  const num_results_on_page = parseInt(req.query.num_results_on_page || 11);
  // console.log(q);
  try {
    let users, total_documents, total_pages;
    if (username) {
      users = await User.find({ username });
    } else if (catName) {
      total_documents = await User.find({
        categories: {
          $in: [catName],
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      users = await User.find({
        categories: {
          $in: [catName],
        },
      })
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page);
    } else if (q) {
      total_documents = await User.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      users = await User.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      })
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page);
    } else if (newest) {
      users = await User.find().limit(8).sort({ createdAt: -1 });
    } else if (page) {
      total_documents = await User.countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      users = await User.find()
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page)
        .sort({ createdAt: -1 });
      // User = await User.find().skip((page - 1) * num_results_on_page).limit(num_results_on_page);
    } else {
      users = await User.find(); // ưu tiên lấy num_results_on_page do page có thể bằng 1 nên else if (page) được thực hiện
    }
    res
      .status(200)
      .json({
        page,
        num_results_on_page,
        total_documents,
        total_pages,
        users,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
