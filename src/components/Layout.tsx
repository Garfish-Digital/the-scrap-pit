import { Outlet } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
