import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import axios from 'axios'

function Refund() {
  const [privacy, setPrivacy] = useState([])
  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/v1/policies/all')
      const allData = data.data
      const filterData = allData.filter(item => item.typeOfPolicy === 'Refund and Cancellation Policy')
      setPrivacy(filterData[0])
    } catch (error) {
      console.log("Internal server error in fetching data", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <>
     <Breadcrumb title={privacy.Heading} /> 
     <div className="container my-3">
     <div
          className="policy-content"
          dangerouslySetInnerHTML={{ __html: privacy.HtmlContent }}
        />
        {/* <h2>No refund no return</h2>
        <p>There is no return and exchange of the product once sold
        Additionally, there is no cash on delivery.</p> */}
     </div>
    </>
  )
}

export default Refund
