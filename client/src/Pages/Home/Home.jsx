import React from 'react'
import Banner from '../../Components/Banner/Banner'
import Card from '../../Components/Card/Card'
import About from '../../Components/About/About'
import AboutTablet from '../../Components/AboutTablet/AboutTablet'
import Multi_Vitamins from '../../Components/Multi_Vitamins/Multi_Vitamins'
import IntroductionProduct from '../../Components/IntroductionProduct/IntroductionProduct'
import FAQ from '../../Components/FAQ/FAQ'
import Contact from '../../Components/Contact/Contact'

function Home() {
  return (
    <>
      <Banner />
      <Card />
      <About />
      <AboutTablet />
      <Multi_Vitamins />
      <IntroductionProduct />
      <FAQ />
      <Contact />
    </>
  )
}

export default Home
