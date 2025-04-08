"use client";
import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import Link from "next/link";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import NewVoucherReceipt from "./receiptpage";
import Sidebar from "../../sidebar";
import Enrollacompany from "../enrollacompany";
import Registry from "../registry";
import Individualregistry from "../individualregistry";
import Editindividualregistry from "../editindividualregistry";
import Calendarpage from "../calendarpage";
import RawRegistry from "../rawregistry";
import Paymentvoucherdash from "../../paymentvoucherdash";


export default function NewVoucher({
statevalues,
setstatevalues,
  firstname,
  lastname,
  avatar,
  id,
  company_email,
  permissions,
}) {

  const filelabel="text-grayshade0 text-sm text-center"
  const labelclassname = "text-md text-redshade";

  const redtextinputclassname="border-2 border-red-500 appearance-none resize-none outline-none w-3/4 rounded-lg  focus:border-grayshade -translate-y-6 px-3"

  const textinputclassname="border-2 border-grayshade appearance-none resize-none outline-none w-3/4 rounded-lg  focus:border-grayshade -translate-y-6 px-3"
  //px-2 py-2
  const inputclassname =
    "border-2 border-grayshade px-2 py-1 w-3/4 text-black focus:border-grayshade font-bold outline-none  text-xl rounded-lg appearance-none -translate-y-5";

  const redinputclassname =
  "border-2 border-red-500 px-2 py-1 w-3/4 text-black focus:border-grayshade font-bold outline-none  text-xl rounded-lg appearance-none -translate-y-5";

//grayshade7


const [selectedOption, setSelectedOption] = useState('');

const fileInputRefs = {
  file1: useRef(null),
  file2: useRef(null),
  file3: useRef(null),
};

const handleOptionChange = (event) => {
  const optionValue = event.target.value;
  setSelectedOption(optionValue);
  optionValue !=="not"? fileInputRefs[optionValue].current?.click():null;
};

const handleFileChange = (event, optionValue) => {
  const file = event.target.files[0];
  console.log(`File ${optionValue}:`, file);
};

// import QRCode from "react-qr-code";
  const [appointmentsbooked, Setappointmentsbooked] = useState(null);
  const [greeting, setGreeting] = useState("");

  const [paymentsource, setPaymentsource] = useState("Cheque");

  const [companyname, setCompanyname] = useState("Softmasters Company Limited");

  const amount= useRef(null);

  const [pvstate, setPvstate] = useState(
    parseInt(Math.random() * 1000000000000)
  );

  const accountnumber =useRef(null);
  const chequenumber =useRef(null);
  const phonenumber = useRef(null);
  const phonenumbername = useRef(null);

  const [vat, setVat] =useState(false);

  const [withholding, setWithholding] =useState(false);


  const [commservice, setCommservice]  =useState(false);
  const [hiddenval,setHiddenval] = useState('block')

  const payee =useRef(null);
  const description = useRef(null);
  const receiptnumber =useRef(null);
  const bank =useRef(null);

  const pickername =useRef(null);
  const pickerphone =useRef(null);

  const [receiptfile, setReceiptfile] = useState("");
  const previousValue = useRef(null);


  const [countdown, setCountdown] = useState("");
  const deadlinetimelist = [];
  const [dayselected, setDayselected] = useState(1);
  const [searching, setSearching] = useState("");

  const [red, setRed] = useState(false);

  const Router = useRouter();

  // useEffect(() => {
  //   alert(JSON.stringify(statevalues))
  // }, [statevalues])

  const payeenamedefine=(name)=>{
    payee.current.value=name
    setHiddenval('hidden')
  }

  const SaveDetails=()=>{

    if(payee.current?.value!=='' && amount.current?.value!=='' && description.current?.value!==''){

      const formdata = new FormData();
      formdata.append('user',firstname.toString() +' '+lastname.toString())
      formdata.append('date',new Date().toString().substring(0, 16))
      formdata.append('time',new Date().toString().substring(16, 21))
  
      phonenumber.current?.value?formdata.append('phonenumber',phonenumber.current.value):null
      phonenumbername.current?.value?formdata.append('phonenumbername',phonenumbername.current.value):null
      bank.current?.value?formdata.append('bank',bank.current.value):null
  
      formdata.append("pvno",pvstate)
      accountnumber.current?.value?formdata.append("accountnumber",accountnumber.current.value):null
      chequenumber.current?.value?formdata.append("chequenumber",chequenumber.current.value):null
      pickername.current?.value?formdata.append("pickername",pickername.current.value):null
      pickerphone.current?.value?formdata.append("pickerphone",pickerphone.current.value):null
  
      formdata.append("paymentsource",paymentsource)

      formdata.append("companyname",companyname)
  
      payee.current?.value?formdata.append("payee",payee.current.value):null
      amount.current?.value?formdata.append("amount",amount.current.value):null
      description.current?.value?formdata.append("description",description.current.value):null

      formdata.append("vat",vat)
      formdata.append("withholding",withholding)
      formdata.append("commservice",commservice)
  
      fileInputRefs.file1.current?.files.length > 0 ? formdata.append("receipt", fileInputRefs.file1.current.files[0]) : null;
      fileInputRefs.file2.current?.files.length > 0 ? formdata.append("voucher", fileInputRefs.file2.current.files[0]) : null;
      fileInputRefs.file3.current?.files.length > 0 ? formdata.append("cheque", fileInputRefs.file3.current.files[0]) : null;


      axios.post('/api/controllers/paymentvouchercontroller',formdata,{
        headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((response)=>{
        setRed(false)
        Swal.fire({
          icon:'success',
          iconColor:'black',
          title:'data saved',
        })
        const new_data= response.data.pv
        
        setstatevalues(prevState=>({...prevState,companyname:companyname,...new_data,Sidebarselect:15,
         }))
  
      }).catch((e)=>{
        setRed(false)
        Swal.fire({
          icon:'error',
          title:'An errorr occurred please try again later'
        })
      })

    }else{
      setRed(true)
      Swal.fire({
        icon:'error',
        title:'Please fill in the compulsory fields'
      })
    }
   



    
    // alert(JSON.stringify(values_to_be_saved))

  }

  const ProcessingPage = () => {

    // axios

  };

  const localizer = momentLocalizer(moment);

  const summarypage = () => {
    Router.push({
      pathname: "register/summary",
      query: {
        firstname,
        lastname,
        avatar: process.env.NEXT_PUBLIC_HTTPLINK + "/uploads/" + avatar,
        permissions,
        company_email,
      },
    });
  };

  useEffect(() => {
    axios
      .get("/api/controllers/appointments/appointmentsbooked")
      .then((response) => {
        Setappointmentsbooked(response.data);
      });
  }, [appointmentsbooked]);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else if (hour >= 18 || hour < 5) {
      setGreeting("Good evening");
    }
  }, [greeting]);

  const [registry,setRegistry]=useState(null);

    useEffect(() => {
        axios.get('/api/controllers/paymentvouchercontroller/enrollacompany/showcompanies')
        .then((response)=>setRegistry(response.data))
        
    }, [registry])


    useEffect(() => {
      const interval = setInterval(() => {
        const newValue = payee?.current?.value; // Replace with your logic to get the updated value
  
        if (newValue !== previousValue.current) {
          previousValue.current = newValue;
          setHiddenval('block');
        }
      }, 1000); // Replace with your desired interval
  
      return () => {
        clearInterval(interval);
      };
    }, [payee]);



  return (
    <div className="container mr-2 flex flex-row items-start h-screen overflow-hidden">
      
      <div className="w-1/5">
        <Sidebar
        statevalues={ statevalues }
        setstatevalues={ setstatevalues }
        />
      </div>

    <div className="w-4/5 ">

    <nav className='flex flex-col md:flex-row lg:flex-row justify-between mx-8 items-center mt-1'>

<section className='flex flex-row'>

    {avatar?
    <a target='_blank' href={process.env.NEXT_PUBLIC_HTTPLINK+'/uploads/'+avatar}>
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

  

</section>


<section className='w-1/3 md:translate-x-4 lg:-translate-x-2 pt-[10px] pb-[10px]'>
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

{statevalues?.Sidebarselect===3&&
<div className="container mt-2">

  <div className="container bg-grayshade5 flex flex-row items-center justify-start px-16 py-1">
    <p className="text-2xl mx-5 lg:mr-[50px] font-bold text-center pl-[30%]">Payment Voucher</p>
  </div>

  <section className="grid grid-cols-1 w-[107%] grid-rows-2 gap-2 pl-[80px] pt-5">
      <label className={labelclassname}>Company Name</label>

      <select
        className={inputclassname}
        value={companyname}
        onChange={(e) => setCompanyname(e.target.value)}
      >
        <option>Softmasters Company Limited</option>
        <option>Engineering Systems & Services Limited</option>
      </select>
    </section>

  <div className="container grid grid-cols-2 gap-4 px-20">

    <div className="grid grid-rows-5">

    <section className="grid grid-cols-1 grid-rows-2 gap-2 ">
    <label className={labelclassname}>
      Payee/Beneficiary
      
    </label>

    <section>
    <input
    className={(red===true && payee.current?.value ==='')?redinputclassname:inputclassname}
      
      ref={payee}
    />

    <section className={(payee?.current?.value)?.length <= 0?'hidden':`${hiddenval} absolute bg-gray-200 rounded-lg w-1/4 -translate-y-5 h-32 z-30 overflow-auto`}>
    {
  registry !== null ? (
    (() => {
      const filteredItems = registry.filter((item) => {
        if (payee?.current?.value === "") return true;
        else if (
          item.bussinessname
            .toLowerCase()
            .includes(payee?.current?.value.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      });

      (()=>{
        if(filteredItems.length <1 && hiddenval==='block'){

          setTimeout(() => {
            setHiddenval('hidden')
          }, 500);
          
        }

      })()
   
      return filteredItems.map((items) => (
        <h2
          onClick={() => payeenamedefine(items.bussinessname)}
          className="p-2 font-bold hover:bg-white hover:cursor-pointer"
          key={items._id}
        >
          {items.bussinessname}
        </h2>
      ));
    })()
  ) : (
    ""
  )
}

    
     </section>


    </section>

  </section>

  <section className="grid grid-cols-1 grid-rows-2 gap-2  z-10">
    <label className={labelclassname}>
      Amount
      
    </label>

    <section>
    <input
      className={(red===true && amount.current?.value ==='')?redinputclassname:inputclassname}
  
      ref={amount}
    />
    </section>

  </section>

  <section className="grid grid-cols-1 grid-rows-2 gap-2">
    <label className={labelclassname}>Description</label>

    <textarea
    className={(red===true && description.current?.value ==='')?redtextinputclassname:textinputclassname}
    ref={description}

    />
  </section>

  <section className="grid grid-cols-1 grid-rows-2 gap-2">
  <p className={labelclassname}>Applicable taxes</p>

  <section className="grid grid-cols-3 gap-4 -translate-y-10">

  <section className="w-1/4 flex flex-row justify-around items-center">
    <input
      id="VAT"
      className="border-grayshade mx-1
focus:border-grayshade"
      type="checkbox"
      value={vat}
      onChange={(e) => setVat(e.target.checked)}
    />
    <label htmlFor="VAT" className="text-grayshade mx-1">
      VAT
    </label>
  </section>

  <section className=" w-1/4 flex flex-row justify-around items-center">
    <input
      id="Withholding"
      className="border-grayshade mx-1
focus:border-grayshade"
      type="checkbox"
      value={withholding}
      onChange={(e) => setWithholding(e.target.checked)}
    />
    <label htmlFor="Withholding" className="text-grayshade mx-1">
    Withholding
    </label>
  </section>

  <section className="w-2/4 flex flex-row justify-around items-center">
    <input
      id="commservice"
      className="border-grayshade mx-1
focus:border-grayshade"
      type="checkbox"
      value={commservice}
      onChange={(e) => setCommservice(e.target.checked)}
    />
    <label htmlFor="commservice" className="text-grayshade mx-1">
    COMM Service
    </label>
  </section>



  </section>

  </section>

  <div
  onClick={SaveDetails}
  className="-translate-y-6
"
>
  <span className="font-bold  bg-blueshade2 w-full
  cursor-pointer hover:scale-125 hover:bg-black
  text-white  text-2xl rounded-lg px-4 py-2">Save</span>

</div>
                    

    </div>

    <div className="flex flex-col justify-start items-start mt-2">

    <section className="grid grid-cols-1 w-full grid-rows-2 gap-2">
      <label className={labelclassname}>Payment Type</label>

      <select
        className={inputclassname}
        value={paymentsource}
        onChange={(e) => setPaymentsource(e.target.value)}
      >
        <option>Cheque</option>
        <option>Cash</option>
        <option>MTN Mobile Money</option>
        <option>Wire transfer</option>
      </select>
    </section>

    {(paymentsource === "Cheque" || paymentsource === "Wire transfer" )&&
    <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full -translate-y-2">
    <label className={labelclassname}>
      Bank
      
    </label>

    <input
      className={inputclassname}
      ref={bank}
    />
  </section>
   }

{(paymentsource === "Cheque" || paymentsource === "Wire transfer" )&&
    <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full -translate-y-4">
    <label className={labelclassname}>
      Account Number
    </label>

    <input
      className={inputclassname}
      ref={accountnumber}
    />
  </section>
   }

{paymentsource === "MTN Mobile Money"&&
    <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full -translate-y-4">
    <label className={labelclassname}>
      Phone Number
      
    </label>

    <input
      className={inputclassname}
   
      ref={phonenumber}
    />
  </section>
   }

{paymentsource === "MTN Mobile Money"&&
    <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full -translate-y-4">
    <label className={labelclassname}>
      Name on Number
    </label>

    <input
      className={inputclassname}
      ref={phonenumbername}
    />
  </section>
   }

{(paymentsource === "MTN Mobile Money" || paymentsource === "Wire transfer")&&<section className="my-4"></section>}

{paymentsource === "Cheque"&&
    <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full -translate-y-8">
    <label className={labelclassname}>
      Cheque Number
      
    </label>

    <input
      className={inputclassname}
      ref={chequenumber}
    />
  </section>
   }

{(paymentsource === "Cheque" || paymentsource==="Cash") &&
   <section className={paymentsource === "Cash"? "grid grid-cols-1 gap-1 w-full":"grid grid-cols-2 gap-1 -translate-y-10"}
   >

   <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full">
    <label className={labelclassname}>
      Picker Name

    </label>

    <input
      className={inputclassname}
      ref={pickername}
    />
  </section>


  <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full">
    <label className={labelclassname}>
      Picker Phone number

    </label>

    <input className={inputclassname}
      ref={pickerphone}
    />
  </section>

   </section>
   }

   <section className={paymentsource==="Cash"?
   "grid grid-cols-2 gap-12 -translate-y-2":"grid grid-cols-2 gap-12 -translate-y-12"}>

   <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRefs.file1}
        onChange={(e) => handleFileChange(e, 'file1')}
      />

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRefs.file2}
        onChange={(e) => handleFileChange(e, 'file2')}
      />

      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRefs.file3}
        onChange={(e) => handleFileChange(e, 'file3')}
      />

    <section className="grid grid-rows-2 gap-4">

      <label className={labelclassname}>Supporting Documents</label>

      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className='border border-grayshade appearance-none text-lg -translate-y-8 rounded-lg p-2'
      >
        <option value="not">Select an option</option>
        <option value="file1">Upload Cheque</option>
        <option value="file2">Upload Voucher</option>
        <option value="file3">Upload Receipts</option>
      </select>
      
    </section>


   <section>

        {/* <section
          onClick={ProcessingPage}
          className="bg-blueshade2 hover:scale-110
transition-all duration-300 ease-in-out cursor-pointer w-3/4
text-white py-3 px-4 rounded-lg  mb-2  mr-auto translate-y-7
text-center flex flex-row justify-between items-center
"
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </section> */}


      </section>

   </section>

    </div>

  </div>

  </div>
  }

{statevalues?.Sidebarselect===2 &&
<Enrollacompany
statevalues={ statevalues }
setstatevalues={ setstatevalues }
/>
}

{statevalues?.Sidebarselect===1 &&
<Registry
statevalues={ statevalues }
setstatevalues={ setstatevalues } 
  searching={searching}/>
}

{statevalues?.Sidebarselect===4 &&
<Calendarpage
  statevalues={ statevalues }
  setstatevalues={ setstatevalues }
   searching={searching}/>
}

  {statevalues?.Sidebarselect===15&&
  <NewVoucherReceipt
  statevalues={ statevalues }
    setstatevalues={ setstatevalues }
    />}

  {statevalues?.Sidebarselect===6&&
  <Individualregistry
  statevalues={ statevalues }
    setstatevalues={ setstatevalues }
    />}

{statevalues?.Sidebarselect===7&&
  <Editindividualregistry
  statevalues={ statevalues }
    setstatevalues={ setstatevalues }
    />}

{statevalues?.Sidebarselect===11&&
  <RawRegistry
  statevalues={ statevalues }
    setstatevalues={ setstatevalues }
    searching={searching}
    />}

{statevalues?.Sidebarselect===22&&
  <Paymentvoucherdash
    statevalues={ statevalues }
    setstatevalues={ setstatevalues }
    searching={searching}
    />}

        </div>

    </div>
  );
}
