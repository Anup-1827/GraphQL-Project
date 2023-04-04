import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

function NotFound() {
  return (
    <>
    <div className='w-full h-full'>
        <Header/>
    <div className='w-full h-[89%] bg-main-color flex flex-col gap-4 justify-center flex-wrap items-center'>
        <div className='flex'>
            
        <FontAwesomeIcon className='text-red-700 text-9xl' icon={faExclamationTriangle}/>
        <p className='text-bold text-9xl'>Not Found</p>
        </div>
        <Link to="/">
            <button  className='text-red-700 mt-2 font-bold text-xl border border-red-700 rounded p-2 hover:bg-red-700 hover:text-white transition ease-linear duration-300'>
            Go back
            </button>
        </Link>
    </div>
    </div>
    </>
  )
}

export default NotFound