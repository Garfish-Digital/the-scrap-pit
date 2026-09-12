import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Fighters } from './pages/Fighters'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Training } from './pages/Training'

// Phase 2 design studies. Published alongside the site (own lazy chunk) so the
// design process can be viewed on any device; remove the route before client handoff.
const Studies = lazy(() => import('./studies'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="training" element={<Training />} />
          <Route path="fighters" element={<Fighters />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="studies/*"
            element={
              <Suspense fallback={null}>
                <Studies />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
