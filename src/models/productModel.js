import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "please provide a title"],
  },
  discription: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  image: {
    type: String,
    required: [true, "please provide"],
  },
});

const Product =
  mongoose?.models?.Product || mongoose?.model("Product", ProductSchema);

export default Product;
