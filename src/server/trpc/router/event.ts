import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const eventRouter = router({
  add: protectedProcedure
    .input(z.object({
      text: z.string(),
      occasionId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const existingEvent = await ctx.prisma.event.findMany({
        where: {
          text: input.text,
          occasionId: input.occasionId,
        },
      })

      if (existingEvent.length > 0) throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Event already exists'
      })

      const event = await ctx.prisma.event.create({
        select: {
          id: true,
        },
        data: {
          text: input.text,
          occasionId: input.occasionId,
        }
      })
      return event
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
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
              eventInstance: true
            }
          }
        }
      })
    }),
  eventsByOccasion: protectedProcedure
    .input(z.object({ occasionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const events = await ctx.prisma.event.findMany({
        include: {
          _count: {
            select: {
              eventInstance: true
            }
          }
        },
        where: {
          occasionId: input.occasionId,
        }
      })
      return events
    }),
  addInstance: protectedProcedure
    .input(z.object({ eventId: z.number() }))
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
    .input(z.object({ eventId: z.number() }))
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
  deleteInstance: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.eventInstance.delete({
        where: {
          id: input.eventId
        }
      })
    })
})