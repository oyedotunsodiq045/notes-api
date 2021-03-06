const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Note = require('../models/Note');

// @desc    Get all Notes
// @route   GET /notes
// @access  Public
exports.getNotes = asyncHandler(async (req, res, next) => {
  const notes = await Note.find().populate({
    path: 'user',
    select: 'name'
  });

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes
  });
});

// @desc    Get single Note
// @route   GET /note/:id
// @access  Public
exports.getNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return next(
      next(
        new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
      )
    );
  }

  res.status(200).json({
    success: true,
    data: note
  });
});

// @desc    Create new Note
// @route   POST /notes
// @access  Public
exports.createNote = asyncHandler(async (req, res, next) => {
    const note = await Note.create(req.body);
  
    res.status(201).json({
      success: true,
      data: note
    });
  });
  
  // @desc    Update Note
  // @route   PUT /notes/:id
  // @access  Public
  exports.updateNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!note) {
      return next(
        next(
          new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
        )
      );
    }
  
    res.status(200).json({
      success: true,
      data: note
    });
  });
  
  // @desc    Delete Note
  // @route   DELETE /notes/:id
  // @access  Public
  exports.deleteNote = asyncHandler(async (req, res, next) => {
    const note = await Note.findByIdAndDelete(req.params.id);
  
    if (!note) {
      return next(
        next(
          new ErrorResponse(`Note not found with id of ${req.params.id}`, 404)
        )
      );
    }
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });