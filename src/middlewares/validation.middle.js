const Validation = (schema) => {
  return (req, res, next) => {
    const data = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    const result = schema.validate(data, {
      abortEarly: false,
    });

    if (result.error) {
      const errorMessage = result.error.details.map((obj) => obj.message);

      return next(new Error(errorMessage, { cause: 400 }));
    }

    next();
  };
};

export default Validation;
