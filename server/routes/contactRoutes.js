const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getContacts,
  createContact,
  deleteContact,
} = require('../controllers/contactController');

const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\s\-\+\(\)]{7,20}$/)
    .withMessage('Please provide a valid phone number'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => err.msg),
    });
  }
  next();
};

router.get('/', getContacts);
router.post('/', validateContact, handleValidation, createContact);
router.delete('/:id', deleteContact);

module.exports = router;
