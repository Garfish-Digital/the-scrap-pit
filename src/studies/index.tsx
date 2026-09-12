import { Navigate, Route, Routes } from 'react-router'
import { ColorStudy } from './ColorStudy'
import { LogoStudy } from './LogoStudy'
import { StudiesLayout } from './StudiesLayout'
import { TypeStudy } from './TypeStudy'

export default function StudiesRoutes() {
  return (
    <Routes>
      <Route element={<StudiesLayout />}>
        <Route index element={<Navigate to="type" replace />} />
        <Route path="type" element={<TypeStudy />} />
        <Route path="color" element={<ColorStudy />} />
        <Route path="logo" element={<LogoStudy />} />
      </Route>
    </Routes>
  )
}
