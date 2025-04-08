import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'


export default function Avatar() {
  const avataricon='/avatarshade.png'
  const [avatar,setAvatar]=useState(avataricon)
  const [avatarfile,setAvatarfile]=useState(avataricon)
  const [dataUrl, setDataUrl] = useState('');

  const Router=useRouter();
  const {firstname,lastname,company_email}=Router.query

  async function skippable(){
    Router.push({pathname:'/register/departments',query:{firstname:firstname,lastname:lastname,avatar:avataricon,company_email:company_email}})

  }

  async function departmentfunc(){

    try{
      const dataUrls = await convertFileToDataURL(avatarfile);
      setDataUrl(dataUrls);

      function convertFileToDataURL(avatarfile) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(avatarfile);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

    Router.push({pathname:'/register/departments',query:{firstname:firstname,lastname:lastname,avatar:dataUrls,company_email:company_email}})
      
    }

  catch{(e)=>
    Swal.fire({
      icon:'error',
      title:'An erorr occured',
      text:'Please select an image or try again later',
      timer:2000,
      timerProgressBar:true,
    })
    console.log('an error ocurred')
  }

  }

  return (
    <div className='container mx-2 flex h-screen justify-center items-center my-12'>
        
        <div className='lg:w-1/2 -translate-y-20 translate-x-40 md:-translate-x-20 md:-translate-y-16 lg:translate-x-20 lg:-translate-y-12'>
            
            <input 
            onChange={((e)=>{
              setAvatarfile(e.target.files[0])
              {e.target.files.length>0?
              setAvatar(URL.createObjectURL(e.target.files[0]))
              :
              ''}
            })} 
            type='file' 
            className='hidden'
             id='fileavatar'
              />
            
            <label htmlFor='fileavatar'>
              {avatar===avataricon?
              <div className='rounded-full' style={{width:200,height:200}}>
              <Image
              src={avatar} 
              width={200} 
              height={200}
              alt='avatar image'
              className='mx-10 object-contain hover:scale-110 duration-300 ease-in-out cursor-pointer'
              />
          </div>

              :
              <div className='w-24 h-24 rounded-full overflow-hidden mx-10' style={{width:200,height:200}}>
              <Image
              src={avatar} 
              width={200} 
              height={200}
              alt='avatar image'
              className='w-full h-full object-cover hover:scale-110 duration-300 ease-in-out cursor-pointer'
              />
              </div>
              }
            

            </label>
              
            <label htmlFor='fileavatar' className="bg-darkshade hover:scale-110 
              transition-all duration-300 ease-in-out
               text-white p-4 rounded-lg  
               translate-x-12 cursor-pointer
               md:translate-x-10 lg:w-1/2
               lg:-translate-x-2 translate-y-8
               text-center flex flex-row justify-center">

            <span className='mx-2'>
             
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
           </svg>
             </span>

              Select
              
        </label>
            
        </div>

        <div className='lg:w-1/2 mr-44 lg:mx-0 md:mx-0'>
            <p className='text-grayshade2'>
                Choose your <span className='text-4xl
                 font-bold text-black block my-2'>Avatar</span></p>
                 
            <p className='text-grayshade2 my-2'>Please choose your avatar</p>

            <section className='w-full flex flex-row items-center my-56 md:44 lg:my-44 translate-y-32 md:translate-y-0 lg:translate-y-0'>

            <button 
            onClick={skippable}
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out p-4 
            rounded-lg border-2 text-center w-full md:w-1/3 lg:w-1/3">
              Skip for now
              <span className='mx-2'>

              </span>
        </button>


            <button 
            onClick={departmentfunc}
            className="flex flex-row text-bold p-4 rounded-lg 
            border-2 justify-center w-1/2 md:w-1/3 lg:w-1/3 text-white
            hover:transition-all hover:scale-110 duration-300 ease-in-out
              bg-grayshade3 mx-3">
              Continue
              <span className='mx-2'>
             
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            
            <section className='flex flex-row justify-evenly translate-y-16 -translate-x-16 md:translate-x-0 lg:translate-x-0 md:translate-y-0 lg:translate-y-0'>
            
            <Image 
            src={'/ellipse2.png'} 
            alt='ellipse2'
            width={10}
            height={10}
            className='mx-1 object-contain'
            />

            <Image 
            src={'/ellipse1.png'} 
            alt='ellipse1'
            width={20}
            height={20}
            className='mx-1 object-contain'
            
            />

            <Image 
            src={'/ellipse3.png'} 
            alt='ellipse2'
            width={10}
            height={10}
            className='mx-1 object-contain'

            />

            <Image 
            src={'/ellipse2.png'} 
            alt='ellipse4'
            width={10}
            height={10}
            className='mx-1 object-contain'

            />

            <Image 
            src={'/ellipse2.png'} 
            alt='ellipse5'
            width={10}
            height={10}
            className='mx-1 object-contain'

            />

            </section>

            </section>

            
        </div>
      
    </div>
  )
}
