'use client'

import React,{useRef,useEffect,useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2'
export default function ResheduleAppointment({id,name,phone,empname,purpose}) {
  const [taken,setTaken]=useState('off')
  const [selfie,setSelfie]=useState(null)
  const [shown,setShown]=useState('block')
  const [visitorname,setVisitorname]=useState(name)
  const [visitorphone,setVisitorphone]=useState(phone)
  const [employeename,setEmployeename]=useState(empname)
  const [userlist,setUserlist]=useState(null)
  const [visitordate,setVisitordate]=useState('')
  const [visitortime,setVisitortime]=useState('')
  const [visitorpurpose,setVisitorpurpose]=useState(purpose)


  useEffect(() => {
    axios.get('/api/controllers/register/employeeslist')
    .then((response)=>{
      setUserlist(response.data.user)

    })
  }, [userlist])

  const Senddata=(e)=>{
    e.preventDefault()

    if(visitorname===''||visitorphone===''||
    employeename===''||visitordate===''||visitortime===''||visitorpurpose===''
      ){
        Swal.fire({
          icon:'warning',
          title:'Please leave no fields empty',
          text:'This includes the picture',
          timer:2000,
          timerProgressBar:true,
          showConfirmButton:false,
          showCancelButton:false,
        })
    console.log('An error input is empty')

  }else{
    const formdata= {
    'id':id,
    'name':visitorname,
    'phone':visitorphone,
    'employee':employeename,
    'datetime':new Date(`${visitordate} ${visitortime}`),
    'purpose':visitorpurpose,
    }
    axios.post('/api/controllers/appointments/reshedule',formdata)
    .then((response)=>Swal.fire({
      icon:'success',
      title:'Appointment Rescheduled',
      timer:2000,
      timerProgressBar:true,
      showConfirmButton:false,
      showCloseButton:false,
      showCancelButton:false,

    }))
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


  }


  return (
    
    <div className='container px-5 pt-5 overflow-hidden h-screen '>
      
      <p className='text-center my-1 font-bold text-2xl'>Reschedule Appointment</p>

      
      <form className='mx-auto h-5/6 overflow-auto mt-4' onSubmit={Senddata}>

        <section className='flex flex-col mt-2'>

                <label>
                    Visitor Name
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
                placeholder='Visitor Name'
                value={visitorname}
                onChange={((e)=>setVisitorname(e.target.value))}
                />

            </section>

            <section className='flex flex-col mt-3'>

            <label>
                Visitor Phone Number
            </label>

            <input 
            className='my-2 
            border 
            border-grayshade
            focus:border-grayshade
              outline-none 
              p-4 
              w-11/12 appearance-none
              rounded-lg' 
              type='number'
            placeholder='Visitor Phone Number'
            value={visitorphone}
            onChange={((e)=>setVisitorphone(e.target.value))}
            />

            </section>

            <section className='flex flex-col mt-3'>

            <label>
                Appointment With
            </label>

            <select className='my-2 
            border 
            border-grayshade
            focus:border-grayshade
              outline-none text-lg
              p-4 
              w-11/12
              rounded-lg' 
              placeholder='Employee'
              value={employeename}
            onChange={((e)=>setEmployeename(e.target.value))}
              >
            <option>Select Employee</option>
             {userlist?userlist.map((item)=>
             <option key={item._id}>{item.fullname}</option>):
             <option>Loading...</option>
             }
            </select>
            

            </section>

            <section className='flex flex-row mt-3'>

            <input 
            className='my-2 
            border 
            border-grayshade
            focus:border-grayshade
              outline-none 
              p-4 mr-4
              w-2/4
              rounded-lg' 
              type='date'
            placeholder='Date'
            
            onChange={((e)=>setVisitordate(e.target.value))}

            />

        <input 
            className='my-2 
            border 
            border-grayshade
            focus:border-grayshade
              outline-none 
              p-4 ml-1 mr-8
              w-2/4
              rounded-lg' 
              type='time'
            placeholder='time'

            onChange={((e)=>setVisitortime(e.target.value))}

            />

            </section>

            <section className='flex flex-col mt-3'>

            <label>
                Purpose
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
            placeholder="Purpose of Appointment"
            value={visitorpurpose}

            onChange={((e)=>setVisitorpurpose(e.target.value))}
            />

            </section>

            <button
          className='bg-black rounded-lg 
          p-4 text-white mb-16 mt-4
          justify-between items-center border-2 w-11/12
          transition-all duration-300 hover:bg-gray-300 hover:text-black'>
            Reschedule
          </button>
            

      </form>
    </div>
  );
}
