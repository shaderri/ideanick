import corm from 'cors'
import express from 'express'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const expressApp = express()
expressApp.get('/ping', (req, res) => {
  res.send('pong')
})

expressApp.use(corm())

applyTrpcToExpressApp(expressApp, trpcRouter)
expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})
