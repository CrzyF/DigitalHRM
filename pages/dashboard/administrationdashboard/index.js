'use client'
import React, { useState,useEffect,useRef } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Popup from 'reactjs-popup';
import Image from 'next/image'
import Link from 'next/link';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/router';
import Bookappointment from './bookappointment';
import axios from 'axios';
import ResheduleAppointment from './rescheduleappointment';
import Swal from 'sweetalert2';



  export default function Administrationdashboard({firstname,lastname,avatar,id,company_email,permissions}) {
  const [activebutton, setActivebutton] = useState(1);
  const [appointmentsbooked, Setappointmentsbooked] = useState(null);
  const [sidebarselect, setSidebarselect] = useState(1);
  const [greeting, setGreeting] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [countdown, setCountdown] = useState('');
  const deadlinetimelist=[]
  const [dayselected, setDayselected] = useState(1);
  const [searching,setSearching]=useState('')
  const Router=useRouter();


  
  const compareItems = (a, b) => {
    if ( Math.floor((new Date(a.datetime) - new Date())/(1000)) < 0 && Math.floor((new Date(b.datetime) - new Date())/(1000)) > 0) {
      return 1; // Move to the back
    }else if ( Math.floor((new Date(a.datetime) - new Date())/(1000)) > 0 && Math.floor((new Date(b.datetime) - new Date())/(1000)) < 0){
      return -1; // Move  to the front
    } else {
      return 0; // Maintain the original order
    }
   
  };


  useEffect(() => {
    axios.get('/api/controllers/appointments/appointmentsbooked')
    .then((response)=>{
      Setappointmentsbooked(response.data)
    })



  }, [appointmentsbooked]);

  const events = [
    {
      start: 'Sun May 14 2023 09:07:18 GMT+0000 (Greenwich Mean Time)',
      end: 'Sun May 14 2023 09:17:18 GMT+0000 (Greenwich Mean Time)',
      title: 'Test Event',
    },
  ];
  
  const localizer = momentLocalizer(moment);


  const summarypage=()=>{
    Router.push({pathname:'register/summary',query:{firstname,
      lastname,
      avatar:process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar,
      permissions,
      company_email
    }})
  }

  const CancelAppointment=(id)=>{
    axios.post('/api/controllers/appointments/cancelappointment',{id:id})
    .then((response)=>{
      Swal.fire({
        icon:'success',
        title:response.data,
        showConfirmButton:false,
        showCloseButton:false,
        timer:1000,
        timerProgressBar:true,
      })
    })
    .catch((e)=>Swal.fire({
      icon:'error',
      title:'An error occurred Please try again later',
      showConfirmButton:false,
      showCloseButton:false,
      timer:1000,
      timerProgressBar:true,
    }))
}

  const handleSubtractDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleAddDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleSubtractDay1 = () => {
    const newDate1 = new Date(selectedDate1);
    newDate1.setDate(newDate1.getDate() - 1);
    setSelectedDate1(newDate1);
  };

  const handleAddDay1 = () => {
    const newDate1 = new Date(selectedDate1);
    newDate1.setDate(newDate1.getDate() + 1);
    setSelectedDate1(newDate1);
  };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting('Good morning');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Good afternoon');
    } else if (hour >= 18 || hour < 5) {
      setGreeting('Good evening');
    }


  }, [greeting]);

  return (
    <div className='container mr-2  flex flex-row h-screen overflow-hidden'>
      <div className='bg-grayshade5 md:bg-grayshade5 lg:bg-grayshade5 m-h-full overflow-y-auto lg:w-2/12'>
        {/* grayshade5 */}
      <Image
        className="
         object-cover 
         lg:mt-9 
         lg:mb-16
         lg:mx-6
         md:mt-10 md:mx-2
         mt-5
         cursor-pointer
         hover:scale-90
         transition 
         hidden md:block lg:block
         duration-300"
        src={'/softblack 1.png'}
        width={150}
        height={150}
        alt="Softmasters Comapany Limited"
        onClick={()=>window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB}
        /> 
        <div className='mx-6 translate-y-8'>
          <h3 className='mt-1 lg:mr-10 md:-translate-x-2 lg:-translate-x-0 hidden md:block lg:block'>Menu</h3>

          
          <div className='flex flex-row 
          justify-between items-center 
          hover:scale-110 transition-all 
          duration-300 ease-in-out 
          h-16 -translate-x-4
          cursor-pointer
          '>

          <Image
        className="
         object-cover 
         lg:mt-16
         lg:mx-6
         md:mt-0
         mt-5
         w-10 h-10
         md:w-1/2 md:h-1/2
         cursor-pointer
         lg:-translate-y-8
         lg:-translate-x-0
         md:-translate-x-0
         translate-x-4
         transition 
         duration-300"
        src={'/element-3.jpg'}
        width={100}
        height={100}
        alt="Softmasters Comapany Limited"
        onClick={()=>setSidebarselect(1)}
        /> 
        {sidebarselect===1
        ?
        <Link onClick={()=>setSidebarselect(1)} 
        href={'#'} 
        className='text-lg font-bold md:translate-x-4 lg:-translate-x-4'>
          <span className='hidden md:block lg:block'>Dashboard</span>
        </Link>
        :
        <Link onClick={()=>setSidebarselect(1)} 
        href={'#'} 
        className='text-lg  md:translate-x-4 lg:-translate-x-4'>
          <span className='hidden md:block lg:block'>Dashboard</span>
        </Link>
      }
        

          </div>

          <div className='flex flex-row justify-between 
          items-center h-16 md:-translate-x-4 lg:-translate-x-5 
          hover:scale-110 transition-all 
          duration-300 ease-in-out cursor-pointer'>

          <Image
        className="
         object-contain 
         lg:mt-16
         lg:mx-6
         md:mt-0
         mt-5
         cursor-pointer
         lg:-translate-y-8
         transition 
         duration-300"
        src={'/calendar-2.png'}
        width={30}
        height={30}
        alt="Softmasters Comapany Limited"
        onClick={()=>setSidebarselect(2)}
        /> 

      {sidebarselect===2
        ?
        <Link onClick={()=>setSidebarselect(2)} 
        href={'#'} 
        className='text-lg font-bold md:-translate-x-2 lg:-translate-x-4'>
        <span className='hidden md:block lg:block'>Calendar</span>
        </Link>
        :
        <Link onClick={()=>setSidebarselect(2)} 
        href={'#'} 
        className='text-lg  md:-translate-x-2 lg:-translate-x-4'>
          <span className='hidden md:block lg:block'>Calendar</span>
        </Link>
      }

          </div>

          <div className='flex flex-row justify-between 
          items-center h-16 md:-translate-x-4 lg:-translate-x-5
          hover:scale-110 transition-all 
          duration-300 ease-in-out cursor-pointer'>

          <Image
        className="
         object-contain 
         lg:mt-16
         lg:mx-6
         md:mt-0
         mt-5
         cursor-pointer
         lg:-translate-y-8
         transition 
         duration-300"
        src={'/messages.png'}
        width={30}
        height={30}
        alt="Softmasters Comapany Limited"
        onClick={()=>setSidebarselect(3)}
        /> 

      {sidebarselect===3
        ?
        <Link onClick={()=>setSidebarselect(3)} 
        href={'#'} 
        className='text-lg font-bold md:-translate-x-10 lg:-translate-x-12 '>
          <span className='hidden md:block lg:block'>Chat</span>
        </Link>
        :
        <Link onClick={()=>setSidebarselect(3)} 
        href={'#'} 
        className='text-lg  md:-translate-x-10 lg:-translate-x-12 '>
          <span className='hidden md:block lg:block'>Chat</span>
        </Link>
      }
        
          </div>

          <div className='flex flex-row justify-between 
          items-center h-16 md:-translate-x-4 lg:-translate-x-5
          hover:scale-110 transition-all 
          duration-300 ease-in-out cursor-pointer'>

          <Image
        className="
         object-contain 
         lg:mt-16
         lg:mx-6
         md:mt-0
         mt-5
         cursor-pointer
         lg:-translate-y-8
         transition 
         duration-300"
        src={'/call-calling.png'}
        width={30}
        height={30}
        alt="Softmasters Comapany Limited"
        onClick={()=>setSidebarselect(4)}
        /> 

      {sidebarselect===4
        ?
        <Link onClick={()=>setSidebarselect(4)} 
        href={'#'} 
        className='text-lg font-bold md:-translate-x-4 lg:-translate-x-5'>
          <span className='hidden md:block lg:block'>Contact</span>
        </Link>
        :
        <Link onClick={()=>setSidebarselect(4)} 
        href={'#'} 
        className='text-lg  md:-translate-x-4 lg:-translate-x-5'>
          <span className='hidden md:block lg:block'>Contact</span>
        </Link>
      }
      
          </div>


        </div>

      </div>
      
      {sidebarselect===1?
      <div className='h-screen w-9/12 mt-12'>
        
        <nav className='flex flex-col md:flex-row lg:flex-row justify-between mx-8 items-center -translate-y-8'>

          <section className='flex flex-row'>

              {avatar?
              <a target='_blank' href={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}>
              <Image 
              src={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}
              className='rounded-full w-52 h-20 md:w-32 md:h-20 lg:w-24 lg:h-20
               transition-all duration-300 
               -translate-x-6 md:translate-x-0 lg:translate-x-0
               hover:scale-110 cursor-pointer 
               object-cover'
              width={150}
              height={150}
              alt="Softmasters Comapany Limited"
              />
              </a>
              
              :
            <section className='px-4 bg-yellow-200 w-20 h-20 rounded-full'>
              
              <Image 
              src={'/avatarshade.png'}
              className='-z-1'
              width={50}
              height={50}
              alt="Softmasters Comapany Limited"
              />
              <Image 
              className='z-1 -translate-y-10 translate-x-2'
              src={'/imagehusk.png'}
              width={30}
              height={30}
              alt="Softmasters Comapany Limited"
              />
              <Image 
              className='-translate-y-16 translate-x-3'
              src={'/imagehuskdot.png'}
              width={10}
              height={10}
              alt="Softmasters Comapany Limited"
              /> 
            </section>

              }

            
            <section className='md:translate-y-0 lg:translate-y-4 mx-2 md:w-full md:translate-x-4 lg:translate-x-0'>
            <h2>{greeting},{firstname+' '+lastname}!</h2>
            <p className='text-grayshade6'>Your ID:{id}</p>
            </section>

          </section>
          
          
          <section className='w-1/3 md:translate-x-4 lg:-translate-x-2'>
            <input 
            value={searching}
            onChange={(e)=>setSearching(e.target.value)} 
            placeholder='Search anything here...'
            className='p-2
            outline-none
             border rounded-lg
             my-3 lg:my-0 md:my-0
             translate-x-2 md:translate-x-0 lg:translate-x-0
              w-13/14 md:w-full lg:w-full'
            />
          </section>
          
          
          <section
          onClick={summarypage} 
          className='flex flex-row
           cursor-pointer transition-all
            duration-300 hover:scale-110
            -translate-x-24 md:translate-x-12 lg:translate-x-0
            -translate-y-24 md:translate-y-0 lg:translate-y-0
            '>
            <Image
            src={'/setting-2.png'}
            width={30}
            height={30}
            className='object-cover mx-2'
            />
            <span className='hidden md:hidden lg:block'>Settings</span>
          </section>

        </nav>

        <div className='
        flex flex-col md:flex-row lg:flex-row
        border border-black  
         lg:-translate-y-6 md:-translate-y-6 -translate-y-16 
         mt-2
         md:w-3/4 lg:w-1/2 mx-10
          rounded-lg justify-center
           items-center'>

          {activebutton===1?
          <Link
          onClick={()=>setActivebutton(1)}
           className='bg-black
          md:-translate-x-8 lg:-translate-x-12
          cursor-pointer transition-all
          duration-300 scale-110 hover:scale-125 ease-in-out
           text-white font-bold 
           p-3 rounded-lg' 
           href={'#'}>
          Appointments
          </Link>
          :
          <Link
          onClick={()=>setActivebutton(1)}
           className='
           md:-translate-x-8 lg:-translate-x-12
          cursor-pointer transition-all
          duration-300 scale-110 hover:scale-125 ease-in-out
           text-black 
           p-3 rounded-lg' 
           href={'#'}>
          Appointments
          </Link>
          }

        {activebutton===2?
          <Link
          onClick={()=>setActivebutton(2)}
           className='bg-black
           translate-x-0 md:-translate-x-4 lg:-translate-x-4
          cursor-pointer transition-all
          duration-300 scale-110 hover:scale-125 ease-in-out
           text-white font-bold 
           p-3 rounded-lg' 
           href={'#'}>
          Visitor Check-in
          </Link>
          :
          <Link
          onClick={()=>setActivebutton(2)}
           className='
           translate-x-0 md:-translate-x-4 lg:-translate-x-4
          cursor-pointer transition-all
          duration-300 scale-110 hover:scale-125 ease-in-out
           text-black 
           p-3 rounded-lg' 
           href={'#'}>
          Visitor Check-in
          </Link>
          }

        {activebutton===3?
          <Link
          onClick={()=>setActivebutton(3)}
           className='bg-black
           md:translate-x-7 lg:translate-x-12
           ml-2
          cursor-pointer transition-all
          duration-300 scale-110 hover:scale-125 ease-in-out
           text-white font-bold 
           p-3 rounded-lg' 
           href={'#'}>
          Messages
          </Link>
          :
          <Link
          onClick={()=>setActivebutton(3)}
           className='
           md:translate-x-7 lg:translate-x-12
          cursor-pointer transition-all
          duration-300 scale-110 hover:scale-125 ease-in-out
           text-black 
           p-3 rounded-lg' 
           href={'#'}>
          Messages
          </Link>
          }
          

        </div>
        
        <div 
        className='
        flex flex-row
        mx-10 relative
        -translate-y-10 md:-translate-y-1 lg:-translate-y-1 
        -translate-x-8 md:-translate-x-0 lg:-translate-x-0 
        justify-between
        items-center
        md:w-11/12 lg:w-3/4
        
        '>
          {dayselected===1?
          <Link onClick={()=>setDayselected(1)} href={'#'} className='hidden md:block lg:block bg-black text-white transition-all duration-300 px-3 py-2 rounded-lg cursor-pointer'>
          All
          </Link>:
          <Link onClick={()=>setDayselected(1)} href={'#'} className='hidden md:block lg:block bg-grayshade7 text-white px-3 py-2 rounded-lg cursor-pointer'>
          All
          </Link>
          }

          <p className='text-grayshade7 text-2xl hidden md:block lg:block'>|</p>

          {dayselected===2?
          <Link onClick={()=>setDayselected(2)} href={'#'} className='hidden md:block lg:block transition-all duration-300 bg-black text-white px-3 py-2 rounded-lg cursor-pointer'>
          Mon
          </Link>:
          <Link onClick={()=>setDayselected(2)} href={'#'} className='hidden md:block lg:block transition-all duration-300 p-2 rounded-lg cursor-pointer'>
          Mon
          </Link>
          }

        {dayselected===3?
          <Link onClick={()=>setDayselected(3)} href={'#'} className='hidden md:block lg:block transition-all duration-300 bg-black text-white px-3 py-2 rounded-lg cursor-pointer'>
          Tue
          </Link>:
          <Link onClick={()=>setDayselected(3)} href={'#'} className='hidden md:block lg:block transition-all duration-300 p-2 rounded-lg cursor-pointer'>
          Tue
          </Link>
          }

          {dayselected===4?
          <Link onClick={()=>setDayselected(4)} href={'#'} className='hidden md:block lg:block transition-all duration-300 bg-black text-white px-3 py-2 rounded-lg cursor-pointer'>
          Wed
          </Link>:
          <Link onClick={()=>setDayselected(4)} href={'#'} className='hidden md:block lg:block transition-all duration-300  p-2 rounded-lg cursor-pointer'>
          Wed
          </Link>
          }

        {dayselected===5?
          <Link onClick={()=>setDayselected(5)} href={'#'} className='hidden md:block lg:block transition-all duration-300 bg-black text-white px-3 py-2 rounded-lg cursor-pointer'>
          Thu
          </Link>:
          <Link onClick={()=>setDayselected(5)} href={'#'} className='hidden md:block lg:block transition-all duration-300 p-2 rounded-lg cursor-pointer'>
          Thu
          </Link>
          }

        {dayselected===6?
          <Link onClick={()=>setDayselected(6)} href={'#'} className='hidden md:block lg:block transition-all duration-300 bg-black text-white px-3 py-2 rounded-lg cursor-pointer'>
          Fri
          </Link>:
          <Link onClick={()=>setDayselected(6)} href={'#'} className='hidden md:block lg:block transition-all duration-300 p-2 rounded-lg cursor-pointer'>
          Fri
          </Link>
          }

          <section
          className='md:flex lg:flex flex-row md:flex-row lg:flex-row border border-grayshade3 p-2 rounded-lg hidden'
           >
            <Image 
            width={20}
            height={20}
            onClick={handleSubtractDay}
            className='object-contain mx-2 hover:scale-125 transition-all duration-300 cursor-pointer'
            src={'/arrow.png'}
            />
            <label htmlFor="datepicker" className='md:text-center'>
            {selectedDate.toDateString()}
            </label>
            
            <Image 
            width={20}
            height={20}
            onClick={handleAddDay}
            className='object-contain mx-2 rotate-180 hover:scale-125 transition-all duration-300 cursor-pointer'
            src={'/arrow.png'}
            />

          </section>

          <Popup trigger={<Link
          className='p-2 bg-black
           text-white rounded-lg 
           cursor-pointer md:mx-3
           items-center
           transition-all duration-300
           translate-x-20 md:translate-x-0 lg:translate-x-0
           translate-y-10 md:translate-y-0 lg:translate-y-0
           hover:scale-110
           flex flex-row' 
          href={'#'}
          >
            <span className='md:hidden lg:block'>Add new</span>
            <Image
             src={'/plus.png'}
              width={20} 
              height={20}
              className='object-contain p-4 md:p-0 lg:p-0 lg:ml-2 hidden  md:block lg:block'
              />
          </Link>  
        }>
          <div 
          className='
          absolute -translate-y-64 lg:-translate-x-60 md:-translate-x-60 -translate-x-60
          mt-3
          shadow-lg shadow-gray-500 rounded-lg
           bg-white'
          >
            <Bookappointment/>
          </div>
          </Popup>

               
          
        </div>
      
        
        <div className='translate-y-40 translate-x-96'>
        <DatePicker 
          id="datepicker" 
          selected={selectedDate} 
          onChange={date => setSelectedDate(date)} 
          className='hidden'
          />
        </div>
        <h2 className='text-lg font-bold -translate-y-2 translate-x-10  hidden md:block lg:block'>Monday</h2>
        {appointmentsbooked?
        <section>
        <div className='h-screen  overflow-scroll -translate-y-1 translate-x-8 hidden md:block lg:block'>

            {searching.length >0 ?
            <div className='grid grid-cols-3 gap-x-1 mb-10'>

            <div className='overflow-auto'>

              <section className='flex flex-row border-t-8 border-greenshade justify-between w-auto items-center'>
            <h3 className='mx-2 mt-3 mb-3 font-semibold text-xl'>Upcoming Appointments</h3>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 -translate-x-12 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>


            </section>
              <section className='flex flex-col w-full mt-4 h-screen overflow-scroll mb-5'>
            {appointmentsbooked.filter((items)=>{
                  if(searching===""){
                    return true;
                  }else if(items.status==="Rescheduled"){
                    return false
                  }else if(items.status==="Cancelled"){
                    return false

                  }else if(items.name.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.phone.toString().includes(searching.toString())){
                    return true;
                  }else if(items.employee.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.datetime.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.purpose.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }
                  return false;
                }).sort(compareItems).map((appointments)=>(
              <div className='w-full h-auto shadow-md shadow-gray-400 mx-2 mt-4 mb-10'>
                <section className='grid grid-cols-3 gap-2'>
                  
                  <Image 
                  src={'/appointments/'+appointments.selfie}
                  alt={appointments.selfie}
                   width={80} 
                   height={60} 
                   className='rounded-full w-10 h-10
                   transition-all duration-300 mx-4 mt-2
                   hover:scale-110 cursor-pointer 
                   object-cover'
                   />
                   <section className='flex flex-col mx-2'>
                    <p className='text-grayshade6 font-bold text-md'>{appointments.name}</p>
                    <p className='text-grayshade6'>Appointee</p>
                    </section>

                    <section className='flex flex-col ml-2 mr-2'>
                    <p className='text-grayshade6 font-bold text-md'>{appointments.employee}</p>
                    <p className='text-grayshade6'>Host</p>
                    </section>

                </section>

                <section className='grid grid-cols-2 gap-5 my-1 mx-2'>
                    <p className='font-bold text-md'>Purpose:</p>
                    <p className=''>{appointments.purpose}</p>
                  </section>

                  <section className='grid grid-cols-2 gap-2  my-3 w-2/3 mx-2'>
                    <p>Begins in</p>
                    <section className=' translate-x-10 w-full'>{
                    Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0 ?
                        <p className='bg-red-600 bg-opacity-20 p-1 rounded-lg w-full'>Time Limit Reached</p>
                       :
                       <p className='bg-greenshade2 bg-opacity-20 p-1 rounded-lg w-fit'>
                      {
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60*24))).toString()+' day(s) ' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60)) % 24).toString()+'h:' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60)) % 60).toString()+'m:' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/1000) % 60).toString()+'s'
                      }
                      </p>
                  }</section>
                  </section>

                  <section className='grid grid-cols-3 gap-2 mx-2 items-center my-4'>
                  <Link
                  className='py-2 px-4 bg-black
                  text-white rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'}
                  >
                    Contact
                  </Link>  
                    
                    {
                      Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0?
                      <Link className='py-2 px-4
                      text-red-600 rounded-lg 
                   cursor-pointer
                   items-center text-center
                   transition-all duration-300
                   hover:scale-110
                   flex flex-row' 
                   href={'#'}
                   >
                     Time Up
                     </Link>
 
                      :
                     <Link className='py-2 px-4
                      text-red-600 rounded-lg 
                   cursor-pointer
                   items-center
                   transition-all duration-300
                   hover:scale-110
                   flex flex-row' 
                   href={'#'} onClick={()=>CancelAppointment(appointments._id)}
                   >
                     Cancel meeting
                     </Link>
                    }
                    
                   <Popup trigger={
                    <Link href={'#'} className='font-bold transition-all duration-300
                  hover:scale-110 cursor-pointer text-center'>Edit details</Link>
                }>
                  <div 
                  className='
                  absolute
                  mt-3 -translate-y-100 -translate-x-80
                  shadow-lg shadow-gray-500 rounded-lg
                  bg-white'
                  >
                    <ResheduleAppointment
                     id={appointments._id} 
                    name={appointments.name} 
                    phone={appointments.phone}
                    empname={appointments.employee}
                    purpose={appointments.purpose}
                    />
                  </div>
                  </Popup>
                  </section>
              </div>
            ))}
          </section>
          </div>

          <div className='overflow-auto mb-72'>

          <section className='flex flex-row border-t-8 border-blueshade justify-between w-auto items-center'>
            <h3 className='mx-2 mt-3 mb-3 font-semibold text-xl'>Scheduled</h3>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 -translate-x-12 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>


            </section>

            <section className='flex flex-col w-full mt-4 h-screen overflow-scroll mb-5'>
            {appointmentsbooked.filter((items)=>{
                  if(items.status==="Rescheduled" && items.name.toLowerCase().includes(searching.toLocaleLowerCase()) ||
                  items.status==="Rescheduled" && items.phone.toString().includes(searching.toString())||
                  items.status==="Rescheduled" && items.employee.toLowerCase().includes(searching.toLocaleLowerCase())||
                  items.status==="Rescheduled" && items.datetime.toLowerCase().includes(searching.toLocaleLowerCase())||
                  items.status==="Rescheduled" && items.purpose.toLowerCase().includes(searching.toLocaleLowerCase())
                  ){
                    return true
                  }else if(items.status!=="Rescheduled"){
                    return false
                  }
                  else if(searching===""){
                    return true;
                  }else if(items.name.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.phone.toString().includes(searching.toString())){
                    return true;
                  }else if(items.employee.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.datetime.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.purpose.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }
                  return false;
                }).sort(compareItems).map((appointments)=>(
                  // {appointments.status ==="Rescheduled" &&}

                  <div className='w-full h-auto shadow-md shadow-gray-400 mx-2 mt-4 mb-10'>
                  <section className='grid grid-cols-3 gap-2'>
                    <Image 
                    src={'/appointments/'+appointments.selfie}
                    alt={appointments.selfie}
                     width={80} 
                     height={60} 
                     className='rounded-full w-10 h-10
                     transition-all duration-300 mx-4 mt-2
                     hover:scale-110 cursor-pointer 
                     object-cover'
                     />
                     <section className='flex flex-col mx-2'>
                      <p className='text-grayshade6 font-bold text-md'>{appointments.name}</p>
                      <p className='text-grayshade6'>Appointee</p>
                      </section>
  
                      <section className='flex flex-col ml-2 mr-2'>
                      <p className='text-grayshade6 font-bold text-md'>{appointments.employee}</p>
                      <p className='text-grayshade6'>Host</p>
                      </section>
  
                  </section>
  
                  <section className='grid grid-cols-2 gap-5 my-1 mx-2'>
                      <p className='font-bold text-md'>Purpose:</p>
                      <p className=''>{appointments.purpose}</p>
                    </section>
  
                    <section className='grid grid-cols-2 gap-2  my-3 w-2/3 mx-2'>
                      <p>Begins in</p>
                      <section className=' translate-x-10 w-full'>{
                      Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0 ?
                          <p className='bg-red-600 bg-opacity-20 p-1 rounded-lg w-full'>Time Limit Reached</p>
                         :
                         <p className='bg-greenshade2 bg-opacity-20 p-1 rounded-lg w-fit'>
                        {
                        (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60*24))).toString()+' day(s) ' +
                        (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60)) % 24).toString()+'h:' +
                        (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60)) % 60).toString()+'m:' +
                        (Math.floor((new Date(appointments.datetime) - new Date())/1000) % 60).toString()+'s'
                        }
                        </p>
                    }</section>
                    </section>
  
                    <section className='grid grid-cols-3 gap-2 mx-2 items-center my-4'>
                    <Link
                    className='py-2 px-4 bg-black
                    text-white rounded-lg 
                    cursor-pointer
                    items-center
                    transition-all duration-300
                    hover:scale-110
                    flex flex-row' 
                    href={'#'}
                    >
                      Contact
                    </Link>  
                      
                      {Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0?
                     <Link className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center text-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'}
                  >
                    Time Up
                    </Link>

                     :
                    <Link className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'} onClick={()=>CancelAppointment(appointments._id)}
                  >
                    Cancel meeting
                    </Link>}
  
                     <Popup trigger={
                      <Link href={'#'} className='font-bold transition-all duration-300
                    hover:scale-110 cursor-pointer text-center'>Edit details</Link>
                  }>
                    <div 
                    className='
                    absolute
                    mt-3 -translate-y-100 -translate-x-80
                    shadow-lg shadow-gray-500 rounded-lg
                    bg-white'
                    >
                      <ResheduleAppointment
                       id={appointments._id} 
                      name={appointments.name} 
                      phone={appointments.phone}
                      empname={appointments.employee}
                      purpose={appointments.purpose}
                      />
                    </div>
                    </Popup>
                    </section>
                </div>
            ))}
          </section>
          

          </div>

          <div className='overflow-auto mb-72'>

          <section className='flex flex-row border-t-8 border-red-500 justify-between w-auto items-center'>
            <h3 className='mx-2 mt-3 mb-3 font-semibold text-xl'>Cancelled</h3>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 -translate-x-12 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>


            </section>

            <section className='flex flex-col w-full mt-4 h-screen overflow-scroll mb-5'>
            {appointmentsbooked.filter((items)=>{
                  if(items.status==="Cancelled" && items.name.toLowerCase().includes(searching.toLocaleLowerCase()) 
                  || items.status==="Cancelled" && items.phone.toString().includes(searching.toString()) || 
                  items.status==="Cancelled" && items.datetime.toLowerCase().includes(searching.toLocaleLowerCase())
                  || items.status==="Cancelled" && items.purpose.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true
                  }else if(items.status!=="Cancelled"){
                    return false
                  }
                  else if(searching===""){
                    return true;
                  }else if(items.name.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.phone.toString().includes(searching.toString())){
                    return true;
                  }else if(items.employee.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.datetime.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.purpose.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }
                  return false;
                }).sort(compareItems).map((appointments)=>(
                  // {appointments.status ==="Rescheduled" &&}
                  
                  <div className='w-full h-auto shadow-md shadow-gray-400 mx-2 mt-4 mb-10'>
                  <section className='grid grid-cols-3 gap-2'>
                    <Image 
                    src={'/appointments/'+appointments.selfie}
                    alt={appointments.selfie}
                     width={80} 
                     height={60} 
                     className='rounded-full w-10 h-10
                     transition-all duration-300 mx-4 mt-2
                     hover:scale-110 cursor-pointer 
                     object-cover'
                     />
                     <section className='flex flex-col mx-2'>
                      <p className='text-grayshade6 font-bold text-md'>{appointments.name}</p>
                      <p className='text-grayshade6'>Appointee</p>
                      </section>
  
                      <section className='flex flex-col ml-2 mr-2'>
                      <p className='text-grayshade6 font-bold text-md'>{appointments.employee}</p>
                      <p className='text-grayshade6'>Host</p>
                      </section>
  
                  </section>

                <section className='grid grid-cols-2 my-3 gap-5 mx-2'>
                    <p className='font-bold text-lg'>Purpose:</p>
                    <p >{appointments.purpose}</p>
                  </section>

                  {appointments.status!=="Cancelled" &&
                  <section className='flex flex-row mx-5 justify-between items-center my-3 w-2/3'>
                    <p className='w-1/2'>Begins in</p>
                    <section className=' translate-x-10 w-full'>{
                    Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0 ?
                        <p className='bg-red-600 bg-opacity-20 p-1 rounded-lg w-full'>Time Limit Reached</p>
                       :
                       <p className='bg-greenshade2 bg-opacity-20 p-1 rounded-lg w-full'>
                      {
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60*24))).toString()+' day(s) ' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60)) % 24).toString()+'h:' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60)) % 60).toString()+'m:' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/1000) % 60).toString()+'s'
                      }
                      </p>
                  }</section>
                  </section>
                  }

                  <section className='grid grid-cols-3 gap-2 mx-2 items-center my-4'>
                  <Link
                  className='py-2 px-4 bg-black
                  text-white rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'}
                  >
                    Contact
                  </Link>  
                    
                    {appointments.status!=="Cancelled" ?

                    Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0?
                     <Link className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center text-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'}
                  >
                    Time Up
                    </Link>

                     :
                    <Link className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'} onClick={()=>CancelAppointment(appointments._id)}
                  >
                    Cancel meeting
                    </Link>
                    :
                    <p className='py-2 px-4
                    text-red-600 rounded-lg 
                 cursor-pointer
                 items-center
                 transition-all duration-300
                 hover:scale-110
                 flex flex-row'>Cancelled</p>
                    }

              {appointments.status!=="Cancelled" && <Popup trigger={
                    <Link href={'#'} className='font-bold transition-all duration-300
                  hover:scale-110 cursor-pointer'>Edit details</Link>
                }>
                  <div 
                  className='
                  absolute
                  mt-3 -translate-y-100 -translate-x-80
                  shadow-lg shadow-gray-500 rounded-lg
                  bg-white'
                  >
                    <ResheduleAppointment
                     id={appointments._id} 
                     name={appointments.name} 
                     phone={appointments.phone}
                     empname={appointments.employee}
                     purpose={appointments.purpose}
                     />
                  </div>
                  </Popup>
                    }
                  </section>
              </div>
            ))}
          </section>
          

          </div>

          </div>
                      :
          <section className='flex flex-row border-t-8 border-greenshade w-full mt-4 h-screen overflow-scroll mb-5'>
            
            {appointmentsbooked.filter((items)=>{
                  if(searching===""){
                    return true;
                  }else if(items.name.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.phone.toString().includes(searching.toString())){
                    return true;
                  }else if(items.employee.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.datetime.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.purpose.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }
                  return false;
                }).sort(compareItems).map((appointments)=>(
              <div className='w-auto h-fit shadow-md shadow-gray-400 p-4 pr-8 mx-2 rounded-xl mb-72'>
                <section className='grid grid-cols-3 mx-2 gap-6'>
                  <Image 
                  src={'/appointments/'+appointments.selfie}
                  alt={appointments.selfie}
                   width={80} 
                   height={60} 
                   className='rounded-full w-10 h-10
                   transition-all duration-300 
                   hover:scale-110 cursor-pointer 
                   object-cover'
                   />
                   <section className='flex flex-col mx-1'>
                    <p className='text-grayshade6 font-bold text-md'>{appointments.name}</p>
                    <p className='text-grayshade6'>Appointee</p>
                    </section>

                    <section className='flex flex-col ml-2 mr-2 pr-4'>
                    <p className='text-grayshade6 font-bold text-md'>{appointments.employee}</p>
                    <p className='text-grayshade6'>Host</p>
                    </section>

                </section>

                <section className='grid grid-cols-2 mx-2 justify-between items-center my-2'>
                    <p className='font-bold text-md'>Purpose:</p>
                    <p >{appointments.purpose}</p>
                  </section>

                  {appointments.status!=="Cancelled" &&
                  <section className='flex flex-row mx-5 justify-between items-center my-3 w-2/3'>
                    <p className='w-1/2'>Begins in</p>
                    <section className=' translate-x-10 w-full'>{
                    Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0 ?
                        <p className='bg-red-600 bg-opacity-20 p-1 rounded-lg w-full'>Time Limit Reached</p>
                       :
                       <p className='bg-greenshade2 bg-opacity-20 p-1 rounded-lg w-full'>
                      {
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60*24))).toString()+' day(s) ' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60*60)) % 24).toString()+'h:' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/(1000*60)) % 60).toString()+'m:' +
                      (Math.floor((new Date(appointments.datetime) - new Date())/1000) % 60).toString()+'s'
                      }
                      </p>
                  }</section>
                  </section>
                  }

                  <section className='flex flex-row mx-2 justify-between items-center my-4'>
                  <Link
                  className='py-2 px-4 bg-black
                  text-white rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'}
                  >
                    Contact
                  </Link>  
                    
                    {appointments.status!=="Cancelled"?
                    
                     Math.floor((new Date(appointments.datetime) - new Date())/(1000)) < 0?
                     <Link className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center text-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'}
                  >
                    Time Up
                    </Link>

                     :
                    <Link className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row' 
                  href={'#'} onClick={()=>CancelAppointment(appointments._id)}
                  >
                    Cancel meeting
                    </Link>
                    :<p className='py-2 px-4
                     text-red-600 rounded-lg 
                  cursor-pointer
                  items-center
                  transition-all duration-300
                  hover:scale-110
                  flex flex-row'>Cancelled</p>}

                   <Popup trigger={
                    <Link href={'#'} className='font-bold transition-all duration-300
                  hover:scale-110 cursor-pointer text-center'>Edit details</Link>
                }>
                  <div 
                  className='
                  absolute
                  mt-3 -translate-y-100 -translate-x-80
                  shadow-lg shadow-gray-500 rounded-lg
                  bg-white'
                  >
                    <ResheduleAppointment
                     id={appointments._id} 
                    name={appointments.name} 
                    phone={appointments.phone}
                    empname={appointments.employee}
                    purpose={appointments.purpose}
                    />
                  </div>
                  </Popup>
                  </section>
              </div>
            ))}
          </section>
            }
        </div>
        <h2 className='block md:hidden lg:hidden text-center text-2xl bg-black p-3 rounded-lg text-white md:text-black lg:text-black '>Please View Appointments Scheduled on a larger screen</h2>
        </section>
        :
        <h2 className='font-bold text-center text-2xl'>Loading Data...</h2>
        }

      </div>
      :
      sidebarselect===2?
      <div className='h-screen w-9/12 mt-12'>
         <nav className='flex flex-col md:flex-row lg:flex-row justify-between mx-8 items-center -translate-y-8'>

          <section className='flex flex-row'>

              {avatar?
              <a target='_blank' href={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}>
              <Image 
              src={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}
              className='rounded-full w-52 h-20 md:w-32 md:h-20 lg:w-24 lg:h-20
              transition-all duration-300 
              -translate-x-6 md:translate-x-0 lg:translate-x-0
              hover:scale-110 cursor-pointer 
              object-cover'
              width={150}
              height={150}
              alt="Softmasters Comapany Limited"
              />
              </a>
              
              :
            <section className='px-4 bg-yellow-200 w-20 h-20 rounded-full'>
              
              <Image 
              src={'/avatarshade.png'}
              className='-z-1'
              width={50}
              height={50}
              alt="Softmasters Comapany Limited"
              />
              <Image 
              className='z-1 -translate-y-10 translate-x-2'
              src={'/imagehusk.png'}
              width={30}
              height={30}
              alt="Softmasters Comapany Limited"
              />
              <Image 
              className='-translate-y-16 translate-x-3'
              src={'/imagehuskdot.png'}
              width={10}
              height={10}
              alt="Softmasters Comapany Limited"
              /> 
            </section>

              }

            
            <section className='md:translate-y-0 lg:translate-y-4 mx-2 md:w-full md:translate-x-4 lg:translate-x-0'>
            <h2>{greeting},{firstname+' '+lastname}!</h2>
            <p className='text-grayshade6'>Your ID:{id}</p>
            </section>

          </section>


          <section className='w-1/3 md:translate-x-4 lg:-translate-x-2'>
            <input 
            value={searching}
            onChange={(e)=>setSearching(e.target.value)} 
            placeholder='Search anything here...'
            className='p-2
            outline-none
            border rounded-lg
            my-3 lg:my-0 md:my-0
            translate-x-2 md:translate-x-0 lg:translate-x-0
              w-13/14 md:w-full lg:w-full'
            />
          </section>


          <section
          onClick={summarypage} 
          className='flex flex-row
          cursor-pointer transition-all
            duration-300 hover:scale-110
            -translate-x-24 md:translate-x-12 lg:translate-x-0
            -translate-y-24 md:translate-y-0 lg:translate-y-0
            '>
            <Image
            src={'/setting-2.png'}
            width={30}
            height={30}
            className='object-cover mx-2'
            />
            <span className='hidden md:hidden lg:block'>Settings</span>
          </section>

          </nav>
        {appointmentsbooked?
        <section>
        <section className='lg:flex flex-row h-screen mt-2 hidden md:flex'>
        <Calendar 
        views={['month','agenda']} 
        localizer={localizer}
        events={appointmentsbooked}
        startAccessor='datetime'
        endAccessor='datetime'
        titleAccessor='name'
         className='mx-9 mb-20 md:scale-y-75 md:scale-x-100 lg:scale-y-75 lg:scale-x-95 w-5/6 -translate-y-24 -translate-x-4 object-contain'    
         />

         <Popup trigger={<Link
          className='p-2 bg-black
           text-white rounded-lg 
           cursor-pointer my-3
           items-center h-12 w-1/6
           transition-all duration-300
           hover:scale-110 -translate-x-4 -translate-y-8
           flex flex-row justify-center' 
          href={'#'}
          >
            <p>Add new</p>
            <Image
             src={'/plus.png'}
              width={20} 
              height={20}
              className='object-contain mx-2 '
              />
          </Link>  
        }>
          <div 
          className='
          absolute -translate-y-60 -translate-x-80
          mt-16
          shadow-lg shadow-gray-500 rounded-lg
           bg-white'
          >
            <Bookappointment/>
          </div>
          </Popup>

          </section>
          <h2 className='block md:hidden lg:hidden text-center text-2xl bg-black p-3 rounded-lg text-white md:text-black lg:text-black '>Please View Appointments Scheduled on a larger screen</h2>
          </section>
         :
         ''
        }

        </div>
        :
        sidebarselect===3?
      <div className='h-screen w-9/12 mt-12'>
        <nav className='flex flex-col md:flex-row lg:flex-row justify-between mx-8 items-center -translate-y-8'>

