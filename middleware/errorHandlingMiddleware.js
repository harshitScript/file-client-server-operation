const errorHandlingMiddleware = (error, req, res, next) => {
  return res.status(500).json({ error: error.message });
};

module.exports = errorHandlingMiddleware;
