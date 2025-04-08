import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';

function CustomTabPanel(props) {
  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Sidebar({statevalues, setstatevalues,  firstname, lastname, avatar, id, company_email, permissions,}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dashboardvalue=(id)=>{
    setstatevalues(prevState=>({...prevState,Sidebarselect:id }))
  }

  const [greeting, setGreeting] = useState("");

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

  return (
    <div className='h-screen bg-black w-full px-5 flex flex-col justify-start gap-4 text-white'>

        <Image
          className="
         object-cover 
         md:mt-10 md:mx-2
         mt-1
         cursor-pointer
         hover:scale-90
         transition 
         hidden md:block lg:block
         duration-300"
          src={"/Logo_white.png"}
          width={150}
          height={150}
          alt="Softmasters Comapany Limited"
          onClick={() =>
            (window.location.href = process.env.NEXT_PUBLIC_SOFTMASTERSWEB)
          }
        />

        <div className="w-24 h-24 rounded-full overflow-hidden ml-[45px] border-2 border-white">
          <Image
             className="object-cover w-full h-full"
             src={"/haroldoseifrimpong@gmail.com.jpeg"}
             width={150}
             height={150}
          />
        </div>


         <section className='md:translate-y-0 lg:translate-y-4 mx-2 md:w-full md:translate-x-4 lg:translate-x-0 pb-3'>
            <h2>{greeting},{' User '}</h2>
         </section> 


    <Box sx={{ width: '100%' }}>

    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab
      label={<FontAwesomeIcon icon={faReceipt}  color={value === 0 ? 'white' : 'grey'} className='h-6 w-6'/>}
      {...a11yProps(0)}
    />
    <Tab
      label={<FontAwesomeIcon icon={faUserGroup} color={value === 1 ? 'white' : 'grey'} className='h-6 w-6'/>}
      {...a11yProps(1)}
    />
  </Tabs>
</Box>

     <div className='-space-y-5'>

       <CustomTabPanel value={value} index={0}>
       <button onClick={()=>dashboardvalue(1)} className='text-xl'>Dashboard </button>
       </CustomTabPanel>

      <CustomTabPanel value={value} index={0} onClick={()=>dashboardvalue(22)}>
      <button onClick={()=>dashboardvalue(22)} className='text-xl'> Payment Voucher </button>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={0} onClick={()=>dashboardvalue(11)}>
      <button onClick={()=>dashboardvalue(11)} className='text-xl'> Contacts </button>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
      <button onClick={()=>dashboardvalue(4)} className='text-xl'> Calender </button>
      </CustomTabPanel>

      </div>

    </Box>

    </div>
  );
}
