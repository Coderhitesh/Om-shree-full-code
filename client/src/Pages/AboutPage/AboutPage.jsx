import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import About from '../../Components/About/About'
import Card from '../../Components/Card/Card'

function AboutPage() {
  return (
    <>
     <Breadcrumb title={'About us'} /> 
     <About />
     <Card />
    </>
  )
}

export default AboutPage
