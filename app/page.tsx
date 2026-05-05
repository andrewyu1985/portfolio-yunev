import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
