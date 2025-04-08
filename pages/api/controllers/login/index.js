import connect from '@/mongoose/connect'
import Employee from '../../models/employee'
import bcrypt from 'bcrypt'

export default async function Login(req,res){
    try{
    if(req.method='POST'){
        connect()
        console.log(req.body)
        const {company_email}=req.body
        const {company_password}=req.body
        const userinfo=await Employee.findOne({company_email})
        if(userinfo){
        const compare = await bcrypt.compare(company_password,userinfo.company_password)
        if(compare===true){
        res.json({
            message:'Access granted',
            userdata:{
                firstname:userinfo.firstname,
                lastname:userinfo.lastname,
                company_email:userinfo.company_email,
                company_phone:userinfo.company_phone,
                profilepicture:userinfo.profilepicture,
                permissionsvalue:userinfo.permissionsvalue,
                companyid:userinfo.companyid,
            }
        })
        }else{
            res.json({error:'Illegal Access,Password incorrect'})
        }

    }else{
        res.json({error:'Email not recognized'})
    }
        console.log('userinfo')
        console.log(compare)

    }
}catch{((e)=>{
    console.log('An error occurred')
})}
}