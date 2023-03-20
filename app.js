const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

//middlewares

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
