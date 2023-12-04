const router = require("express").Router();
const Listing = require("../models/Listing");
// const cloudinary = require("../cloudinary");
const getSlug = require("speakingurl");
const { getPlaiceholder } = require("plaiceholder");



// Update Post
router.put("/:id", async (req, res) => {
  try {
    const product = await Listing.findById(req.params.id);
    let slug;
    if (getSlug(Listing.title) === getSlug(req.body.title)) {
      slug = Listing.slug;
    } else {
      const countPost = await Listing.findOne({
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
        const updatedPost = await Listing.findByIdAndUpdate(
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
    const listing = await Listing.findById(req.params.id);
    try {
      await listing.delete();
      res.status(200).json("Listing has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get post
// router.get("/:slug", async (req, res) => {
//   try {
//     const product = await Listing.findOne({ slug: req.params.slug });
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get all listing
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const q = getSlug(req.query.q);
  const newest = req.query.newest;
  const page = parseInt(req.query.page || 1);
  const num_results_on_page = parseInt(req.query.num_results_on_page || 11);
  // console.log(q);
  try {
    let listing, total_documents, total_pages;
    if (username) {
      listing = await Listing.find({ username });
    } else if (catName) {
      total_documents = await Listing.find({
        categories: {
          $in: [catName],
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      listing = await Listing.find({
        categories: {
          $in: [catName],
        },
      })
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page);
    } else if (q) {
      total_documents = await Listing.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      listing = await Listing.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      })
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page);
    } else if (newest) {
      listing = await Listing.find().limit(8).sort({ createdAt: -1 });
    } else if (page) {
      total_documents = await Listing.countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      listing = await Listing.find()
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page)
        .sort({ createdAt: -1 });
      // listing = await Listing.find().skip((page - 1) * num_results_on_page).limit(num_results_on_page);
    } else {
      listing = await Listing.find(); // ưu tiên lấy num_results_on_page do page có thể bằng 1 nên else if (page) được thực hiện
    }
    res
      .status(200)
      .json({
        page,
        num_results_on_page,
        total_documents,
        total_pages,
        listing,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
