import React from 'react'
import './contact.css'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Contact from '../../Components/Contact/Contact'

function ContactPage() {
  return (
    <>
      <Breadcrumb title={'Contact'} />
      <Contact />
      <div className="container my-3">
        <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56103.82327577664!2d77.2320065216797!3d28.494933300000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce6df4ec62341%3A0x56b15cab919dfdfb!2sSecure%20Enterprises%20Badarpur!5e0!3m2!1sen!2sin!4v1732999519395!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  )
}

export default ContactPage
