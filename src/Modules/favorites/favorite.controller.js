import { userModel } from "../../DB/Models/user.model.js";

export const add_to_favorite = async (req, res, next) => {
  const { product } = req.body;
  const { id } = req.params;
  try {
    const result = await userModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { favorites: product },
      },
      {
        new: true,
      },
    );
    res.json({ message: "product added successfully to favorite", result });
  } catch (error) {
    return next(error);
  }
};

export const get_all_favorite = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const result = await userModel.findById(_id).populate("favorites");
    res.json({ message: "all favorite", result });
  } catch (error) {
    return next(error);
  }
};

export const delete_from_favorites = async (req, res, next) => {
  const { id } = req.params;
  const { product } = req.body;
  try {
    const result = await userModel.findByIdAndUpdate(
      id,
      {
        $pull: { favorites: product },
      },
      { new: true },
    );
    res.json({ message: "product deleted successfully to favorite", result });
  } catch (error) {
    return next(error);
  }
};
