import { CategoryModel } from "../../DB/Models/category.model.js";
import slugify from "slugify";

const add_category = async (req, res, next) => {
  const { name } = req.body;

  try {
    const category = await CategoryModel.create({ name, slug: slugify(name) });
    return res.json({ message: "Category Added Successfully", category });
  } catch (error) {
    return next(error);
  }
};
const get_all_categories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    return res.json({ message: "All Categories", categories });
  } catch (error) {
    return next(error);
  }
};
const update_category = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const categories = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    return res.json({ message: "category updated successfully", categories });
  } catch (error) {
    return next(error);
  }
};
const delete_category = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const categories = await CategoryModel.findByIdAndDelete({ _id });
    return res.json({ message: "category deleted successfully", categories });
  } catch (error) {
    return next(error);
  }
};
export { add_category, get_all_categories, update_category, delete_category };
