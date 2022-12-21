import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { occasionRouter } from "./occasion";

export const appRouter = router({
  auth: authRouter,
  event: eventRouter,
  occasion: occasionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
