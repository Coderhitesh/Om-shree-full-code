import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import axios from 'axios'

function Return() {
  const [privacy, setPrivacy] = React.useState([])
  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/api/v1/policies/all')
      const allData = data.data
      const filterData = allData.filter(item => item.typeOfPolicy === 'Return Policy')
      setPrivacy(filterData[0])
    } catch (error) {
      console.log("Internal server error in fetching data", error)
    }
  }

  React.useEffect(() => {
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
        {/* <h2 className=' mb-2'>No refund no return</h2>
        <p className='m-0'>Once the product is sold, it cannot be returned or exchanged.</p>
        <p>Additionally, there is no cash on delivery.</p> */}
      </div>
    </>
  )
}

export default Return
