const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const getTask = await Task.find({});
  res.status(200).json({
    success: true,
    data: { getTask },
  });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    task,
  });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const getTaskDetail = await Task.findById(id);
  if (!getTaskDetail) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({
    getTaskDetail,
  });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updateTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidator: true,
  });
  if (!updateTask)
    return next(createCustomError(`No task with id : ${id}`, 404));
  res.status(200).json({
    message: "Task has been updated.",
    updateTask,
  });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask)
    return next(createCustomError(`No task with id : ${id}`, 404));
  res.status(201).json({
    message: "Task has been deleted",
    deletedTask,
  });
});

const editTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updateTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    overwrite: true,
    runValidators: true,
  });
  if (!updateTask)
    return next(createCustomError(`No task with id : ${id}`, 404));
  res.status(200).json({
    message: "Task has been updated.",
    updateTask,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
