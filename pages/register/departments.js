import React,{useRef, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2';

export default function Departments() {
    const Router=useRouter();
  const {firstname,lastname,avatar,company_email}=Router.query
    const itemslistedRef = useRef([]);
    const optionslist= [
      'Administration',
      'Human Resources',
      'Finance & Accounting',
      'Project Management',
      'QA & Testing',
      'Technical Support',
      'Network & Infrastructure',
      'Software Development',
    ];
    const currentList = itemslistedRef.current;
    const [selecteditem,setSelecteditem]=useState('off')
    const [idvalue,setIdvalue]=useState(0)
    const [selected,setSelected]=useState({backgroundColor:'white',color:'black',fontWeight:'normal'})

    const Selectedfunction=(id)=>{
        if(currentList.includes(id)===true){
        currentList.splice(currentList.indexOf(id),1)
        }else{
            //for only one option at a time
            currentList.length=0
            //feel free to delete the line in the middle to make multiple options available
        currentList.push(id)
        }
        if(selecteditem==='off'){
            setSelecteditem('on')
            setSelected({backgroundColor:'black',color:'white',fontWeight:'normal'})
        }else{
            setSelecteditem('off')
            setSelected({backgroundColor:'white',color:'black',fontWeight:'normal'})
        }
    
        }

    const finalizeregistration=()=>{
        if(currentList.length===0){
            Swal.fire({
                icon:'error',
                title:'Unknown department',
                text:'Select at least one option',
                timer:5000,
                timerProgressBar:true
            })
        }else{

        Router.push({pathname:'/register/summary',query:{firstname:firstname,lastname:lastname,avatar:avatar,company_email:company_email,permissions:optionslist[currentList-1]}})

        }

    }
  return (
    <div className='container md:mx-2 mx-2 md:flex lg:flex md:justify-center lg:justify-center items-center h-screen'>
      <div>
        <h3 className='text-grayshade2'>Choose your 
        <span className='text-4xl font-bold text-black block my-3'>Department</span>
        </h3>

        <h3 className='text-grayshade2'>What department will you be working in</h3>

        <div className='grid grid-rows-2 gap-4 my-8'>

            <div className='flex flex-col w-1/2 md:w-full lg:w-full  lg:md:flex-row md:flex-row my-3'>

             <button 
             onClick={()=>Selectedfunction(1)}
             style={currentList.includes(1)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
             className="text-bold 
             hover:transition-all hover:scale-110 
             duration-300 ease-in-out py-2 my-4 md:my-0 lg:my-0 lg:p-4 md:p-2 ml-0 mr-3
              hover:bg-black hover:text-white hover:font-bold
             rounded-lg border-2 border-black text-center">
               Administration
             </button>
              
            

            <button 
            onClick={()=>Selectedfunction(2)}
            style={currentList.includes(2)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2 my-4 md:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:my-0 lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
            Human Resources
        </button>

        <button 
        onClick={()=>Selectedfunction(3)}
        style={currentList.includes(3)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
        
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2 my-4 md:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:my-0 lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
              Finance & Accounting
        </button>

        <button 
        onClick={()=>Selectedfunction(4)}
        style={currentList.includes(4)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
        
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2 my-4 md:my-0 lg:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
              Project Management
        </button>

            </div>

            <div className='flex flex-col w-1/2 md:w-full lg:w-full lg:md:flex-row md:flex-row my-1 md:my-3 lg:my-3 lg:translate-x-0 md:translate-x-0 translate-x-48 -translate-y-80  md:-translate-y-0 lg:-translate-y-0'>
                
            <button 
            onClick={()=>Selectedfunction(5)}
            style={currentList.includes(5)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
            
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2  md:my-0 lg:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
              QA & Testing
            </button>

            <button 
            onClick={()=>Selectedfunction(6)}
            style={currentList.includes(6)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
            
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2 my-8 md:my-0 lg:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
              Technical Support
            </button>

            <button 
            onClick={()=>Selectedfunction(7)}
            style={currentList.includes(7)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
            
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2 -my-2 md:my-0 lg:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
              Network & Infrastructure
            </button>

            <button 
            onClick={()=>Selectedfunction(8)}
            style={currentList.includes(8)===true?{backgroundColor:'black',color:'white',fontWeight:'normal'}:{}}
            
            className="text-bold 
            hover:transition-all hover:scale-110 
            duration-300 ease-in-out py-2 my-6 md:my-0 lg:my-0 
            hover:bg-black hover:text-white hover:font-bold
            lg:p-4 md:p-2 ml-0 mr-3
            rounded-lg border-2 border-black text-center">
              Software Development
            </button>

            </div>

        </div>

        <section className='flex flex-row w-1/2 my-12 md:my-0 lg:my-0   justify-evenly ml-auto -translate-y-96 md:translate-y-0 lg:translate-y-0 -translate-x-52 md:translate-x-0 lg:translate-x-0 '>
        <button 
        onClick={finalizeregistration}
            className="flex flex-row text-bold p-4 rounded-lg 
            border-2 justify-center w-full md:w-1/2 lg:w-1/2 text-white
            hover:transition-all hover:scale-110 duration-300 ease-in-out
              bg-darkshade mx-40 md:mx-3 lg:mx-3">
              Continue
              <span className='mx-2'>
             
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
            
            <section className='flex flex-row justify-evenly'>
            
            <Image 
            src={'/ellipse2.png'} 
            alt='ellipse2'
            width={10}
            height={10}
            className='mx-1 object-contain'
            />

            <Image 
            src={'/ellipse3.png'} 
            alt='ellipse1'
            width={10}
            height={10}
            className='mx-1 object-contain'

            />

            <Image 
            src={'/ellipse1.png'} 
            alt='ellipse2'
            width={20}
            height={20}
            className='mx-1 object-contain'
            />

            <Image 
            src={'/ellipse2.png'} 
            alt='ellipse4'
            width={10}
            height={10}
            className='mx-1 object-contain'

            />

            <Image 
            src={'/ellipse2.png'} 
            alt='ellipse5'
            width={10}
            height={10}
            className='mx-1 object-contain'

            />
            </section>
        </section>

        <Image
        className="
         object-cover 
         cursor-pointer 
         hover:scale-110 
         transition 
        lg:translate-x-0
        lg:translate-y-0
        md:translate-x-7
        md:translate-y-6
        translate-x-2
        -translate-y-96
         duration-300"
        src={'/softblack 1.png'}
        width={200}
        height={200}
        alt="Softmasters Comapany Limited"
        onClick={()=>window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB}
        /> 

      </div>
    </div>
  )
}
