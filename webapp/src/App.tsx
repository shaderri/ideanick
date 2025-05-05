import { TrpcProvider } from '../lib/trpc'
import { AllideasPage } from '../pages/AllideasPage/index'

export const App = () => {
  return (
    <TrpcProvider>
      <AllideasPage />
    </TrpcProvider>
  )
}
