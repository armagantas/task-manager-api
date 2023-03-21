const mongoose = require("mongoose");

const TaskSchema = new Mongoose.Schema({
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