<section className='flex flex-row'>

    {avatar?
    <a target='_blank' href={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}>
    <Image 
    src={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}
    className='rounded-full w-52 h-20 md:w-32 md:h-20 lg:w-24 lg:h-20
     transition-all duration-300 
     -translate-x-6 md:translate-x-0 lg:translate-x-0
     hover:scale-110 cursor-pointer 
     object-cover'
    width={150}
    height={150}
    alt="Softmasters Comapany Limited"
    />
    </a>
    
    :
  <section className='px-4 bg-yellow-200 w-20 h-20 rounded-full'>
    
    <Image 
    src={'/avatarshade.png'}
    className='-z-1'
    width={50}
    height={50}
    alt="Softmasters Comapany Limited"
    />
    <Image 
    className='z-1 -translate-y-10 translate-x-2'
    src={'/imagehusk.png'}
    width={30}
    height={30}
    alt="Softmasters Comapany Limited"
    />
    <Image 
    className='-translate-y-16 translate-x-3'
    src={'/imagehuskdot.png'}
    width={10}
    height={10}
    alt="Softmasters Comapany Limited"
    /> 
  </section>

    }

  
  <section className='md:translate-y-0 lg:translate-y-4 mx-2 md:w-full md:translate-x-4 lg:translate-x-0'>
  <h2>{greeting},{firstname+' '+lastname}!</h2>
  <p className='text-grayshade6'>Your ID:{id}</p>
  </section>

