import connect from '@/mongoose/connect';
import Employee from '../../models/employee';

export default async function handler(req,res) {
    try{
    if(req.method==='GET'){
        connect()
        const employees=await Employee.find()
        res.json({
            user:employees
        })

    }
}catch{((e)=>{console.log('an error occured from the user list')})}
}