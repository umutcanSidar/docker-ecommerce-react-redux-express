import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: String,
  image: String,
  price: Number,
  brand: String,
  rating: Number,
  numReview: Number,
  countInStock: Number,
  created_date: {
    type: Date,
    default: Date.now()
  },
});

export default mongoose.model("Product", ProductSchema);
