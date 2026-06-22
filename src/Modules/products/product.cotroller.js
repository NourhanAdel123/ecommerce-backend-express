import { CategoryModel } from "../../DB/Models/category.model.js";
import { productModel } from "../../DB/Models/product.model.js";
import { userModel } from "../../DB/Models/user.model.js";
import { redisClient } from "../../redisConfig/redis.js";
import slugify from "slugify";
console.log("product controller loaded");

// Cache key for all products
const ALL_PRODUCTS_CACHE_KEY = "products:all";
const CACHE_TTL = 60 * 60; // 1 hour in seconds

const add_product = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await productModel.create(req.body);

    // Invalidate all products cache since product list changed
    await redisClient.del(ALL_PRODUCTS_CACHE_KEY);

    res.json({ message: "product added sucsessfully", product });
  } catch (error) {
    return next(error);
  }
};

// const get_Allproducts = async (req, res, next) => {
//   console.log("GET ALL PRODUCTS START");

//   try {
//     const cached = await redisClient.get(ALL_PRODUCTS_CACHE_KEY);
//     if (cached) {
//       return res.json({
//         message: "all products (from cache)",
//         products: JSON.parse(cached),
//       });
//     }

//     const products = await productModel.find();

//     // Store all products in Redis cache
//     await redisClient.setEx(
//       ALL_PRODUCTS_CACHE_KEY,
//       CACHE_TTL,
//       JSON.stringify(products),
//     );
//     console.log("Products from Mongo:", products.length);

//     res.json({ message: "all products", products });
//   } catch (error) {
//     return next(error);
//   }
// };

const get_all_products = async (req, res, next) => {
  try {
    const products = await productModel.find();

    res.status(200).json({
      message: "all products from mongo",
      products,
    });
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

    // Invalidate first-page cache since product data changed
    await redisClient.del(FIRST_PAGE_CACHE_KEY);

    res.json({ message: "update product", updatedproduct });
  } catch (error) {
    return next(error);
  }
};

const delet_product = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const brand = await productModel.deleteOne(_id);

    // Invalidate first-page cache since product list changed
    await redisClient.del(FIRST_PAGE_CACHE_KEY);

    res.json({ message: "brand deleted successfully", brand });
  } catch (error) {
    return next(error);
  }
};

export {
  add_product,
  // get_Allproducts,
  get_all_products,
  get_SingleProduct,
  update_product,
  delet_product,
};
