import { CronJob } from 'cron'
import { type AppContext } from './ctx'
import { logger } from './logger'
import { notifyAboutMostLikesIdeas } from '../scripts/notifyAboutMostLikedIdeas'

export const applyCron = (ctx: AppContext) => {
  new CronJob(
    '0 10 1 * *', // At 10:00 on day-of-month 1
    () => {
      notifyAboutMostLikesIdeas(ctx).catch((error) => {
        logger.error('cron', error)
      })
    },
    null, // onComplete callback, not needed here
    true // start the job right now
  )
}
