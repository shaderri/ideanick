import _ from 'lodash'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

// Процедура getIdea: запрос с входными данными (ideaNick), возвращает полную информацию об идее
export const getIdeasTrpcRoute = trpc.procedure.query(() => {
  // Возвращаем список идей без длинного текста
  return { ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) }
})
