import { ReviewModel } from "../../DB/Models/Reviews.model.js";

export const add_review = async (req, res, next) => {
  try {
    // unique
    const review = await ReviewModel.create(req.body);
    res.json({ message: "review added successfully", review });
  } catch (error) {
    return next(error);
  }
};

export const all_review = async (req, res, next) => {
  try {
    const reviews = await ReviewModel.find();
    res.json({ message: "all reviews", reviews });
  } catch (error) {
    return next(error);
  }
};

export const get_specific_reviews = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const review = await ReviewModel.find({ _id });
    res.json({ message: "all reviews", review });
  } catch (error) {
    return next(error);
  }
};

export const update_review = async (req, res, next) => {
  const { _id } = req.params;
  const { description, rating } = req.body;
  try {
    // the owner of the review
    const review = await ReviewModel.findByIdAndUpdate(
      { _id },
      { rating, description },
      { new: true },
    );
    res.json({ message: "review updated successfully", review });
  } catch (error) {}
};

export const delete_review = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const brand = await ReviewModel.deleteOne(_id);
    res.json({ message: "review deleted successfully", brand });
  } catch (error) {
    return next(error);
  }
};
