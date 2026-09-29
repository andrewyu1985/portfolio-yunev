import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'
import DesignShell from '@/components/designs/DesignShell'

export default function Home() {
  return (
    <DesignShell>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
      <Footer />
    </DesignShell>
  )
}
