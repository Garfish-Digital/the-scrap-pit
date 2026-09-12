import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Fighters } from './pages/Fighters'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Training } from './pages/Training'

// Phase 2 design studies — dev server only; the branch is dead code in production builds.
const Studies = import.meta.env.DEV ? lazy(() => import('./studies')) : null

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
          {Studies && (
            <Route
              path="studies/*"
              element={
                <Suspense fallback={null}>
                  <Studies />
                </Suspense>
              }
            />
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
