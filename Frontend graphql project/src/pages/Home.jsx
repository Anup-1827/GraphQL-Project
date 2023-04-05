import React from 'react'
import Clients from '../Components/Clients'
import Unauthorized from '../Components/Common/Unauthorized'

function Home() {
  const token = localStorage.getItem("token")
  return (
    <>
    {
      token?
      <Clients/>
      :
      <Unauthorized/>
    }
    </>
  )
}

export default Home