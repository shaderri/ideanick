import { type Idea } from '@prisma/client'
import { type AppContext } from '../lib/ctx'
import { sendMostLikedIdeasEmail } from '../lib/emails'
import { logger } from '../lib/logger'

export const notifyAboutMostLikesIdeas = async (ctx: AppContext) => {
  const mostLikedIdeas = await ctx.prisma.$queryRaw<
    Array<Pick<Idea, 'id' | 'nick' | 'name'> & { thisMonthLikesCount: number }>
  >`
		with "topIdeas" as (
		select id, nick, name, (
		select count(*)::int
		from "IdeaLike" il
		where il."ideaId" = i."id"
			and il."createdAt" > now() - interval '1 month'
		) as "thisMonthLikesCount"
		from "Idea" i
		where i."blockedAt" is null
		order by "thisMonthLikesCount" desc
		limit 10
	)
	select * 
	from "topIdeas"
	where "thisMonthLikesCount" > 0`

  if (!mostLikedIdeas.length) {
    logger.info('', 'No ideas with likes this month')
    return
  }

  const users = await ctx.prisma.user.findMany({
    select: {
      email: true,
    },
  })
  for (const user of users) {
    await sendMostLikedIdeasEmail({ user, ideas: mostLikedIdeas })
  }
}
