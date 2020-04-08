const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Get all Users
// @route   GET /users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    data: users
  });
});

// @desc    Get single User
// @route   GET /user/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      )
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create new User
// @route   POST /users
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
  
    res.status(201).json({
      success: true,
      data: user
    });
  });
  
  // @desc    Update User
  // @route   PUT /users/:id
  // @access  Public
  exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!user) {
      return next(
        next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        )
      );
    }
  
    res.status(200).json({
      success: true,
      data: user
    });
  });
  
  // @desc    Delete User
  // @route   DELETE /users/:id
  // @access  Public
  exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
  
    if (!user) {
      return next(
        next(
          new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        )
      );
    }
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });