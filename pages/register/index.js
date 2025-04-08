import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React,{useState} from 'react'
import Swal from 'sweetalert2'



export default function Register() {

  const Router = useRouter()
  
  const sendresults=(e)=>{

    e.preventDefault()
    if(firstname!=='' && lastname!=='' 
    && company_email!=='' 
    && company_phone!==''
    && company_password!=='' 
    && company_confirm_password!==''){
      if(company_password===company_confirm_password){
        setLoading('block')
        const values={
          firstname:firstname,
          lastname:lastname,
          company_email:company_email,
          company_phone:company_phone,
          company_password:company_password,
          company_confirm_password:company_confirm_password,
        }
        axios.post('/api/controllers/register',values)
        .then((response)=>{
          setLoading('hidden')
          if(response.data.message){
            Swal.fire({
              icon:'success',
              title:'Details submitted successfully',
              text:`${response.data.message}`,
              timer:3000,
              timerProgressBar:true,
              showConfirmButton:false,
              showCloseButton:false,
              showCancelButton:false,
            })
        Router.push({pathname:'/register/onboarding1',query:{firstname:firstname,lastname:lastname,company_email:company_email}})

          }
          else{
            Swal.fire({
              icon:'error',
              title:'An error occured',
              timer:3000,
              timerProgressBar:true,
              showConfirmButton:false,
              showCloseButton:false,
              showCancelButton:false,
            })
          }
        }).catch(()=>{
          setLoading('hidden')
          Swal.fire({
            icon:'error',
            title:'A Server error occured',
            text:'Please try again later',
            timer:1000,
            timerProgressBar:true,
            showConfirmButton:false,
            showCloseButton:false,
            showCancelButton:false,
          })
        })


      }else if(company_password!==company_confirm_password){
        Swal.fire({
          icon:'warning',
          title:'Passwords do not match',
          timer:3000,
          timerProgressBar:true,
          showConfirmButton:false,
          showCloseButton:false,
          showCancelButton:false,
        })
      }

  }
  else{
    setOff('block')
  }

  }
  
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

  function passwordshow2func(){
    const passwordinput2=document.getElementById('password2')
    if(passwordinput2.type==='text'){
      passwordinput2.type = 'password';
      setPasswordshow1('password')
    }else if(passwordinput2.type==='password'){
      passwordinput2.type = 'text';
      setPasswordshow1('text')

    }
  }

  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [company_email,setCompany_Email]=useState('');
  const [company_password,setCompany_Password]=useState('');
  const [company_confirm_password,setCompany_Confirm_Password]=useState('');
  const [company_phone,setCompany_phone]=useState('');
  const [off,setOff]=useState('none')
  const [passwordshow1,setPasswordshow1]=useState('password')
  const [passwordshow,setPasswordshow]=useState('password')
  const [loading,setLoading]=useState('hidden')
  return (
    <main
    className="container flex justify-center items-center mt-8 lg:mt-28 mx-2 h-screen">

        <div className={`flex flex-row justify-between absolute w-1/4 ${loading} z-10 -translate-y-24`}>
          
          <div className='w-10 h-10 bg-black animate-bounce'></div>
          <div className='w-10 h-10 bg-black animate-spin'></div>
          <div className='w-10 h-10 bg-black animate-bounce'></div>

        </div>
        <form>

        <Image
        className="m-auto
         object-cover 
         cursor-pointer 
         hover:scale-110 "
        src={'/softblack 1.png'}
        width={200}
        height={200}
        alt="Softmasters Comapany Limited"
        
        onClick={()=>window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB}
        /> 

        <section className="mt-6 translate-y-0 md:translate-y-0 lg:-translate-y-5">
          <h2 className="text-center text-2xl font-bold mb-2">Register</h2>
          <p className="text-center ">Create An Account On Your Company Network</p>
          <p style={{display:off}} className=' transition-all 
          duration-300
          text-center
          bg-red-500
          text-white
          w-11/12
          p-4 md:p-4 lg:p-2 text-xl'>
            
            <span onClick={()=>setOff('none')}>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            
            </svg>

            </span>

            All fields are required
          </p>

          <section className='flex flex-col my-2 '>

            <div className="flex flex-wrap lg:flex-no-wrap">
              
              <div className="w-full lg:w-auto lg:mr-4 mb-2">

                <label>
                    Firstname
                </label>

                <input
                 type="text" 
                placeholder='Firstname' 
                className="
                w-10/12 
                border 
                border-grayshade
                 focus:border-grayshade
                  outline-none  
                  p-4 md:p-4 lg:p-2 
                  rounded-lg"
                  value={firstname}
                  onChange={((e)=>setFirstname(e.target.value))}
                  />
                {firstname===''?
                <p style={{display:off}} className='text-center text-red-500'>
                  Firstname cannot be left empty
                </p>
                :''}

              </div>

              <div className="w-full lg:w-auto">

                <label>
                    Lastname
                </label>

                <input type="text" 
                placeholder='Lastname'
                className="
                w-10/12 
                border-grayshade
                 focus:border-grayshade
                  outline-none 
                   p-4 md:p-4 lg:p-2 
                   border
                    rounded-lg"
                    required
                    value={lastname}
                    onChange={((e)=>setLastname(e.target.value))}
                    />
                    {lastname===''?
                <p style={{display:off}} className='text-center text-red-500'>
                  Lastname is cannot be left empty
                </p>
                :''}
              </div>
            </div>
            
            <section className='flex flex-col my-1 translate-y-0 md:translate-y-0 lg:-translate-y-2'>

                <label>
                    Company Email
                </label>

                <input 
                className='my-2 
                border 
                border-grayshade
                 focus:border-grayshade
                  outline-none 
                  p-4 md:p-4 lg:p-2 
                  w-11/12
                  rounded-lg' 
                  required
                placeholder='Company Email'
                value={company_email}
                onChange={((e)=>setCompany_Email(e.target.value))}
                />
                {company_email===''?
                <p style={{display:off}} className='text-center text-red-500'>
                  Company Email field is cannot be left empty
                </p>
                :''}

            </section>

            <section className='flex flex-col my-1 translate-y-0 md:translate-y-0 lg:-translate-y-4'>

                <label>
                    Phone number
                </label>

                <input 
                className='my-2 
                border
                border-grayshade
                 focus:border-grayshade
                  outline-none 
                  p-4 md:p-4 lg:p-2 
                  w-11/12
                  translate-y-0 md:translate-y-0 lg:-translate-y-2
                  rounded-lg' 
                  required
                placeholder='Phone number'
                value={company_phone}
                onChange={((e)=>setCompany_phone(e.target.value))}
                />
                {company_phone===''?
                <p style={{display:off}} className='text-center text-red-500'>
                  Company Phone field is cannot be left empty
                </p>
                :''}

            </section>

            <section className='flex flex-col my-2 translate-y-0 md:translate-y-0 lg:-translate-y-8'>
                <label>
                    Password
                </label>

                <div className='flex flex-row'>
                <input 
                className='my-2 border
                border-grayshade
                focus:border-grayshade 
                position:relative
                outline-none p-4 md:p-4 lg:p-2 
                w-full md:w-11/12 lg:w-11/12
                translate-y-0 md:translate-y-0 lg:-translate-y-2
                rounded-lg'
                id='password1' 
                required
                placeholder='Password'
                value={company_password}
                type={passwordshow}
                onChange={((e)=>setCompany_Password(e.target.value))}
                />
                
                <span onClick={passwordshow1func} className='position:absolute mx-0 -translate-x-10 translate-y-6 md:translate-y-0 lg:translate-y-2 cursor-pointer'>
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
                
                {company_password===''?
                <p style={{display:off}} className='text-center text-red-500'>
                  Password field is cannot be left empty
                </p>
                :''}

            </section>

            <section className='flex flex-col my-2 md:my-0 lg:my-5 translate-y-0 md:translate-y-0 lg:-translate-y-16'>
                <label>
                    Confirm Password
                </label>

                <div className='flex flex-row'>

                <input 
                className='my-2 border
                border-grayshade
                focus:border-grayshade 
                outline-none p-4 md:p-4 lg:p-2 
                w-full md:w-11/12 lg:w-11/12
                translate-y-0 md:translate-y-0 lg:-translate-y-2
                rounded-lg' 
                type={passwordshow1}
                id='password2'
                required
                placeholder='Confirm Password'
                value={company_confirm_password}
                onChange={((e)=>setCompany_Confirm_Password(e.target.value))}
                />

                

                <span onClick={passwordshow2func} className='position:absolute mx-0 -translate-x-10 translate-y-6 md:translate-y-0 lg:translate-y-2 cursor-pointer'>

                {passwordshow1==='text'?
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

                {company_confirm_password===''?
                <p style={{display:off}} className='text-center text-red-500'>
                  Password confirmation field cannot be left empty
                </p>
                :
                company_confirm_password!==company_password?
                <p style={{display:off}} className='text-center text-red-500'>
                  Password fields must be the same
                </p>
                :
                ''
                }
                

            </section>

            <Link href='#'
             className='text-lg font-bold 
             translate-y-0 md:translate-y-0 lg:-translate-y-24
             text-center underline 
             cursor-pointer'>
                Forgotten Password?
            </Link>

          </section>

          <section className="flex flex-col my-10 ml-4 translate-y-0 md:translate-y-0 lg:-translate-y-12">

            <button onClick={sendresults}
              className="bg-darkshade hover:scale-110 
              transition-all duration-300 ease-in-out
               text-white p-4 md:p-4 lg:p-2 rounded-lg w-full 
               transform -translate-x-4 md:-translate-x-10 lg:-translate-x-10
               translate-y-0 md:translate-y-0 lg:-translate-y-20
               text-center">
              Register
            </button>

            <Link href='/login' className='text-center my-6 translate-y-0 md:translate-y-0 lg:-translate-y-24'>
                Already have an account?
                <span className='font-bold underline'>
                    Sign In
                </span>
                
            </Link>
          </section>


        </section>

        </form>
        
    </main>
  )
}
