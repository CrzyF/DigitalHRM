import multer from "multer";
import fs from 'fs';
import AppointmentBooking from "../../models/appointmentbooking";
import EMAILNOTIFICATION from "../notification/email";
import SMSNOTIFICATION from "../notification/sms";
import Employee from "../../models/employee";
import connect from "@/mongoose/connect";

export const config={
    api:{
      bodyParser:false
    }
  }
  
  const storage=multer.diskStorage({
    destination:function(req,files,cb){
        const uploadDir = './public/appointments/';
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename:function(req,file,cb){
        const add = req.body.name+ '.jpeg'//path.extname(file.originalname)
        cb(null,add)
    },
  })
  
  
  const upload = multer({ storage: storage })

export default async function handler(req,res) {
    try{
      connect
  if(req.method==='GET'){
  res.json({message:'here I am'})

}else if(req.method==='POST'){

    upload.single('selfie')(req, res,async function (err) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
        } else {
        const selfiename = req.body.name+ '.jpeg'

        const appointmentbooking=await new AppointmentBooking(
            {name:req.body.name,
            phone:req.body.phone,
            employee:req.body.employee,
            datetime:req.body.datetime,
            purpose:req.body.purpose,
            selfie:selfiename,
            status:'Awaiting'
            })
        appointmentbooking.save()
        
        const Empuser=await Employee.findOne({fullname:req.body.employee})
        const emailtitle='Appointment booked-Softmasters'
        
        const emailhtmlbody=`<h2 style='font-weight:bold'>Appointment booked!!! <br/>By: ${req.body.name} at ${req.body.datetime} <br/>Visitor contact: ${req.body.phone}</h2>`
        
        const smsmail=`Appointment booked by: ${req.body.name} at ${req.body.datetime} ... Visitor contact: ${req.body.phone}!!!`

        const emailfilename=selfiename
        const emailfullpath='./public/appointments/'+selfiename
        

        EMAILNOTIFICATION(Empuser.company_email,emailtitle,emailhtmlbody,emailfilename,emailfullpath)
        SMSNOTIFICATION(smsmail,Empuser.company_phone)

 
        res.json({success:true})

        }
    }
)

}

}catch{((e)=>{
    console.log('An error occurred in the appointment booking server')
})}

}
