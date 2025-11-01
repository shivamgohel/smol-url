import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";

import { urlRouter } from "./routers/urlRouter.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: urlRouter,
  })
);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
