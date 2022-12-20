import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const occasionRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const occasion = await ctx.prisma.occasion.findUnique({
        where: {
          id: input.id
        },
        include: {
          events: {
            include: {
              _count: {
                select: {
                  eventInstance: true,
                }
              }
            }
          }
        }
        // select: {
        //   title: true,
        //   startDate: true,
        //   endDate: true,
        //   events: true,
        // }
      })
      return occasion
    }),
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const occasions = await ctx.prisma.occasion.findMany({
        where: {
          participants: {
            some: {
              id: ctx.session.user.id
            }
          }
        },
      })
      return occasions
    }),
  create: protectedProcedure
    .input(z.object({
      title: z.string(),
      startDate: z.date(),
      endDate: z.date()
    }).refine((val) => val.startDate < val.endDate))
    .mutation(async ({ ctx, input }) => {
      const occasion = await ctx.prisma.occasion.create({
        data: {
          endDate: input.endDate,
          startDate: input.startDate,
          title: input.title,
          participants: {
            connect: [{ id: ctx.session.user.id }]
          }
        },
        select: {
          id: true,
        }
      })
      return { id: occasion.id }
    }),
  invite: protectedProcedure
    .input(z.object({
      id: z.string(),
      email: z.string().email()
    }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          email: input.email,
        }
      })
      if (!user) return new TRPCError({
        code: 'BAD_REQUEST',
        message: "No user with that id found",
      })

      await ctx.prisma.occasion.update({
        where: {
          id: input.id,
        },
        data: {
          participants: {
            connect: {
              id: user.id,
            }
          }
        }
      })
    })
})