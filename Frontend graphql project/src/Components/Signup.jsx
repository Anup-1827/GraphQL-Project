import React, { useRef, useState } from 'react'
import Header from './Header'

function Signup() {
    const [formData, setFormData] = useState({"email":"", "password":"", "confirmPassword":""})

    const errorMessageRef= useRef(null)

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(formData.password !== formData.confirmPassword ){
            errorMessageRef.current.innerText = "Passwords do not match!!!!";
            errorMessageRef.current.classList.remove('hidden')
        }
    }

    const handleInputChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        errorMessageRef.current.innerText = "";
        errorMessageRef.current.classList.add('hidden')   
        setFormData({...formData, [name]: value})
    }


  return (
        <main className='w-full h-full'>
            <Header/>
        <form onSubmit={handleSubmit} className='h-[93%] flex flex-col gap-4 justify-center items-center bg-main-color'>
            <h1 className='text-main-heading font-bold text-center text-3xl sm:text-5xl mb-6'>Create Your Account</h1>
            <div className='flex justify-center px-5 w-full'>
                <label htmlFor="newUserEmail" className='w-full text-center text-main-heading font-bold text-2xl cursor-pointer'>Email
                <br/>
                <input id="newUserEmail" type='email' onChange={handleInputChange} name="email" placeholder='Email' className='bg-transparent text-center w-full sm:w-[540px]' required/>
                </label>
            </div>

            <div  className='flex justify-center px-5 w-full'>
                <label htmlFor="newUserPassword" className='w-full text-center text-main-heading font-bold text-2xl cursor-pointer'>Password
                <br/> 
                <input id="newUserPassword" type='password' onChange={handleInputChange} name="password" placeholder='Password' className='bg-transparent text-center w-full sm:w-[540px]' required/>
                </label>    
            </div>

            <div  className='flex justify-center px-5 w-full'>
                <label htmlFor="newUserConfirmPassword" className='w-full text-center text-main-heading font-bold text-2xl cursor-pointer'>Confirm Password
                <br/> 
                <input id="newUserConfirmPassword" type='password' onChange={handleInputChange} name="confirmPassword" placeholder='Password' className='bg-transparent text-center w-full sm:w-[540px]' required/>
                </label>    
            </div>

            <div ref={errorMessageRef} className='text-red-600 font-bold'>

            </div>

            <button type='submit' className='text-main-heading mt-2 font-bold text-xl border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500'>
                Sign Up
            </button>

            <div >
                <h1>Already have an account? <span className='text-blue-900 font-bold cursor-pointer'>Login</span></h1>
            </div>
        </form>
        </main>
  )
}

export default Signup