import React ,{ useState,useRef,useEffect } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import "react-datepicker/dist/react-datepicker.css";
import Popup from 'reactjs-popup';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Calendarpage(statevalues,setstatevalues) {

  const [subject,setSubject]=useState('');
  const [location,setLocation]=useState('');
  const [visitorsname,setVisitorsname]=useState('');
  const [visitorsnumber,setVisitorsnumber]=useState('');
  const [start_date,setStart_date]=useState('');
  const [start_time,setStart_time]=useState('');
  const [end_time,setEnd_time]=useState('');
  const [notes,setNotes]=useState('');

  const [appointmentwith, setAppointmentwith] = useState('');

  const [newevents,setNewevents]=useState(null);


  useEffect(() => {
    axios.get('/api/controllers/appointments/allgetappointments')
    .then((response)=>{
      const appointments = response.data;
      const formattedAppointments = appointments.map((appointment) => {
        const startComponents = appointment.start_time.split(",");
        const year = parseInt(startComponents[0]);
        const month = parseInt(startComponents[1]) - 1;
        const day = parseInt(startComponents[2]);
        const hours = parseInt(startComponents[3]);
        const minutes = parseInt(startComponents[4]);
        const start_time = new Date(year, month, day, hours, minutes);

        const endComponents = appointment.end_time.split(",");
        const year1= parseInt(endComponents[0]);
        const month1 = parseInt(endComponents[1]) - 1;
        const day1 = parseInt(endComponents[2]);
        const hours1 = parseInt(endComponents[3]);
        const minutes1 = parseInt(endComponents[4]);
        const end_time = new Date(year1, month1, day1, hours1, minutes1);
      
        return {
          subject: appointment.subject,
          location: appointment.location,
          start_date: appointment.start_date,
          start_time,
          end_time,
          notes: appointment.notes,
        };
      });
      
      setNewevents(formattedAppointments);
      
  })
  }, [newevents])

  const [red,setRed]=useState(null);

  const startDate=new Date()
    const [datepicker,setDatepicker]=useState(startDate);
    const popupRef = useRef(null);

    const handleDateChange = (date) => {
      setDatepicker(date);
    };

      
      const localizer = momentLocalizer(moment);


    const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
        // backgroundColor: 'purple', // set the background color from the custom 'color' property
        borderRadius: '5px',
        opacity: 0.8,
        color: '#fff',
        border: 'none',
        display: 'block',
    };
    
    return {
        style,
    };
    };

    const handleClosePopup = () => {
      popupRef.current.close(); 
    };

    const Bookappointmentbutton = () =>{

      const splitdate = start_date.split('-');
      const newsplitdate = splitdate.map((item) => parseInt(item));

      const splitstart_time = start_time.split(':');
      const newsplitstartdate = splitstart_time.map((item) => parseInt(item));

      const startactualdate = [...newsplitdate, ...newsplitstartdate];

      const splitend_time = end_time.split(':');
      const newsplitenddate = splitend_time.map((item) => parseInt(item));

      const endactualdate = [...newsplitdate, ...newsplitenddate];


      // const splitstarttime=start_time.split(':')
      // const splitendtime=end_time.split(':')

      const values={
        subject:subject,
        location:location,
        start_date:start_date,
        start_time:startactualdate.toString(),
        end_time:endactualdate.toString(),
        notes:notes,
      }

      if( subject !== '' &&
        location !== '' &&
        start_date !== '' &&
        start_time !== '' &&
        end_time !== ''){

        axios.post('/api/controllers/appointments/newappointment',values)
        .then((response)=>{
        setRed(false)
          Swal.fire({
            icon:'success',
            iconColor:'black',
            title:'Appointment Booking',
            text:response.data,
            showConfirmButton:false,
            showCloseButton:false,
            showCancelButton:false,
            timer:2000
          })
          popupRef.current.close(); 
        })
        .catch((e)=>{
        setRed(false)
          Swal.fire({
            icon:'error',
            title:'An Error Occurred'
          })
        })

      }else{

        setRed(true)
        Swal.fire({
          icon:'error',
          iconColor:'red',
          title:'Please fill in required the inputs',

        })
      }


    };

    const inputvalue='border border-grayshade p-2 mx-3 w-96 flex-2/3 text-black rounded-lg appearance-none outline-none'

    const redinputvalue='border border-red-500 p-2 mx-3 w-96  flex-2/3 text-black rounded-lg appearance-none outline-none'

    const startdateinputvalue='border border-grayshade p-2 mx-3 w-44  flex-2/3 text-black rounded-lg appearance-none outline-none'

    const redstartdateinputvalue='border border-red-500 p-2 mx-3 w-44  flex-2/3 text-black rounded-lg appearance-none outline-none'

    const starttimeinputvalue='border border-grayshade p-2 mx-3 w-40  flex-2/3 text-black rounded-lg appearance-none outline-none'

    const redstarttimeinputvalue='border border-red-500 p-2 mx-3 w-40  flex-2/3 text-black rounded-lg appearance-none outline-none'

  return (
    <div className='container h-screen'>

        <div className='h-screen w-full'>

            <div className='flex flex-row items-center'>

                <div className='my-3 flex flex-row justify-between w-fit border border-gray-600 p-2 rounded-lg items-center ml-16'>

                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" class="w-4 h-4 overflow-hidden bg-black text-white rounded-full cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg> */}

                <input
                 value={datepicker} 
                 type='date'
                 id="date"
                 onChange={(e) => setDatepicker(e.target.value)}
                 className='z-20 outline-none focus-visible:false'
                  />

              {/* <DatePicker
               selected={datepicker}
                onChange={handleDateChange}
                className='text-center z-20'
                 /> */}

                {/* <label 
                htmlFor="date">
                  July,2023
                </label> */}

                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 overflow-hidden bg-black text-white rounded-full cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg> */}


                </div>

                <Popup 
                closeOnDocumentClick={false}
                onClose={handleClosePopup}
                ref={popupRef}
                trigger={
                <div className='bg-black shadow-lg hover:scale-110 transition-all ease-in-out cursor-pointer duration-300 flex flex-row items-center justify-center rounded-lg p-3 mx-6'>

                  <p className='text-white'>Add Appointment</p>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-6 h-6 text-black bg-white rounded-full overflow-hidden mx-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>



                </div>
              }>
                  <div className='absolute -translate-x-1/3 duration-300 transition-all ease-in-out bg-white w-max h-fit p-4 rounded-lg shadow-lg shadow-grayshade2 border border-grayshade'>

                    <h2 className='font-bold'>Add An Appointment</h2>

                    <div className='w-full my-3 flex flex-col justify-between h-fit'>

                      <div className='flex flex-row flex-1  items-center my-2'>

                        <label className={'font-bold text-lg flex-1/3 mr-3'}>
                          Subject
                        </label>

                        <input 
                        placeholder='Enter Subject here'
                        className={(subject === ''&& red===true)?redinputvalue:inputvalue}
                        onChange={((e)=>setSubject(e.target.value))}
                         />
                      </div>

                      <div className='flex flex-row flex-1  items-center my-2'>

                        <label className='font-bold text-lg flex-1/3 mr-3'>
                          Location
                        </label>

                        <select
                               value={location}
                               onChange={(e) => setLocation(e.target.value)}
                               className={(location === ''&& red===true)?['-translate-x-2',redinputvalue].join(' '):['-translate-x-2',inputvalue].join(' ')}
                            >
                           <option>Doctor's Office</option>
                           <option>Left Office</option>
                           <option>Right Office</option>
                          </select>
                      </div>

                      <div className='flex flex-row flex-1  items-center my-2'>

                         <label className='font-bold text-lg flex-1/3 mr-3'>
                                Visitors Name
                         </label>

                      <input 
                           onChange={((e)=>setVisitorsname(e.target.value))}
                           placeholder='Enter Visitors Name here'
                           className={(visitorsname === ''&& red===true)?['-translate-x-2',redinputvalue].join(' '):['-translate-x-2',inputvalue].join(' ')}

                       />
                      </div>

                       <div className='flex flex-row flex-1  items-center my-2'>

                           <label className='font-bold text-lg flex-1/3 mr-3'>
                           Visitors Phone Number
                       </label>

                        <input 
                           onChange={((e)=>setVisitorsnumber(e.target.value))}
                           placeholder='Enter Visitors Phone Number here'
                           className={(visitorsnumber === ''&& red===true)?['-translate-x-2',redinputvalue].join(' '):['-translate-x-2',inputvalue].join(' ')}

                        />
                        </div>

                        <div className='flex flex-row flex-1  items-center my-2'>

                           <label className='font-bold text-lg flex-1/3 mr-3'>
                               Appointment With
                           </label>

                           <select
                              value={appointmentwith}
                               onChange={(e) => setAppointmentwith(e.target.value)}
                               className={(appointmentwith === ''&& red===true)?['-translate-x-2',redinputvalue].join(' '):['-translate-x-2',inputvalue].join(' ')}
                            >
                           <option>Faiz Fawel</option>
                           <option>Ben Adu</option>
                           <option>Joseph Nana Benyin Barnes</option>
                           <option>Richard Somda</option>
                           <option>Prince Aboagye</option>
                           <option>Hippolyte Edem Kpotchie</option>
                           <option>Prince Nana Yaw Oduro</option>
                           <option>Christopher Enim</option>
                           <option>Jesse Amabange Seidu</option>
                           <option>Richard Asamoah</option>
                          </select>
                         </div>

                        

                      <div className='flex flex-row flex-1  items-center my-2'>

                        <label className='font-bold text-lg flex-1/3 mr-3'>
                          Start
                        </label>

                        <input 
                        type='date'
                        onChange={((e)=>setStart_date(e.target.value))}
                        min='2023-07-10'
                        className={(start_date === ''&& red===true)?['-translate-x-2',redstartdateinputvalue].join(' '):['-translate-x-2',startdateinputvalue].join(' ')}
                         />

                        <div className='flex flex-row items-center'>

                        <input 
                        type='time'
                        onChange={((e)=>setStart_time(e.target.value))}
                        className={(start_time === ''&& red===true)?['-translate-x-2',redstarttimeinputvalue].join(' '):['-translate-x-2',starttimeinputvalue].join(' ')}
                         />

                         <h2 className='translate-x-3'>To</h2>

                         <input 
                        type='time'
                        onChange={((e)=>setEnd_time(e.target.value))}
                        className={(end_time === ''&& red===true)?redstarttimeinputvalue:starttimeinputvalue}
                         />

                        </div>


                      </div>

                      <textarea 
                      onChange={((e)=>setNotes(e.target.value))}
                      className='my-2 h-28 w-full border resize-none px-2 border-grayshade outline-none appearance-none rounded-lg'
                      placeholder='Notes here'
                      />

                      <div className='flex flex-row justify-end items-center my-2'>

                        <button onClick={handleClosePopup}
                         className='cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 mr-6 rounded-lg bg-red-500 text-white py-2 px-4'>
                          Cancel
                        </button>

                        <button 
                        onClick={Bookappointmentbutton}
                        className='cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 rounded-lg bg-blueshade2 text-white py-2 px-4'>
                          Save
                        </button>

                      </div>

                    </div>

                  </div>


                </Popup>


            </div>

        <div className='w-3/4 h-4/5 overflow-auto'>

          {/* {newevents!==null && JSON.stringify(newevents)} */}

        {newevents!==null?<Calendar 
        // views={['month','agenda']} 
        localizer={localizer}
        events={newevents}
        
        startAccessor='start_time'
        endAccessor='end_time'
        titleAccessor='subject'
        className='w-full z-10 h-screen overflow-auto'
         />:
         <Calendar 
        // views={['month','agenda']} 
        localizer={localizer}
        // events={newevents}
        
        startAccessor='start_time'
        endAccessor='end_time'
        titleAccessor='subject'
        className='w-full z-10 h-screen overflow-auto'
         />}

        </div>


        </div>
      
    </div>
  )
}
