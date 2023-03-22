const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const getTask = await Task.find({});
    res.status(200).json({
      success: true,
      data: { getTask },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const getTaskDetail = await Task.findById(id);
    if (!getTaskDetail)
      return res.status(404).json({ message: `No task with id : ${id}` });
    res.status(200).json({
      getTaskDetail,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    if (!updateTask)
      return res.status(404).json({ message: `No task with id : ${id}` });
    res.status(200).json({
      message: "Task has been updated.",
      updateTask,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask)
      return res.status(404).json({ message: `No task with id : ${id}` });
    res.status(201).json({
      message: "Task has been deleted",
      deletedTask,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });
    if (!updateTask)
      return res.status(404).json({ message: `No task with id : ${id}` });
    res.status(200).json({
      message: "Task has been updated.",
      updateTask,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
