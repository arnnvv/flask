import express, { Request, Response } from "express";
import zod from "zod";
import mongoose from "mongoose";

const app = express();
const port: number = 3000;

app.use(express.json());

mongoose.connect(
  "mongodb+srv://arnav:arnavsharma1A@cluster0.n9borfi.mongodb.net/flstk",
);

const Todo = mongoose.model("todo", {
  title: String,
  description: String,
});

function validate(todo: any) {
  const scheema = zod.object({
    title: zod.string(),
    description: zod.string(),
  });
  return scheema.safeParse(todo);
}

app.get("/", (req: Request, res: Response) => {
  res.status(200).json(`Hello from port ${port}`);
});

app
  .route("/todos")
  .get(async (req: Request, res: Response) => {
    const todos = await Todo.find();
    res.status(200).json(`Todos: ${todos}`);
  })
  .post(async (req: Request, res: Response) => {
    const { todo } = req.body;
    const todoInstance = new Todo(todo);
    await todoInstance.save();
    res.status(201).json(`Todo created`);
  });

//const todo = new Todo({
// title: "GYM AGAIN",
//  description: "Go to GYM again",
//});

//todo.save();

app.listen(port, () => {
  console.log(`App listning on port ${port}`);
});
