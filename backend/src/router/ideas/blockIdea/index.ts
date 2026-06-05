import { zBlockIdeaTrpcInput } from './input'
import { sendIdeaBlockedEmail } from '../../../lib/emails'
import { trpcLoggedProcedure } from '../../../lib/trpc'
import { canBlockIdeas } from '../../../utils/can'

export const blockIdeaTrpcRoute = trpcLoggedProcedure.input(zBlockIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  const { ideaId } = input
  if (!canBlockIdeas(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const idea = await ctx.prisma.idea.findUnique({
    where: { id: ideaId },
    include: { author: true },
  })
  if (!idea) {
    throw new Error('IDEA_NOT_FOUND')
  }
  await ctx.prisma.idea.update({
    where: { id: ideaId },
    data: { blockedAt: new Date() },
  })
  void sendIdeaBlockedEmail({ user: idea.author, idea })
  return true
})
