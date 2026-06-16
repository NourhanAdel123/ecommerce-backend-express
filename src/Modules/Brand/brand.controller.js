import slugify from "slugify";
import { brandCategoryModel } from "../../DB/Models/brandCategory.model.js";

export const add_brand = async (req, res, next) => {
  const { name } = req.body;
  try {
    const brand = await brandCategoryModel.create({
      name,
      slug: slugify(name),
    });
    res.json({ message: "brand added sucsessfully", brand });
  } catch (error) {
    return next(error);
  }
};

export const get_AllBrands = async (req, res, next) => {
  try {
    const allBrands = await brandCategoryModel.find();
    res.json({ message: "all brands", allBrands });
  } catch (error) {
    return next(error);
  }
};

export const get_SingleBrand = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const brand = await brandCategoryModel.findById(_id);
    res.json({ message: "specific brand", brand });
  } catch (error) {
    return next(error);
  }
};

export const update_brand = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const updatedbrand = await brandCategoryModel.findOneAndUpdate(
      { _id },
      req.body,
      { new: true },
    );
    res.json({ message: "update brand", updatedproduct });
  } catch (error) {
    return next(error);
  }
};

export const delet_brand = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const brand = await brandCategoryModel.deleteOne(_id);
    res.json({ message: "specific brand", brand });
  } catch (error) {
    return next(error);
  }
};
