const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
