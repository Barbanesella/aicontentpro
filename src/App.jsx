import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import LogoBar from './sections/LogoBar.jsx'
import BrandVoice from './sections/BrandVoice.jsx'
import Demo from './sections/Demo.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import ROI from './sections/ROI.jsx'
import Pricing from './sections/Pricing.jsx'
import Footer from './components/Footer.jsx'
import Signup from './pages/Signup.jsx'

function Router() {
  const path = window.location.pathname
  if (path === '/signup' || path === '/login') return <Signup />
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoBar />
        <BrandVoice />
        <Demo />
        <HowItWorks />
        <ROI />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return <Router />
}
