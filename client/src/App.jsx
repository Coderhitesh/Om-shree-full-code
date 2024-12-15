import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import ContactPage from './Pages/ContactPage/ContactPage'
import Blog from './Pages/Blog/Blog'
import UserDetail from './Pages/UserDetail/UserDetail'
import Gallery from './Pages/Gallery/Gallery'
import AboutPage from './Pages/AboutPage/AboutPage'
import Certificate from './Pages/Certificate/Certificate'
import Privacy from './Pages/Privacy/Privacy'
import Refund from './Pages/Refund/Refund'
import Return from './Pages/Return/Return'
import Shipping from './Pages/Shipping/Shipping'
import Term from './Pages/Term/Term'
import Product from './Pages/Product/Product'
import OurTeam from './Pages/OurTeam/OurTeam'
import Auth from './Components/Auth/Auth'
import Register from './Components/Auth/Register'
import NotFound from './Pages/NotFound/NotFound'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Cart from './Components/Cart/Cart'
import UserProfile from './Pages/Profile/UserProfile'
import Successfull from './Pages/Successfull/Successfull'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/user-detail" element={<UserDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/veda-vita-multi-vitamins-tablet" element={<Product />} />
          <Route path="/our-certification" element={<Certificate />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/refund-and-cancellation-policy" element={<Refund />} />
          <Route path="/return" element={<Return />} />
          <Route path="/shipping-policy" element={<Shipping />} />
          <Route path="/terms-conditions" element={<Term />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/successfull-payment" element={<Successfull />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
