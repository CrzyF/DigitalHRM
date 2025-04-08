import axios from 'axios';
import React,{ useState,useRef,useEffect } from 'react'
import Swal from 'sweetalert2';


export default function Editindividualregistry({ statevalues, setstatevalues }) {
const [greeting, setGreeting] = useState("");

  const [paymentsource, setPaymentsource] = useState("Cheque");

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


    const filelabel="text-grayshade0 text-sm text-center"
    const labelclassname = "text-md text-redshade";
    const textinputclassname="border border-grayshade appearance-none resize-none outline-none w-3/4 rounded-lg  focus:border-grayshade -translate-y-6 px-3"
    //px-2 py-2
    const inputclassname =
      "border-2 border-grayshade px-2 py-1 w-3/4 text-black focus:border-grayshade font-bold outline-none  text-xl rounded-lg appearance-none -translate-y-5";


    const payeenamedefine=(name)=>{
        payee.current.value=name
        setHiddenval('hidden')
      }


      const SaveDetails=()=>{

        const formdata = new FormData();

        statevalues?.content?._id?formdata.append('id',statevalues?.content?._id):null


        // formdata.append('user',firstname.toString() +' '+lastname.toString())
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
    
        payee.current?.value?formdata.append("payee",payee.current.value):null
        amount.current?.value?formdata.append("amount",amount.current.value):null
        description.current?.value?formdata.append("description",description.current.value):null
        formdata.append("vat",vat)
        formdata.append("withholding",withholding)
        formdata.append("commservice",commservice)
    
        fileInputRefs.file1.current?.files.length > 0 ? formdata.append("receipt", fileInputRefs.file1.current.files[0]) : null;
        fileInputRefs.file2.current?.files.length > 0 ? formdata.append("voucher", fileInputRefs.file2.current.files[0]) : null;
        fileInputRefs.file3.current?.files.length > 0 ? formdata.append("cheque", fileInputRefs.file3.current.files[0]) : null;
    
    
    
        axios.post('/api/controllers/paymentvouchercontroller/updatepaymentvoucher',formdata,{
          headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then((response)=>{
          Swal.fire({
            icon:'success',
            iconColor:'black',
            title:'data saved',
          })
          const new_data= response.data.pv
          
          setstatevalues(prevState=>({...prevState,...new_data,Sidebarselect:1,
           }))
    
        }).catch((e)=>{
          Swal.fire({
            icon:'error',
            title:'An errorr occurred please try again later'
          })
        })
        // alert(JSON.stringify(values_to_be_saved))
    
      }
    

    useEffect(() => {
        // Input values
        payee.current.value = statevalues?.content?.payee ?? '';
        amount.current.value = statevalues?.content?.amount ?? '';
        description.current.value = statevalues?.content?.description ?? '';
      
        // Phone number and name
        if (phonenumber.current && phonenumbername.current) {
          phonenumber.current.value = statevalues?.content?.phonenumber ?? '';
          phonenumbername.current.value = statevalues?.content?.phonenumbername ?? '';
        }
      
        // Account number
        if (accountnumber.current) {
          accountnumber.current.value = statevalues?.content?.accountnumber ?? '';
        }
      
        // Cheque number
        if (chequenumber.current) {
          chequenumber.current.value = statevalues?.content?.chequenumber ?? '';
        }
      
        // Bank
        if (bank.current) {
          bank.current.value = statevalues?.content?.bank ?? '';
        }
      
        // Picker name and phone
        if (pickername.current && pickerphone.current) {
          pickername.current.value = statevalues?.content?.pickername ?? '';
          pickerphone.current.value = statevalues?.content?.pickerphone ?? '';
        }
      
        // Set state values
        setVat(statevalues?.content?.vat === "false" ? false : true);
        setWithholding(statevalues?.content?.withholding === "false" ? false : true);
        setCommservice(statevalues?.content?.commservice === "false" ? false : true);
      setPaymentsource(statevalues?.content?.paymentsource ?? '');

      }, [statevalues]);
      
      return (
        <div className="container mt-2">
    
      <div className="container bg-grayshade5 flex flex-row items-center justify-start px-16 py-1">
        <p className="text-2xl mx-5 lg:mr-80 font-bold">Voucher no {statevalues?.content?.pvno}</p>
        <p className="text-md font-bold">See All</p>
      </div>
    
      <div className="container grid grid-cols-2 gap-4 px-20">
    
        <div className="grid grid-rows-5">
    
        <section className="grid grid-cols-1 grid-rows-2 gap-2 ">
        <label className={labelclassname}>
          Payee/Beneficiary
          
        </label>
    
        <section>
        <input
          className={inputclassname}
          placeholder="Payee Name"
          ref={payee}
        />
        </section>
    
      </section>
    
      <section className="grid grid-cols-1 grid-rows-2 gap-2  z-10">
        <label className={labelclassname}>
          Amount
          
        </label>
    
        <section>
        <input
          className={inputclassname}
          placeholder="12345"
          ref={amount}
        />
        </section>
    
      </section>
    
      <section className="grid grid-cols-1 grid-rows-2 gap-2">
        <label className={labelclassname}>Description</label>
    
        <textarea
        className={textinputclassname}
        ref={description}
        placeholder='This is a payment for ABCDE et'
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
          checked={vat}
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
          checked={withholding}
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
          checked={commservice}
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
          placeholder="Bank  Name"
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
          placeholder="Account number"
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
          placeholder="Phone number"
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
          placeholder="Name on Number"
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
          placeholder="Cheque number"
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
          placeholder="picker name"
          ref={pickername}
        />
      </section>
    
    
      <section className="grid grid-cols-1 grid-rows-2 gap-2 w-full">
        <label className={labelclassname}>
          Picker Phone number
    
        </label>
    
        <input className={inputclassname}
          placeholder="picker name"
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
    
    
          </section>
    
       </section>
    
        </div>
    
      </div>
    
      </div>
      )
}
