const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  media: [
    {
      type: String,
      required: false,
    },
  ],
  productCategory: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("product", ProductSchema);
