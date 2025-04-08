import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React,{useState} from 'react'
import Swal from 'sweetalert2'


export default function Login() {
  const [testing,setTesting]=useState(null)
  const [company_email,setCompany_email]=useState('')
  const [passwordshow,setPasswordshow]=useState('password')
  const [company_password,setCompany_password]=useState('')
  const [loading,setLoading]=useState('hidden')
  const Router=useRouter()

  function passwordshow1func(){
    const passwordinput=document.getElementById('password1')
    if(passwordinput.type==='text'){
      passwordinput.type = 'password';
      setPasswordshow('password')
    }else if(passwordinput.type==='password'){
      passwordinput.type = 'text';
      setPasswordshow('text')

    }
  }

  const login=()=>{
    const emailRegex = /\S+@\S+\.\S+/;
    if(emailRegex.test(company_email)){
    if(company_email==='' || company_password===''){
      Swal.fire({
        icon:'warning',
        title:'Fields should not be empty',
        timer:2000,
        timerProgressBar:true,
        showConfirmButton:false,
      })
    }else{
    setLoading('block')

    setTimeout(() => {
      
      axios.post('/api/controllers/login',{company_email,company_password})
    .then((response)=>{
      setLoading('hidden')
      setTesting(response.data)
      if(response.data.message){
        Swal.fire({
          icon:'success',
          title:`${response.data.message}`,
          timer:2000,
          timerProgressBar:true,
          showConfirmButton:false,
        })
          Router.push({pathname:'/dashboard',query:response.data.userdata})

      }else{
        
        Swal.fire({
          icon:'warning',
          title:`${response.data.error}`,
          timer:2000,
          timerProgressBar:true,
          showConfirmButton:false,
        })
      }
    })
    .catch(((e)=>{
      setLoading('hidden')
      console.log('an error occured\n')
      console.log(e)
      Swal.fire({
        icon:'error',
        title:'An error occurred',
        timer:2000,
        timerProgressBar:true,
        showConfirmButton:false,
      })
    }))

      
    }, 1000);
    
  }
}else{
  Swal.fire({
    icon:'warning',
    title:'Email not valid',
    timer:2000,
    timerProgressBar:true,
    showConfirmButton:false,
  })
}

    // axios.get('/api/controllers/login')
  }
  return (
    <main
    className="container flex justify-center items-center h-screen">
        
        <div className={`flex flex-row justify-between absolute w-1/4 ${loading}`}>
          
          <div className='w-10 h-10 bg-black animate-bounce'></div>
          <div className='w-10 h-10 bg-black animate-spin'></div>
          <div className='w-10 h-10 bg-black animate-bounce'></div>

        </div>

        <form className="mt-32">

        <Image
        className="m-auto
         object-cover 
         cursor-pointer 
         hover:scale-110 
         transition 
         duration-300"
        src={'/softblack 1.png'}
        width={200}
        height={200}
        alt="Softmasters Comapany Limited"
        
        onClick={()=>window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB}
        /> 

        <section className="mt-6">
          <h2 className="text-center text-2xl font-bold mb-2">Login</h2>
          <p className="text-center ">Create An Account On Your Company Network</p>

          <section className='flex flex-col my-2 '>
            
            <section className='flex flex-col my-1'>

                <label>
                    Company Email
                </label>

                <input 
                className='my-2 
                border 
                border-grayshade
                 focus:border-grayshade
                  outline-none 
                  p-4 
                  w-11/12
                  rounded-lg' 
                  type='email'
                placeholder='Company Email'
                onChange={((e)=>setCompany_email(e.target.value))}
                />

            </section>

            <section className='flex flex-col my-2 3/4'>
                <label>
                    Password
                </label>

              <div className='flex flex-row relative w-full'>
                <input 
                className='my-2 border
                border-grayshade
                focus:border-grayshade 
                outline-none p-4 
                w-full
                rounded-lg' 
                placeholder='Password'
                id='password1'
                type={passwordshow}
                onChange={((e)=>setCompany_password(e.target.value))}
                />

                <span onClick={passwordshow1func} className='position:absolute mx-0 -translate-x-10 translate-y-6 md:translate-y-6 lg:translate-y-6 cursor-pointer'>
                {passwordshow==='text'?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                }

                </span>

                </div>

            </section>

            <Link href='#'
             className='text-lg font-bold 
             text-center underline 
             cursor-pointer'>
                Forgotten Password?
            </Link>

          </section>

          <section className="flex flex-col my-10 ml-4">

            <p
            onClick={login}
              className="bg-darkshade hover:scale-110 
              transition-all duration-300 ease-in-out cursor-pointer
               text-white p-4 rounded-lg w-full 
               text-center">
              Login
            </p>

            <Link href='/register' className='text-center my-6'>
            Don't have an account? 
                <span className='font-bold underline'>
                    Sign up
                </span>
                
            </Link>
          </section>


        </section>

        </form>
        
    </main>
  )
}
