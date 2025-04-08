import React from 'react'
import bcrypt from 'bcrypt'
import connect from '@/mongoose/connect'
import Employee from '../../models/employee'

export default async function Register(req,res) {
  if(req.method==='GET'){
    res.json({message:'getting'})
  }
  else if(req.method==='POST'){
    try{
    connect()
    const password =await bcrypt.hash(req.body.company_password,10)
    
    const employee=new Employee({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      company_email:req.body.company_email,
      company_phone:req.body.company_phone,
      company_password:password,
    })

    employee.save()

    res.json({message:'Data saved successfully'})
  }
  catch{((e)=>{
console.log('an error occured')
console.log(e)
  })}
  }
}
