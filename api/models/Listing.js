const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    roomCount: {
      type: Number,
      required: false,
    },
    bathroomCount: {
      type: String,
      required: false,
    },
    guestCount: {
      type: String,
      required: false,
    },
    locationValue: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: false,
    },
    user: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema, "Listing");
 