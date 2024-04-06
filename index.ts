import { Elysia } from "elysia";
import { connectDb } from "./config/db.setup";
import YtController from "./controller/yt.controller";

const app = new Elysia();

await connectDb();

app.use(new YtController().routes());

//Error handler
const PORT = process.env.PORT as string;
app
  // if routes match then it goes to error block
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
    else "Something went wrong!";
  })
  // Server listener
  .listen(PORT, () => {
    console.log(`Server started on ${app.server?.hostname}:${PORT}`);
  });
