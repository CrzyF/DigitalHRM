import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Individualregistry({ description, amount, paymentsource, datetime,statevalues,setstatevalues }) {
  const [data, setData] = useState(null);
  const router= useRouter()

  const editpaymentvoucher=(content)=>{
    // alert(JSON.stringify(content))

    setstatevalues(prevState=>({...prevState,content:content,Sidebarselect:7,
    }))

  }

  useEffect(() => {
    if (statevalues !== null) {
      axios
        .post('/api/controllers/paymentvouchercontroller/oneresult', { payee: statevalues?.payee })
        .then((response) => {
          setData(response.data);
        })
        .catch((e) => {
          Swal.fire({
            icon: 'error',
            title: 'An error occurred',
            text: 'Unable to fetch data on this company please try again later',
          });
        });
    }
  }, [data]);

  return (
    <div className='container h-screen overflow-auto'>
      <div className='container px-16 py-3 bg-grayshade5 flex flex-row items-center justify-start'>
        <h2 className='font-bold text-lg mr-60 uppercase'>{statevalues !== null && statevalues?.payee}</h2>
        <p className='cursor-pointer'>See All</p>
      </div>

      <table className='w-full mt-6 mb-32'>
        <thead className='mb-10'>
          <tr className='py-16 bg-grayshade5'>
            <th className='py-2 font-normal'>Description</th>
            <th className='py-2 font-normal'>Amount</th>
            <th className='py-2 font-normal'>Payment Mode</th>
            <th className='py-2 font-normal'>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {data !== null &&
            data.map((items) => (
              <tr key={items._id} onClick={()=>editpaymentvoucher(items)} className='py-8 cursor-pointer hover:bg-grayshade4'>
                <td className='text-center'>{items.description === '' ? '--' : items.description}</td>
                <td className='text-center'>{items.amount === '' ? '--' : items.amount}</td>
                <td className='text-center'>{items.paymentsource === '' ? '--' : items.paymentsource}</td>
                <td className='text-center'>{items.date === '' ? '--' : items.date} - {items.time === '' ? '--' : items.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
