'use client'

import React,{useRef,useEffect,useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Bookappointment() {
  const [taken,setTaken]=useState('off')
  const [selfie,setSelfie]=useState(null)
  const [shown,setShown]=useState('block')
  const [visitorname,setVisitorname]=useState('')
  const [visitorphone,setVisitorphone]=useState('')
  const [employeename,setEmployeename]=useState('')
  const [visitordate,setVisitordate]=useState('')
  const [visitortime,setVisitortime]=useState('')
  const [visitorpurpose,setVisitorpurpose]=useState('')
  const [userlist,setUserlist]=useState(null)
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    axios.get('/api/controllers/register/employeeslist')
    .then((response)=>{
      setUserlist(response.data.user)

    })
  }, [userlist])

  const accesswebcam=()=>{
    setTaken('off')
  }

  const hideUserCamera= () =>{
    if(shown==='block'){
      setShown('none')
    }else if(shown==='none'){
      setShown('block')
    }

  }
  const getUserCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const Senddata=(e)=>{
    e.preventDefault()

    if(selfie===null ||visitorname===''||visitorphone===''||
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
    const formdata= new FormData()
    formdata.append('name',visitorname)
    formdata.append('phone',visitorphone)
    formdata.append('employee',employeename)
    formdata.append('datetime',new Date(`${visitordate} ${visitortime}`))
    formdata.append('purpose',visitorpurpose)
    formdata.append('selfie',selfie)

    axios.post('/api/controllers/appointments',formdata,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response)=>Swal.fire({
      icon:'success',
      title:'Appointment Booked',
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

  const takeScreenshot = async() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = 220;
    canvas.height = 165;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const screenshotUrl = canvas.toDataURL();

    const result = await fetch(screenshotUrl);
    const myblob = await result.blob()

    var filegenerated = new File([myblob], "visitor's name", { type: 'image/png' });
    setSelfie(filegenerated)

    const screenshotImage = document.createElement('img');
    screenshotImage.src = screenshotUrl;
    setTaken('on')

  };

  useEffect(() => {
    getUserCamera();
  }, []);

  return (
    
    <div className='container px-5 pt-5 overflow-hidden h-screen ml-2 md:ml-0 lg:ml-0'>
      <section>

        <section  style={{display:shown}} className='w-full h-full'>

        {taken==='off'?
        <video
        width={220} height={220}
        style={{display:shown}}
        className='object-contain mx-auto rounded-lg shadow-grayshade2'
        ref={videoRef}>

          </video>
          :
          <video
          style={{display:'none'}}
        className='object-contain mx-auto rounded-lg shadow-grayshade2'

        ref={videoRef}>

          </video>
          }

      {taken==='on'?
      <canvas
      ref={canvasRef}
      className='object-contain mx-auto rounded-lg shadow-grayshade2'
      style={{ display: 'block' }}>

      </canvas>
      :
      <canvas
      ref={canvasRef}
      className='object-contain mx-auto rounded-lg shadow-grayshade2'
      style={{ display: 'none' }}>

      </canvas>
      }
      </section>
          
        <div className='flex flex-row justify-between items-center my-5'>

        {taken==='off'?
        <button
        className='bg-black rounded-lg 
        flex flex-row px-10 py-2 mx-1
        justify-between items-center
         transition-all duration-300 hover:scale-110'
          onClick={takeScreenshot}>
            <Image
            className='object-contain' 
            src={'/camera.png'}
            width={20}
            height={20}/>
            <p className='text-white mx-2 w-28'>Take a Selfie</p>
          </button>
          :
        <button
        className='bg-black rounded-lg 
        flex flex-row px-10 py-2 mx-3
        justify-between items-center
         transition-all duration-300 hover:scale-110'
          onClick={accesswebcam}>
            <Image
            className='object-contain' 
            src={'/camera.png'}
            width={20}
            height={20}/>
            <p className='text-white mx-2 w-36'>Access Webcam</p>
          </button>
          }

          {shown==='block'?
          <button
          className='bg-white rounded-lg 
          flex flex-row px-3 py-2 mx-3 border-black
          justify-between items-center border-2
          transition-all duration-300 hover:scale-110'
          onClick={hideUserCamera}>
            <Image
            className='object-contain' 
            src={'/camerahide.png'}
            width={20}
            height={20}/>
            <p className='text-black mx-2 w-28'>Hide camera</p>
          </button>
          :
          <button
        className='bg-black rounded-lg 
        flex flex-row px-3 py-2 mx-3
        justify-between items-center
         transition-all duration-300 hover:scale-110'
        onClick={hideUserCamera}>
          <Image
          className='object-contain' 
          src={'/camera.png'}
          width={20}
          height={20}/>
          <p className='text-white mx-2 w-32'>Show Camera</p>
          </button>
          }
          
          </div>
      
      </section>
      <p className='text-center my-1 font-bold text-2xl'>Add An Appointment</p>

      
      <form className='mx-auto h-3/5 overflow-auto mt-4' onSubmit={Senddata}>

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
            onChange={((e)=>setVisitorpurpose(e.target.value))}
            />

            </section>

            <button
          className='bg-black rounded-lg 
          p-4 text-white mb-16 mt-4
          justify-between items-center border-2 w-11/12
          transition-all duration-300 hover:bg-gray-300 hover:text-black'>
            Confirm
          </button>
            

      </form>
    </div>
  );
}
