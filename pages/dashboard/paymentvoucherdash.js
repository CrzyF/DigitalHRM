'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faAddressCard, faReceipt } from '@fortawesome/free-solid-svg-icons';


export default function Paymentvoucherdash({statevalues,setstatevalues, searching }) {
    const [registry,setRegistry]=useState(null);

    useEffect(() => {
        axios.get('/api/controllers/paymentvouchercontroller/getall')
        .then((response)=>setRegistry(response.data))
        
    }, [registry])

    const voucherselect=(payee)=>{
        setstatevalues(prevState=>({...prevState,Sidebarselect:6,payee:payee
        }))
    }

    const dashboardvalue=(id)=>{
      setstatevalues(prevState=>({...prevState,Sidebarselect:id }))
    }

    const [showAllData, setShowAllData] = useState(false);

    const handleShowAllData = () => {
      setShowAllData((prevShowAllData) => !prevShowAllData);
    };
    
    
  return (
    <div className='container'>

<div className='container px-16 py-3 bg-grayshade5 flex flex-row items-center justify-start'>
            <h2 className='font-bold  text-lg mr-60 uppercase'>Payment Voucher</h2>

            <button onClick={()=>dashboardvalue(3)}>
            <div className='bg-black shadow-lg hover:scale-110 transition-all ease-in-out cursor-pointer duration-300 flex flex-row items-center justify-center rounded-lg p-3 mx-6'>

             <p className='text-white'>Add Payment Voucher</p>

             <FontAwesomeIcon icon={faReceipt} className='w-6 h-6 text-white rounded-full overflow-hidden mx-2'/>

              </div>
              </button>
        </div>

        <div className='h-screen px-16 mt-6  w-full overflow-auto'>
            {/* {JSON.stringify(registry)} */}

        {registry !== null && (
  <table className='w-full '>

    <tbody className='flex flex-col w-full justify-start'>

    <div className='w-full grid grid-cols-6 gap-[10px] py-2 mr-20'>

    <div className='left-[5%]'>
    <th>#</th>
    </div>
    
    <div className='left[10%]'>
    <th>Beneficiary</th>
    </div>

    <div className='left-[55%]'>
    <th>Description</th>
    </div>

    <th>Amount</th>

    <th>Date/Time</th>
    </div>

    {registry
  .filter((items) => {
    if (searching === "") {
      return true;
    } else if (
      items.companyname.toLowerCase().includes(searching.toLocaleLowerCase())
    ) {
      return true;
    } else if (items.payee.toLowerCase().includes(searching.toLocaleLowerCase())) {
      return true;
    }
    return false;
  })
  .slice(0, showAllData ? registry.length : 8)
  .map((item, index) => (
    <tr key={item._id} className='w-full grid grid-cols-6 gap-[75px] py-2'>
      <td>{index + 1}</td>
      <td>{item.payee}</td>
      <div className='max-w-xs overflow-hidden truncate'>
        <td>{item.description}</td>
      </div>
      <td>{item.amount}</td>
      <div className='w-[150%]'>
        <td>
          {`${new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}  at ${item.time}`}
        </td>
      </div>
      <td
        onClick={() => voucherselect(item.payee)}
        className='hover:bg-black hover:text-white 
        hover:font-bold hover:scale-110 transition-all duration-300 ease-in-out bg-grayshade1 p-1 text-center rounded-lg cursor-pointer'
      >
        View
      </td>
    </tr>
  ))}


    </tbody>
  </table>
)}

{registry ===null && <h2>Loading data...</h2>}

          <div className='flex justify-end'>

             <button onClick={handleShowAllData} className='pt-5 flex justify-end'>
                 <div className='bg-black shadow-lg hover:scale-110 transition-all ease-in-out cursor-pointer duration-300 flex flex-row items-center justify-end rounded-lg py-1 px-3 '>
                    <p className='text-white'>View All</p>
                </div>
             </button>

          </div>

        </div>

    </div>
  )
}
