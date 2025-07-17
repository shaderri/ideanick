import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrpcProvider } from '../lib/trpc'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
            <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
