import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

// /dashboard/paymentvoucher/newvocher/receiptpage.js

export default function NewVoucherReceipt(statevalues,setstatevalues) {
  const router = useRouter();
  var count =0;
  const {
    payee,
    receiptnumber,
    pickername,
    pickerphone,
    paymentsource,
    accountnumber,
    userinfo,
    amount,
    chequenumber,
    idquery,
    user,
    companyname,
  } = router.query ?? {};

  const [newstate, setNewstate] = useState(null);
  const [currentdate, setCurrentdate] = useState(new Date());
  const idvar = useRef(null);
  const [currenthours, setCurrenthours] = useState(new Date());
  const [urlvar, setUrlvar] = useState(null);

  useEffect(() => {
    try {
      if (parseInt(currentdate.getHours()) > 12) {
        setCurrenthours(parseInt(currentdate.getHours()) - 12);
      } else {
        setCurrenthours(parseInt(currentdate.getHours()));
      }
    } catch {
      console.log('an error occurred');
    }
  }, [currentdate]);

  
  useEffect(() => {
    if (idquery !== null && count==0) {
        count +=1
      axios.post('/api/controllers/paymentvouchercontroller/oneresult', { id: idquery })
        .then((response) => {
          setNewstate(response.data);
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        });
    }
  }, [idquery]);
  

  

  useEffect(() => {
    if (statevalues?.statevalues !== null && idvar.current !== null) {
      setUrlvar(
        `https://66a1-102-176-83-98.ngrok-free.app/dashboard/paymentvoucher/newvocher/receiptpage?idquery=${idquery}`
      );
    }
  }, [statevalues]);

  const dashboardvalue = () => {
    // setstatevalues?.statevalues(prevState=>({...prevState,Sidebarselect:1 }))
    router.reload();
  };

return (
    <div className='container'>

        <div className='bg-grayshade5 py-3 pr-3 flex flex-row pl-10 items-center justify-between'>
            <div className='flex flex-row justify-around cursor-pointer' onClick={dashboardvalue}>
                

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="overflow-hidden font-bold w-6 h-6 text-white bg-black rounded-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
                <span className='mx-4'>Edit</span>
            </div>

            <h2 className='font-bold text-2xl'> {statevalues?.statevalues?.companyname} Voucher Summary</h2>

            {statevalues?.statevalues !==null ?<div>PV #:<span className='font-bold text-md mx-1'>{statevalues?.statevalues?.companyname} </span> </div>:
            <div>PV #:<span className='font-bold text-md mx-1'>{newstate !==null&& newstate?.companyname} </span> </div>
            }

        </div>

        <div className='bg-grayshade8 py-4 px-20 flex flex-row justify-between items-center'>

            {statevalues?.statevalues !==null ?<div>PV #:<span className='font-bold text-md mx-1'>{statevalues?.statevalues?.pvno} </span> </div>:
            <div>PV #:<span className='font-bold text-md mx-1'>{newstate !==null&& newstate?.pvno} </span> </div>
            }

           {statevalues?.statevalues !==null ?<p>Date:<span className='font-bold text-md mx-1'>{statevalues?.statevalues?.date} {statevalues?.statevalues?.time}</span> </p>
           :
           <p>Date:<span className='font-bold text-md mx-1'>{newstate?.date} {newstate?.time}</span> </p>
            }

        </div>

        <div className='grid grid-cols-3 gap-4 px-20 py-2'>

            <div className='grid grid-rows-4 gap-4'>

                <div>
                <h2>Payee</h2>

                {statevalues?.statevalues !==null ?statevalues?.statevalues?.payee && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.payee}</p>
                :
                newstate?.payee!==null&&<p className='font-bold text-lg'>{newstate?.payee}</p>
                }

                </div>

                <div>
                <h2>Description</h2>

                {statevalues?.statevalues !==null ?statevalues?.statevalues?.description && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.description}</p>:
                newstate?.description !==null&& <p className='font-bold text-lg'>{newstate?.description}</p>
                }
                </div>
                
                {statevalues?.statevalues !==null ?(statevalues?.statevalues?.paymentsource==='Cheque' || statevalues?.statevalues?.paymentsource==='Cash') && statevalues?.statevalues?.pickername &&
                
                <div>
                <h2>Picker Name</h2>

                {statevalues?.statevalues?.payee && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.pickername}</p>
                }
                </div>
                :
                (newstate?.paymentsource==='Cash'|| newstate?.paymentsource==='Cheque') && newstate?.pickername !==null&&
                <div>
                <h2>Picker Name</h2>

                {payee !==null&& 
                <p className='font-bold text-lg'>{newstate.pickername}</p>
                }
                </div>
                }

                {statevalues?.statevalues !==null ?(statevalues?.statevalues?.paymentsource==='Cheque' || statevalues?.statevalues?.paymentsource==='Cash')&& statevalues?.statevalues?.pickerphone &&
                
                <div>
                <h2>Picker Phone Number</h2>

                {statevalues?.statevalues?.pickerphone !==null&& 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.pickerphone}</p>
                }
                </div>
                :
                (newstate?.paymentsource==='Cash'|| newstate?.paymentsource==='Cheque') && newstate?.pickerphone!==null &&
                <div>
                <h2>Picker Phone Number</h2>

                {newstate?.pickerphone !==null&& 
                <p className='font-bold text-lg'>{newstate?.pickerphone}</p>
                }
                </div>
                }

            </div>


            <div className='grid grid-rows-4 gap-4'>

                <div>
                <h2>Payment Type</h2>

                {statevalues?.statevalues !==null ?statevalues?.statevalues?.paymentsource && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.paymentsource}</p>:
                newstate?.paymentsource !==null&& 
                <p className='font-bold text-lg'>{newstate?.paymentsource}</p>
                }
                </div>

                <div>
                <h2>Amount (GHS)</h2>

                {statevalues?.statevalues !==null?statevalues?.statevalues?.amount && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.amount}</p>
                :
                amount && 
                <p className='font-bold text-lg'>{amount}</p>
                }
                </div>

                <div>
               {statevalues?.statevalues !==null?(statevalues?.statevalues?.paymentsource==="Cheque" ||statevalues?.statevalues?.paymentsource==="Wire transfer") &&
                <h2>Account Number</h2>:
                newstate !==null&&(newstate.paymentsource==="Cheque" ||newstate.paymentsource==="Wire transfer") &&
                <h2>Account Number</h2>
                }

                {statevalues?.statevalues !==null&&statevalues?.statevalues?.paymentsource==="MTN Mobile Money" ?<h2>Phone Number</h2>:
                newstate !==null&&newstate.paymentsource==="MTN Mobile Money" &&<h2>Phone Number</h2>
                }

                

                {statevalues?.statevalues !==null?(statevalues?.statevalues?.paymentsource==="Cheque" ||statevalues?.statevalues?.paymentsource==="Wire transfer") &&
                <p className='font-bold text-lg'>{statevalues?.statevalues?.accountnumber}</p>:

                newstate !==null&&(newstate.paymentsource==="Cheque" ||newstate.paymentsource==="Wire transfer") &&
                <p className='font-bold text-lg'>{newstate.accountnumber}</p>

                }

                {statevalues?.statevalues !==null&&statevalues?.statevalues?.paymentsource==="MTN Mobile Money" ?<p className='font-bold text-lg'>{statevalues?.statevalues?.phonenumber}</p>
                :''
                }
               
                </div>

                {statevalues?.statevalues !==null&&statevalues?.statevalues?.paymentsource==="MTN Mobile Money" &&<div>
                <h2>Name on Phone Number</h2>

                <p className='font-bold text-lg'>{statevalues?.statevalues?.phonenumbername}</p>

                </div>}

                {statevalues?.statevalues !==null && (statevalues?.statevalues?.paymentsource==='Cheque' || statevalues?.statevalues?.paymentsource==='Wire transfer') &&<div>
                <h2>Bank</h2>

                {statevalues?.statevalues !==null&&statevalues?.statevalues?.bank && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.bank}</p>
               
                }
                </div>}

                {statevalues?.statevalues !==null?statevalues?.statevalues?.paymentsource ==="Cheque" &&<div>
                <h2>Cheque Number</h2>

                {statevalues?.statevalues?.chequenumber && 
                <p className='font-bold text-lg'>{statevalues?.statevalues?.chequenumber}</p>
                
                }
                </div>
                :
                paymentsource!==null && paymentsource ==="Cheque" &&<div>
                <h2>Cheque Number</h2>

                {chequenumber!==null && chequenumber && 
                <p className='font-bold text-lg'>{chequenumber}</p>
                
                }
                </div>
                }

            </div>


            <div>

                {statevalues?.statevalues !==null?
                
                statevalues?.statevalues?.user && 
                
                <div >

                <h2>Prepared By:</h2>
                <p className='font-bold text-lg my-2'>{statevalues?.statevalues?.user}</p>
                
                <section className='w-20 h-20'>

                {(statevalues?.statevalues?.paymentsource==="Cheque" || statevalues?.statevalues?.paymentsource==="Cash") &&
                <QRCode
                      size={128}
                      style={{height: "auto", maxWidth: "100%", width: "100%" }}
                      value={`https://66a1-102-176-83-98.ngrok-free.app/dashboard/paymentvoucher/newvocher/receiptpage?idquery=${statevalues?.statevalues?._id}`}
                    viewBox={`0 0 256 256`}
                      />
                      }
                </section>

                </div>
                :
                user !==null && 
                
                <div >
                <p className='font-bold text-lg my-2'>{user}</p>
                
                <section className='w-20 h-20'>

                {paymentsource!==null && paymentsource==="Pick Up" &&
                <QRCode
                size={128}
                style={{height: "auto", maxWidth: "100%", width: "100%" }}
                value={'jkjkl'}
                viewBox={`0 0 256 256`}
                      />}
                </section>

                </div>
                
                }

                    
                     

            </div>

        </div>

        <div className='bg-grayshade8 p-4 justify-end'>
            
        <div
        className="bg-darkshade hover:scale-110 w-1/6
        transition-all duration-300 ease-in-out cursor-pointer
        text-white py-4 px-4 rounded-lg  mb-2 ml-auto
        text-center flex flex-row justify-between items-center
        ">
        <span>Finish</span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
        </div>

        </div>
      
    </div>
  )
}

