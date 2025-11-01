import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { trpc } from "../context.ts";

const prisma = new PrismaClient();

export const urlRouter = trpc.router({
  getShortUrl: trpc.procedure.input(z.string()).query(async ({ input }) => {
    const url = await prisma.url.findUnique({
      where: { shortUrl: input },
    });

    if (!url) {
      throw new Error("URL not found");
    }

    return url.originalUrl;
  }),

  createShortUrl: trpc.procedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      let shortUrl = "";
      let exists = true;

      // ensure unique short URL
      while (exists) {
        shortUrl = Math.random().toString(36).substring(2, 8);
        const existing = await prisma.url.findUnique({ where: { shortUrl } });
        if (!existing) exists = false;
      }

      const created = await prisma.url.create({
        data: {
          originalUrl: input.url,
          shortUrl,
        },
      });
      return created.shortUrl;
    }),
});

export type UrlRouter = typeof urlRouter;
