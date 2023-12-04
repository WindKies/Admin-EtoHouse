const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    listingId: { type: mongoose.Types.ObjectId, ref: "Listing" },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    totalPrice: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Reservation",
  ReservationSchema,
  "Reservation"
);
