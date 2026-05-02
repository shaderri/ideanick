import { zSetIdeaLikeIdeaTrpcInput } from './input'
import { trpcLoggedProcedure } from '../../../lib/trpc'

export const setIdeaLikeTrpcRoute = trpcLoggedProcedure
  .input(zSetIdeaLikeIdeaTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const { ideaId, isLikedByMe } = input
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    const idea = await ctx.prisma.idea.findUnique({
      where: { id: ideaId },
    })
    if (!idea) {
      throw new Error('IDEA_NOT_FOUND')
    }
    if (isLikedByMe) {
      await ctx.prisma.ideaLike.upsert({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
        create: {
          ideaId,
          userId: ctx.me.id,
        },
        update: {},
      })
    } else {
      await ctx.prisma.ideaLike.delete({
        where: {
          ideaId_userId: {
            ideaId,
            userId: ctx.me.id,
          },
        },
      })
    }
    const likesCount = await ctx.prisma.ideaLike.count({
      where: { ideaId },
    })
    return {
      idea: {
        id: ideaId,
        likesCount,
        isLikedByMe,
      },
    }
  })
