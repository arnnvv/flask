import express, { Request, Response } from "express";
import zod from "zod";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port: number = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

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
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (e) {
      console.error(`Error in fetching DB ${e}`);
      res.status(500).json("Internal Server Error");
    }
  })
  .post(async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const isValid = validate({ title, description });
    if (!isValid.success) {
      res.status(404).json("Wrong Input");
      return;
    }
    const todoInstance = new Todo({ title, description });
    try {
      await todoInstance.save();
      res.status(201).json(`Todo Created`);
    } catch (e) {
      console.error(`Error in saving Todo ${e}`);
      res.status(500).json("Internal Server Error");
    }
  });

app.listen(port, () => {
  console.log(`App listning on port ${port}`);
});
