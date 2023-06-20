import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "must be at least 2 characters"],
    maxlength: [32, "maximum 32 characters"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  parent: { type: ObjectId, ref: "Category", required: true },
});

export const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
