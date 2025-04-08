import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';


export default function Registrationsummary() {
  const Router=useRouter();
  const {firstname,lastname,avatar,permissions,company_email}=Router.query

  const [newImage,setNewImage]=useState(avatar)
  const [newImageFile,setNewImageFile]=useState(null)
  const [profileimage,setProfileimage]=useState(null)
  const [firstnameedit,setFirstnameedit]=useState(firstname)
  const [lastnameedit,setLastnameedit]=useState(lastname)
  const [nameseditbool,setNameseditbool]=useState(true)
  const [permissionsstate,setPermissionsstate]=useState(true)
  const [permissionsvalue,setPermissionsvalue]=useState(permissions)
  const optionslist= [
    'Administration',
    'Human Resources',
    'Finance & Accounting',
    'Project Management',
    'QA & Testing',
    'Technical Support',
    'Network & Infrastructure',
    'Software Development',
  ];


  const Finishsetup=async()=>{
    const dataURL = avatar; // example data URL
    const filename = 'avatar.png'; // example file name

    var filegenerated=''
    if(avatar.includes('@')===false && avatar!=='/avatarshade.png'){
      const result = await fetch(dataURL);
      const myblob = await result.blob()

    var filegenerated = new File([myblob], filename, { type: 'image/png' });
    }else{
      setNewImageFile(avatar)
      console.log('args')
    }
    
    const formdata=new FormData()
    formdata.append('firstname', firstnameedit);
    formdata.append('lastname', lastnameedit);
    formdata.append('company_email', company_email);
    formdata.append('permissionsvalue', permissionsvalue);
    formdata.append('companyid', (Math.floor(Math.random() * 1000000000000)));
    if(newImageFile===null){
    formdata.append('avatar', filegenerated);
    }else if(newImageFile!==null){
    formdata.append('avatar', newImageFile);
    }
    axios.post('/api/controllers/register/avatarupdate', formdata, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
    .then((response)=>{
      // setProfileimage(response.data)
      // console.log(response.data)
      Swal.fire({
        icon:'success',
        title:'Details saved',
        timer:'1000',
        timerProgressBar:true,
      })
      Router.push({pathname:'/login'})
    })
    .catch(((e)=>{
      console.log('an error occured')
      Swal.fire({
        icon:'error',
        title:'An error occurred',
        timer:'3000',
        timerProgressBar:true,
      })
    }))
  }

  return (
    <div className='container flex flex-col items-center md:h-screen lg:h-screen'>
      <h2 className='text-grayshade2 my-8 text-xl -translate-x-24  md:-translate-x-64 lg:-translate-x-96 ml-10'>We'er almost done</h2>


          <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center relative -translate-x-28 md:translate-x-24 lg:-translate-x-6'>
          <input 
            onChange={((e)=>{
              setNewImageFile(e.target.files[0])
              {e.target.files.length>0?
              setNewImage(URL.createObjectURL(e.target.files[0]))
              :
              ''}
            })} 
            type='file' 
            className='hidden'
             id='fileavatar'
              />

            {newImage===avatar?
              <label htmlFor='fileavatar'>
              <div className='w-24 h-24 rounded-full overflow-hidden mx-10 relative flex flex-row' style={{width:100,height:100}}>
              <Image
              src={newImage}
              width={100} 
              height={100}
              alt='avatar image'
              className='w-full h-full object-cover hover:scale-110 duration-300 ease-in-out cursor-pointer'
              />
          </div>
          </label>

              :
              <label htmlFor='fileavatar'>
              <div className='w-24 h-24 rounded-full overflow-hidden mx-10 relative flex flex-row' style={{width:100,height:100}}>
              <Image
              src={newImage} 
              width={100} 
              height={100}
              alt='avatar image'
              className='w-full h-full object-cover hover:scale-110 duration-300 ease-in-out cursor-pointer'
              />
              </div>
              </label>
              }
              <label htmlFor='fileavatar'>
              <p className='font-bold
               absolute translate-x-20  md:-translate-x-10 lg:-translate-x-20 -translate-y-16
                hover:bg-black hover:text-white
                 hover:scale-110 rounded-lg px-3 py-2
                 transition-all cursor-pointer
                  duration-300 text-sm
                   ease-in-out'>Edit
                  </p>
              </label>

              <input
              className='font-bold 
              text-3xl md:1/2 lg:w-1/5
              translate-x-32
              my-4 md:my-0 lg:my-0  
              md:-translate-x-0 lg:-translate-x-20 overflow-hidden
              placeholder:font-bold
               placeholder:text-black'
              onChange={((e)=>setFirstnameedit(e.target.value))}
              placeholder={firstname}
              readOnly={nameseditbool}
              />
              
              <input
              className='
              font-bold text-3xl md:1/5 lg:w-1/4
              translate-x-28 -translate-y-6 md:-translate-y-0 lg:-translate-y-0
              my-4 md:my-0 lg:my-0  
               md:ml-0 lg:ml-0  
              md:-translate-x-2 lg:-translate-x-32
              ml-10
              placeholder:font-bold 
              placeholder:text-black'
              onChange={((e)=>setLastnameedit(e.target.value))}
              placeholder={lastname}
              readOnly={nameseditbool}
              />
              <span className='md:-translate-x-40 lg:-translate-x-40 font-bold text-3xl hidden md:hidden lg:block'>,</span>
              {nameseditbool===true?
              <button
              onClick={(()=>setNameseditbool(!nameseditbool))}
               className='font-bold
               -translate-y-40 
                translate-x-48 md:-translate-x-44 lg:-translate-x-44
                md:-translate-y-10 lg:translate-y-0
                hover:bg-black hover:text-white
                 hover:scale-110 rounded-lg px-3 py-2
                 transition-all cursor-pointer
                  duration-300 text-sm
                   ease-in-out'>Edit
              </button>
              :
              <button
              onClick={(()=>setNameseditbool(!nameseditbool))}
               className='font-bold
               -translate-y-40 
                translate-x-48 md:-translate-x-44 lg:-translate-x-44
                md:-translate-y-10 lg:translate-y-0
                hover:bg-black hover:text-white
                 hover:scale-110 rounded-lg px-3 py-2
                 transition-all cursor-pointer
                  duration-300 text-sm
                   ease-in-out'>Save
                  </button>
              }

        </div>

        <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center -translate-x-16 md:-translate-x-24 lg:w-1/2 lg:-translate-x-36  -translate-y-16 md:-translate-y-0  lg:-translate-y-0'>
        <h2 className='text-grayshade2 my-8 text-xl  lg:ml-10'>You'll be working in: </h2>
        
        <select 
        disabled={permissionsstate}
        onChange={((e)=>setPermissionsvalue(e.target.value))}
        id='permission'
        className='appearance-none
         px-4 border
          border-solid 
          h-12 border-grayshade3
          translate-x-5 md:translate-x-28 lg:-translate-x-0
           rounded-lg'>
          <option selected disabled className='font-bold hidden'>{permissionsvalue}</option>
          {optionslist.map((items,index)=>
            <option key={optionslist[index]}>{items}</option>
          )}

        </select>


        {permissionsstate===true?
        <button
        onClick={()=>setPermissionsstate(!permissionsstate)}
        className='font-bold
      hover:bg-black hover:text-white
        hover:scale-110 rounded-lg px-3 py-2
        transition-all cursor-pointer
        duration-300 text-sm z-1
        -translate-y-12 md:translate-y-0 lg:-translate-y-0
        translate-x-40 md:translate-x-48 lg:-translate-x-0
          ease-in-out'>Edit
        </button>

        :
        <button
        onClick={()=>setPermissionsstate(!permissionsstate)}
        className='font-bold
      hover:bg-black hover:text-white
        hover:scale-110 rounded-lg px-3 py-2
        transition-all cursor-pointer
        duration-300 text-sm z-1
        -translate-y-12 md:translate-y-0 lg:-translate-y-0
        translate-x-40 md:translate-x-48 lg:-translate-x-0
          ease-in-out'>Save
        </button>
        }
        
        </div>

        <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center md:mr-16 lg:ml-0 lg:w-1/2 -translate-x-10 md:-translate-x-0 lg:-translate-x-36 -translate-y-20 md:-translate-y-0 lg:-translate-y-0'>

        <div className='flex flex-col'>
        <h2 className='text-grayshade2 my-8 text-xl  ml-10'>Your prescribed roles will be:</h2>
        
        <div className='flex flex-row my-2'>
          <Image 
            src={'/ellipse1.png'} 
            alt='ellipse1'
            width={10}
            height={10}
            className='mx-10 object-contain'   
            />
            <p className='text-grayshade2'>Mobile UI</p>
        </div>

        <div className='flex flex-row my-2'>
          <Image 
            src={'/ellipse1.png'} 
            alt='ellipse1'
            width={10}
            height={10}
            className='mx-10 object-contain'   
            />
            <p className='text-grayshade2'>Mobile dev</p>
        </div>

        <Image
        className="
         object-cover 
         lg:mt-0
         md:mt-0
         mt-5
         cursor-pointer 
         hover:scale-110 
         transition 
        lg:translate-x-10
        lg:translate-y-20
        md:translate-x-9
        md:translate-y-20
        translate-x-10
        translate-y-56
         duration-300"
        src={'/softblack 1.png'}
        width={200}
        height={200}
        alt="Softmasters Comapany Limited"
        onClick={()=>window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB}
        /> 

        </div>

        <div className='flex flex-col -translate-y-12 md:translate-y-3 lg:translate-y-3 -translate-x-24 md:translate-x-0 lg:translate-x-0'>

        <h2 className='text-grayshade2 my-8 -translate-y-5  translate-x-40 text-xl'>Your Clearance level:</h2>

        <div className='flex flex-row my-2 -translate-y-5 translate-x-32'>
          <Image 
            src={'/ellipse1.png'} 
            alt='ellipse1'
            width={10}
            height={10}
            className='mx-10 object-contain'   
            />
            <p className='text-grayshade2'>B42  You have medum Level Access</p>

            
        </div>

        <button 
        onClick={Finishsetup}
              className="bg-darkshade hover:scale-110 
              transition-all duration-300 ease-in-out
               text-white p-4 rounded-lg w-3/4  md:w-3/4
               translate-x-40 translate-y-4
               md:translate-x-40 md:translate-y-24
               lg:translate-x-60 lg:translate-y-2
               text-center flex flex-row justify-center">
              Finish
              <span className='mx-2'>
             
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>

              </span>
        </button>

        </div>

        </div>


      
    </div>
  )
}