</section>


<section className='w-1/3 md:translate-x-4 lg:-translate-x-2'>
  <input 
  value={searching}
  onChange={(e)=>setSearching(e.target.value)} 
  placeholder='Search anything here...'
  className='p-2
  outline-none
   border rounded-lg
   my-3 lg:my-0 md:my-0
   translate-x-2 md:translate-x-0 lg:translate-x-0
    w-13/14 md:w-full lg:w-full'
  />
</section>


<section
onClick={summarypage} 
className='flex flex-row
 cursor-pointer transition-all
  duration-300 hover:scale-110
  -translate-x-24 md:translate-x-12 lg:translate-x-0
  -translate-y-24 md:translate-y-0 lg:translate-y-0
  '>
  <Image
  src={'/setting-2.png'}
  width={30}
  height={30}
  className='object-cover mx-2'
  />
  <span className='hidden md:hidden lg:block'>Settings</span>
</section>

</nav>
        Chat
        </div>
        :
        <div className='h-screen w-9/12 mt-12'>
          <nav className='flex flex-col md:flex-row lg:flex-row justify-between mx-8 items-center -translate-y-8'>

<section className='flex flex-row'>

    {avatar?
    <a target='_blank' href={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}>
    <Image 
    src={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}
    className='rounded-full w-52 h-20 md:w-32 md:h-20 lg:w-24 lg:h-20
     transition-all duration-300 
     -translate-x-6 md:translate-x-0 lg:translate-x-0
     hover:scale-110 cursor-pointer 
     object-cover'
    width={150}
    height={150}
    alt="Softmasters Comapany Limited"
    />
    </a>
    
    :
  <section className='px-4 bg-yellow-200 w-20 h-20 rounded-full'>
    
    <Image 
    src={'/avatarshade.png'}
    className='-z-1'
    width={50}
    height={50}
    alt="Softmasters Comapany Limited"
    />
    <Image 
    className='z-1 -translate-y-10 translate-x-2'
    src={'/imagehusk.png'}
    width={30}
    height={30}
    alt="Softmasters Comapany Limited"
    />
    <Image 
    className='-translate-y-16 translate-x-3'
    src={'/imagehuskdot.png'}
    width={10}
    height={10}
    alt="Softmasters Comapany Limited"
    /> 
  </section>

    }

  
  <section className='md:translate-y-0 lg:translate-y-4 mx-2 md:w-full md:translate-x-4 lg:translate-x-0'>
  <h2>{greeting},{firstname+' '+lastname}!</h2>
  <p className='text-grayshade6'>Your ID:{id}</p>
  </section>

</section>


<section className='w-1/3 md:translate-x-4 lg:-translate-x-2'>
  <input 
  value={searching}
  onChange={(e)=>setSearching(e.target.value)} 
  placeholder='Search anything here...'
  className='p-2
  outline-none
   border rounded-lg
   my-3 lg:my-0 md:my-0
   translate-x-2 md:translate-x-0 lg:translate-x-0
    w-13/14 md:w-full lg:w-full'
  />
</section>


<section
onClick={summarypage} 
className='flex flex-row
 cursor-pointer transition-all
  duration-300 hover:scale-110
  -translate-x-24 md:translate-x-12 lg:translate-x-0
  -translate-y-24 md:translate-y-0 lg:translate-y-0
  '>
  <Image
  src={'/setting-2.png'}
  width={30}
  height={30}
  className='object-cover mx-2'
  />
  <span className='hidden md:hidden lg:block'>Settings</span>
</section>

</nav>
          Contact
          </div>
      }


    </div>
  )
}