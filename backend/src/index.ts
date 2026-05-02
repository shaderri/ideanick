// eslint-disable-next-line import/order
import { env } from './lib/env'
import corm from 'cors'
import express from 'express'
import { applyCron } from './lib/cron'
import { type AppContext, createAppContext } from './lib/ctx'
import { sendWelcomeEmail } from './lib/emails'
import { logger } from './lib/logger'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import { presetDb } from './scripts/presetDb'

void (async () => {
  let ctx: AppContext | null = null
  try {
    ctx = createAppContext()
    await presetDb(ctx)
    const expressApp = express()
    expressApp.get('/ping', (req, res) => {
      res.send('pong')
    })
    applyPassportToExpressApp(expressApp, ctx)
    expressApp.use(corm())
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter)
    applyCron(ctx)
    expressApp.listen(Number(env.PORT), '0.0.0.0', () => {
      logger.info('express', `Listening at http://localhost:${env.PORT}`)
    })
    void sendWelcomeEmail({ user: { nick: 'test', email: `${Math.random().toString()}@example.com` } })
  } catch (error) {
    logger.error('app', error)
    await ctx?.stop()
  }
})()
