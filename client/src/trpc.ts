import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { UrlRouter } from "../../server/src/routers/urlRouter";

const trpcClient = createTRPCClient<UrlRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export default trpcClient;
