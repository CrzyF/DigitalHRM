'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function RawRegistry({statevalues,setstatevalues, searching }) {
    const [registry,setRegistry]=useState(null);

    useEffect(() => {
        axios.get('/api/controllers/paymentvouchercontroller/enrollacompany/showcompanies')
        .then((response)=>setRegistry(response.data))
        
    }, [registry])

    const voucherselect=(payee)=>{
        setstatevalues(prevState=>({...prevState,Sidebarselect:11,payee:payee
        }))
    }

    const dashboardvalue=(id)=>{
      setstatevalues(prevState=>({...prevState,Sidebarselect:id }))
    }
    
  return (
    <div className='container'>

         <div className='container px-16 py-3 bg-grayshade5 flex flex-row items-center justify-start'>
            <h2 className='font-bold  text-lg mr-60 uppercase'>Contacts</h2>

            <button onClick={()=>dashboardvalue(2)}>
            <div className='bg-black shadow-lg hover:scale-110 transition-all ease-in-out cursor-pointer duration-300 flex flex-row items-center justify-center rounded-lg p-3 mx-6'>

             <p className='text-white'>Enroll Company</p>

             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-6 h-6 text-black bg-white rounded-full overflow-hidden mx-2">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>

              </div>
              </button>
        </div>

        <div className='h-screen px-16 mt-6  w-full overflow-auto'>
            {/* {JSON.stringify(registry)} */}

        {registry !== null && (
  <table className='w-full '>

    <tbody className='flex flex-col w-full justify-start'>

      {registry.filter((items)=>{
                  if(searching===""){
                    return true;
                  }else if(items.bussinessname.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }else if(items.bussinessType.toLowerCase().includes(searching.toLocaleLowerCase())){
                    return true;
                  }
                  return false;
                }).map((item, index) => (
        <tr key={item._id} className='w-full grid grid-cols-5 gap-4 py-2'>
          <td>{index+1}</td>
          <td>{item.bussinessname}</td>
          <td>{item.bussinessType}</td>
          <td  className='hover:bg-blueshade2 hover:text-white 
          hover:font-bold hover:scale-110 transition-all duration-300 ease-in-out
          bg-grayshade1 p-1 text-center rounded-lg cursor-pointer'>
            Call
        </td>
          <td onClick={()=>voucherselect(item.bussinessname)} className='hover:bg-black hover:text-white 
          hover:font-bold hover:scale-110 transition-all duration-300 ease-in-out bg-grayshade1 p-1 text-center rounded-lg cursor-pointer'>Voucher</td>
        </tr>
      ))}


    </tbody>
  </table>
)}

{registry ===null && <h2>Loading data...</h2>}


        </div>

    </div>
  )
}