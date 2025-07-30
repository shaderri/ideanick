// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getIdeaTrpcRoute } from './getIdea'
import { getIdeasTrpcRoute } from './getIdeas'
// @endindex
import { trpc } from '../lib/trpc'

// Импортируем процедуры для работы с идеями
export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  // @endindex
})

// Экспортируем созданный tRPC роутер, чтобы использовать его в приложении
export type TrpcRouter = typeof trpcRouter
