const router = require("express").Router();
const Reservation = require("../models/Reservation");
// const cloudinary = require("../cloudinary");
const getSlug = require("speakingurl");
const { getPlaiceholder } = require("plaiceholder");



// Update Post
router.put("/:id", async (req, res) => {
  try {
    const product = await Reservation.findById(req.params.id);
    let slug;
    if (getSlug(Reservation.title) === getSlug(req.body.title)) {
      slug = Reservation.slug;
    } else {
      const countPost = await Reservation.findOne({
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
        const updatedPost = await Reservation.findByIdAndUpdate(
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

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    try {
      await reservation.delete();
      res.status(200).json("Reservation has been deleted...");
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
//     const product = await Reservation.findOne({ slug: req.params.slug });
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get all Reservation
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  const q = getSlug(req.query.q);
  const newest = req.query.newest;
  const page = parseInt(req.query.page || 1);
  const num_results_on_page = parseInt(req.query.num_results_on_page || 11);
  // console.log(q);
  try {
    let reservations, total_documents, total_pages;
    if (username) {
      reservations = await Reservation.find({ username });
    } else if (catName) {
      total_documents = await Reservation.find({
        categories: {
          $in: [catName],
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      reservations = await Reservation.find({
        categories: {
          $in: [catName],
        },
      })
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page);
    } else if (q) {
      total_documents = await Reservation.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      }).countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      reservations = await Reservation.find({
        slug: {
          $regex: q,
          $options: "i",
        },
      })
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page);
    } else if (newest) {
      reservations = await Reservation.find().limit(8).sort({ createdAt: -1 });
    } else if (page) {
      total_documents = await Reservation.countDocuments();
      total_pages = Math.ceil(total_documents / num_results_on_page);
      reservations = await Reservation.find()
        .skip((page - 1) * num_results_on_page)
        .limit(num_results_on_page)
        .sort({ createdAt: -1 }).populate('userId', 'name').populate('listingId', 'title');
      // reservation = await Reservation.find().skip((page - 1) * num_results_on_page).limit(num_results_on_page);
    } else {
      reservations = await Reservation.find(); // ưu tiên lấy num_results_on_page do page có thể bằng 1 nên else if (page) được thực hiện
    }
    res
      .status(200)
      .json({
        page,
        num_results_on_page,
        total_documents,
        total_pages,
        reservations,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
