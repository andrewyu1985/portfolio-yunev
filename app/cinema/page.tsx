import Smooth from '@/components/cinema/Smooth'
import Nav from '@/components/cinema/Nav'
import DesignBar from '@/components/cinema/DesignBar'
import Hero from '@/components/cinema/Hero'
import Manifesto from '@/components/cinema/Manifesto'
import Strip from '@/components/cinema/Strip'
import Featured from '@/components/cinema/Featured'
import Facts from '@/components/cinema/Facts'
import About from '@/components/cinema/About'
import Archive from '@/components/cinema/Archive'
import Footer from '@/components/cinema/Footer'

export default function CinemaHome() {
  return (
    <>
      <Smooth />
      <DesignBar />
      <Nav />
      <main id="top">
        <Hero />
        <Manifesto />
        <Strip />
        <Featured />
        <Facts />
        <About />
        <Archive />
      </main>
      <Footer />
    </>
  )
}
