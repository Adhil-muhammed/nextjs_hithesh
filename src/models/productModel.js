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
    // required: [
    //   true,
    //   "Data cannot be created without specifying the image type",
    // ],
  },
});

const Product =
  mongoose?.models?.Product || mongoose?.model("Product", ProductSchema);

export default Product;
