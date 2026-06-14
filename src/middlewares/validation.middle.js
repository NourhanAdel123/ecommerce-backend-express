const Validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query, ...req.headers };
    const result = schema.Validation(data, { abortEarly: false });

    const errorMessage = result.error.details.map((obj) => {
      return obj.message;
    });
    return next(new Error(errorMessage, { cause: 400 }));

    next();
  };
};
export default Validation;
