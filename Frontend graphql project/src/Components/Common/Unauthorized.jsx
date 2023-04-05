import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router'

function Unauthorized() {

    const navigate = useNavigate();

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-main-color'>
        <div className='text-3xl sm:text-7xl'>
            <FontAwesomeIcon className='text-red-700 ' icon={faExclamationTriangle}/> <span>UnAuthorized</span>
        </div>
        <p className='mt-4 font-bold'>Please Login First <button className='text-main-heading mt-2 font-bold text-xl border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500' onClick={()=> navigate('/login')}>Login</button> </p>
    </div>
  )
}

export default Unauthorized