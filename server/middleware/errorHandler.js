const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: messages,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered',
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
