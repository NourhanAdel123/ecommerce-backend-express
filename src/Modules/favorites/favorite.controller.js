import { userModel } from "../../DB/Models/user.model.js";
import { generate_QR } from "../../services/Generate_QR.js";

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

export const generate_qr = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const user = await userModel.findById(_id).select("username");
    const qrcode = await generate_QR({ data: user });

    res.json({ message: "qr generated successfully", qrcode, user });
  } catch (error) {
    return next(error);
  }
};
