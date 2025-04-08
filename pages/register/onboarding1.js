import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

export default function Onboarding1() {
    const Router=useRouter();
    const {firstname,lastname,company_email}=Router.query

    const avatarpagefunc=()=>{
        Router.push({pathname:'/register/avatar',query:{firstname:firstname,lastname:lastname,company_email:company_email}})
    }

  return (
    <div className='container mx-3 flex h-screen items-center justify-center'>
      

      <div className='my-8'>
        <p className='text-grayshade2 translate-x-2 md:translate-x-6 lg:-translate-x-6 '>Welcome</p>
        <h2 className='text-4xl my-2 translate-x-2 md:translate-x-6  lg:-translate-x-6'>{firstname},</h2>
        <p className='text-grayshade2 translate-x-2 md:translate-x-6  w-4/5 md:w-3/5 lg:w-3/5 tracking-wide my-3  lg:-translate-x-6'>
            Please take a few moments to setup your workspace.
        </p>

        <section className='mb-24 mt-28 flex lg:flex-row items-center md:flex-col'>

        <button onClick={avatarpagefunc}
              className="bg-darkshade hover:scale-110 
              transition-all duration-300 ease-in-out
               text-white p-4 rounded-lg  md:w-3/4
               translate-x-2
               md:-translate-x-7
               lg:-translate-x-6 translate-y-16
               text-center flex flex-row justify-center">
              Continue
              <span className='mx-2'>
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>

              </span>
        </button>

            <section className='lg:mx-7 flex flex-row translate-x-16 md:translate-y-4 md:-translate-x-10'>
            <Image 
            className='object-contain transform translate-y-16 ml-1 w-full'
            src={'/ellipse1.png'} 
            width={25} height={25}
            />
            <Image 
            className='object-contain transform translate-y-16 ml-1 w-full'
            src={'/ellipse2.png'} 
            width={20} height={20}
            />
            <Image 
            className='object-contain transform translate-y-16 ml-1 w-full'
            src={'/ellipse3.png'} 
            width={20} height={20}
            />
            <Image 
            className='object-contain transform translate-y-16 ml-1 w-full'
            src={'/ellipse4.png'} 
            width={20} height={20}
            />
            <Image 
            className='object-contain transform translate-y-16 ml-1 w-full'
            src={'/ellipse5.png'} 
            width={20} height={20}
            />
            </section>

        </section>

        <Image
        className="
         object-cover 
         cursor-pointer 
         hover:scale-110 
         transition 
        lg:-translate-x-6
        md:translate-x-7
        md:translate-y-6
        translate-x-2
         duration-300"
        src={'/softblack 1.png'}
        width={200}
        height={200}
        alt="Softmasters Comapany Limited"
        onClick={()=>window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB}
        /> 

      </div>

      <div className=''>
        <Image src={'/christina-wocintechchat-com-zFd1L-XtrTE-unsplash 1.png'}
        width={400}
        height={400}
        className='
        object-cover
        rounded-full 
        mx-1 hover:scale-110
        transition-all
        md:-translate-x-10
        -translate-x-8
        duration-300
        cursor-pointer'
        />
      </div>


    </div>
  )
}
