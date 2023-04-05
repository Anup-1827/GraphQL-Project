import React, { useRef, useState } from 'react'
import Header from './Header'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/UserMutation';
import { useNavigate } from 'react-router';

function Login() {
    const fields = {
        "email":"", 
        "password":""
    }
    const [formDataLogin, setFormDataLogin] = useState(fields);
    const navigate= useNavigate();

    const errorMessageLoginRef= useRef(null);

    const [login] = useMutation(LOGIN_USER,{
      variables:{
        ...formDataLogin
      },
      onCompleted(data){
        localStorage.setItem("token", data.loginUser.token);
        navigate('/')
      }
    })

    const handleLogin = (event)=>{
        event.preventDefault();
        errorMessageLoginRef.current.classList.add('hidden')
        login()
        .catch(err=>{
          errorMessageLoginRef.current.classList.remove('hidden')
          errorMessageLoginRef.current.innerText = err.message
        });

    }

    const handleInputChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        errorMessageLoginRef.current.innerText = "";
        errorMessageLoginRef.current.classList.add('hidden')   
        setFormDataLogin({...formDataLogin, [name]: value})
    }


  return (
        <main className='w-full h-full bg-main-color'>
            <Header/>
        <form onSubmit={handleLogin} className=' flex flex-col gap-4 justify-center items-center mt-20 '>
            <h1 className='text-main-heading font-bold text-center text-3xl sm:text-5xl mb-6'>Login</h1>
            <div className='flex justify-center px-5 w-full'>
                <label htmlFor="UserEmail" className='w-full text-center text-main-heading font-bold text-2xl cursor-pointer'>Email
                <br/>
                <input id="UserEmail" type='email' onChange={handleInputChange} name="email" placeholder='Email' className='bg-transparent text-center w-full sm:w-[540px]' required/>
                </label>
            </div>

            <div  className='flex justify-center px-5 w-full'>
                <label htmlFor="UserPassword" className='w-full text-center text-main-heading font-bold text-2xl cursor-pointer'>Password
                <br/> 
                <input id="UserPassword" type='password' onChange={handleInputChange} name="password" placeholder='Password' className='bg-transparent text-center w-full sm:w-[540px]' required/>
                </label>    
            </div>

            <div ref={errorMessageLoginRef} className='text-red-600 font-bold'>

            </div>

            <button type='submit' className='text-main-heading mt-2 font-bold text-xl border border-main-heading rounded p-2 hover:bg-main-heading hover:text-main-color transition ease-linear duration-500'>
                Login
            </button>
        </form>
        </main>
  )
}

export default Login