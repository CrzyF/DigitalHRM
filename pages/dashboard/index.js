import { useRouter } from 'next/router'
import React from 'react'
import Administrationdashboard from './administrationdashboard'
import PaymentVoucher from './paymentvoucher'

export default function Dashboardindex() {
const Router=useRouter()
const {firstname,lastname,profilepicture,permissionsvalue,company_email,companyid}=Router.query??{}
const fullname=firstname+' '+lastname
console.log(Router.query)
  return (
    <div>
      {fullname?
      <PaymentVoucher
      permissions={permissionsvalue} 
      avatar={profilepicture}
      firstname={firstname} 
      lastname={lastname} 
       id={companyid}
       company_email={company_email}
       />
       :
      <Administrationdashboard
       permissions={permissionsvalue} 
       avatar={profilepicture}
       firstname={firstname} 
       lastname={lastname} 
        id={companyid}
        company_email={company_email}
        />
      }
    </div>
  )
}
