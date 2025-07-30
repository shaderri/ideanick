import { z } from 'zod'
import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

// Процедура getIdea: запрос с входными данными (ideaNick), возвращает полную информацию об идее
export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      ideaNick: z.string(), // ожидаем объект с полем ideaNick типа string
    })
  )
  .query(({ input }) => {
    // Ищем идею по переданному nick
    const idea = ideas.find((idea) => idea.nick === input.ideaNick)
    // Возвращаем найденную идею или null, если не нашли
    return { idea: idea || null }
  })
