import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Expertise from './components/Expertise'
import DesignSection from './components/DesignSection'
import TransitionMarquee from './components/TransitionMarquee'
import CreativeCode from './components/CreativeCode'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Geospatial from './components/Geospatial'
import Experience from './components/Experience'
import Education from './components/Education'
import Languages from './components/Languages'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <DesignSection />
        <TransitionMarquee />
        <CreativeCode />
        <Projects />
        <Skills />
        <Geospatial />
        <Experience />
        <Education />
        <Languages />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
