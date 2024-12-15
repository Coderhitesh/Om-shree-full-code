import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import axios from 'axios'

function Shipping() {
  const [privacy, setPrivacy] = useState([])
  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/v1/policies/all')
      const allData = data.data
      const filterData = allData.filter(item => item.typeOfPolicy === 'Shipping Policy')
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
        {/* <p>There will be no delivery fees, or free shipment. Additionally, it will not be refundable or replacement.</p>
        <p>Orders will be shipped and delivered within 7-14 wokring days</p> */}
     </div>
    </>
  )
}

export default Shipping
