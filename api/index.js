const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const listingRoute = require("./routes/listing");
const reservationRoute = require("./routes/reservation");
const userRoute = require("./routes/user");
const cors = require("cors");

dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false)
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/listing", listingRoute);
app.use("/api/reservations", reservationRoute);
app.use("/api/users", userRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
});
