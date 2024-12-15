import React from 'react'
import './breadcrumbs.css'

function Breadcrumb({title}) {
  return (
    <div className="breadcrumbs">
        <h2>Home / {title}</h2>
      </div>
  )
}

export default Breadcrumb
