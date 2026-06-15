import { SubCategoryModel } from "../../DB/Models/subCategory.model.js";
import slugify from "slugify";

const add_subCategory = async (req, res, next) => {
  const { name, Category } = req.body;

  try {
    const subCategory = await SubCategoryModel.create({
      name,
      slug: slugify(name),
      Category,
    });
    return res.json({
      message: "Sub Category Added Successfully",
      subCategory,
    });
  } catch (error) {
    return next(error);
  }
};
const get_all_subCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategoryModel.find();
    return res.json({ message: "All Sub Categories", subCategories });
  } catch (error) {
    return next(error);
  }
};
const update_subCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const subCategories = await SubCategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    return res.json({
      message: "sub category updated successfully",
      subCategories,
    });
  } catch (error) {
    return next(error);
  }
};
const delete_subCategory = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const subCategories = await SubCategoryModel.findByIdAndDelete({ _id });
    return res.json({
      message: "sub category deleted successfully",
      subCategories,
    });
  } catch (error) {
    return next(error);
  }
};
export {
  add_subCategory,
  get_all_subCategories,
  update_subCategory,
  delete_subCategory,
};
