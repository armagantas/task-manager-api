const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [20, "name cannot be more then 20 characters"],
  },
  completed: {
    type: boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
