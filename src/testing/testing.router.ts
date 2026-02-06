import { type Request, type Response, Router } from "express";
import { HttpStatus } from "../core/types/http-statuses.types";
import { blogsCollection, postsCollection, usersCollection } from "../db/mongo";

export const testingRouter = Router();

testingRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send("testing url");
});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await postsCollection.drop();
  await blogsCollection.drop();
  await usersCollection.drop();

  res.sendStatus(HttpStatus.NoContent);
});
