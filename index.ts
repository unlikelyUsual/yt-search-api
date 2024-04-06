import { Elysia } from "elysia";

const app = new Elysia();

//Error handler
const PORT = process.env.PORT || 4040;
app
  // if routes match then it goes to error block
  .onError(({ code }) => {
    if (code === "NOT_FOUND") return "Route not found :(";
    else "Something went wrong!";
  })
  // Server listener
  .listen(PORT, () => console.log(`Server started on ${PORT}`));
