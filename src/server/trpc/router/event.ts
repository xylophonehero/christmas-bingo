import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const eventRouter = router({
  add: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.create({
        select: {
          id: true,
        },
        data: {
          text: input.text,
        }
      })
      return event
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.event.findUnique({
        where: {
          id: input.id,
        },
        select: {
          text: true,
        }
      })
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.event.findMany({
        include: {
          _count: {
            select: {
              EventInstance: true
            }
          }
        }
      })
    }),
  addInstance: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const eventInstance = await ctx.prisma.eventInstance.create({
        select: {
          id: true
        },
        data: {
          eventId: input.eventId,
          userId: ctx.session.user.id,
        }
      })
      return eventInstance
    }),
  instancesByEvent: publicProcedure
    .input(z.object({ eventId: z.string() }))
    .query(async ({ ctx, input }) => {
      const eventInstances = await ctx.prisma.eventInstance.findMany({
        select: {
          id: true,
          createdAt: true,
          user: true,
        },
        where: {
          eventId: input.eventId,
        },
        orderBy: {
          createdAt: "desc",
        }
      })
      return eventInstances
    }),
})