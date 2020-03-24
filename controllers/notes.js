const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Customer = require('../models/Customer');

// @desc    Get all Customers
// @route   GET /customers
// @access  Public
exports.getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find();

  res.status(200).json({
    success: true,
    data: customers
  });
});

// @desc    Get single Customer
// @route   GET /customer/:id
// @access  Public
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return next(
      next(
        new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
      )
    );
  }

  res.status(200).json({
    success: true,
    data: customer
  });
});

// @desc    Create new Customer
// @route   POST /customers
// @access  Public
exports.createCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.create(req.body);
  
    res.status(201).json({
      success: true,
      data: customer
    });
  });
  
  // @desc    Update Customer
  // @route   PUT /customers/:id
  // @access  Public
  exports.updateCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!customer) {
      return next(
        next(
          new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
        )
      );
    }
  
    res.status(200).json({
      success: true,
      data: customer
    });
  });
  
  // @desc    Delete Customer
  // @route   DELETE /customers/:id
  // @access  Public
  exports.deleteCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
  
    if (!customer) {
      return next(
        next(
          new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
        )
      );
    }
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });