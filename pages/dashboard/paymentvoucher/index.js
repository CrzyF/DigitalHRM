import React, { createContext, useState } from 'react'
import NewVoucher from './newvocher'


export default function PaymentVoucher({permissions,avatar,firstname,lastname,id,company_email}) {
  // permissions={permissions} 
  //   avatar={avatar}
  //   firstname={firstname} 
  //   lastname={lastname} 
  //   id={id}
  //   company_email={company_email}
    const [statevalues,setstatevalues]=useState({
    nextbutton:1,
    Sidebarselect:1,
    permissions:"Software Development", 
    avatar:"haroldosei24@gmail.com.jpeg",
    firstname:"Peter", 
    lastname:"Frimpong", 
    id:627543229176,
    company_email:"peterfrimpong@gmail.com"
    });

  return (

    <NewVoucher
    statevalues={ statevalues }
    setstatevalues={ setstatevalues }
    permissions={"Software Development"} 
    avatar={"haroldosei24@gmail.com.jpeg"}
    firstname={"Peter"} 
    lastname={"Frimpong"} 
    id={"627543229176"}
    company_email={"peterfrimpong@gmail.com"}
       />
  )
}
