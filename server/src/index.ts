import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";

import { urlRouter } from "./routers/urlRouter.ts";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: urlRouter,
  })
);

// Handle short URL redirects
app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlEntry = await prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!urlEntry) {
      return res.status(404).send("Short URL not found");
    }

    // Redirect to the original URL
    return res.redirect(urlEntry.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
