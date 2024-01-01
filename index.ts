import express from "express";
import zod from "zod";
import mongoose from "mongoose";

const app = express();
const port: number = 3000;

mongoose.connect(
  "mongodb+srv://arnav:arnavsharma1A@cluster0.n9borfi.mongodb.net/flstk",
);

const Todo = mongoose.model("todo", {
  title: String,
  description: String,
});

function validate() {}

const todo = new Todo({
  title: "GYM AGAIN",
  description: "Go to GYM again",
});

todo.save();

app.listen(port, () => {
  console.log(`App listning on port ${port}`);
});
