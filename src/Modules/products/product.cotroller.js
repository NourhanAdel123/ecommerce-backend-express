import { CategoryModel } from "../../DB/Models/category.model.js";
import { productModel } from "../../DB/Models/product.model.js";
import slugify from "slugify";

const add_product = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await productModel.create(req.body);
    res.json({ message: "product added sucsessfully", product });
  } catch (error) {
    return next(error);
  }
};

const get_Allproducts = async (req, res, next) => {
  const { page } = req.query || 1;
  let limit = 3;
  let skip = (page - 1) * limit;
  if (skip < 0) skip = 0;
  try {
    const products = await productModel
      .find({ price: { $gt: 600 } })
      .skip(skip)
      .limit(limit);
    res.json({ message: "all products", products });
  } catch (error) {
    return next(error);
  }
};

const get_SingleProduct = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const product = await productModel.findById(_id);
    res.json({ message: "specific product", product });
  } catch (error) {
    return next(error);
  }
};

const update_product = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const updatedproduct = await productModel.findOneAndUpdate(
      { _id },
      req.body,
      {
        new: true,
      },
    );
    res.json({ message: "update product", updatedproduct });
  } catch (error) {
    return next(error);
  }
};

const delet_product = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const brand = await productModel.deleteOne(_id);
    res.json({ message: "brand deleted successfully", brand });
  } catch (error) {
    return next(error);
  }
};

export {
  add_product,
  get_Allproducts,
  get_SingleProduct,
  update_product,
  delet_product,
};
