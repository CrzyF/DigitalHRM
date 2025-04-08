import connect from "@/mongoose/connect";
import AppointmentBooking from "../../models/appointmentbooking";
import Employee from "../../models/employee";
import EMAILNOTIFICATION from "../notification/email";
import SMSNOTIFICATION from "../notification/sms";


export default async function handler(req,res){
    if(req.method==='GET'){
        res.json('working')
    }
    else if(req.method==='POST'){
        try{
        connect()
        const AppointBookingReschedule = await AppointmentBooking.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            phone:req.body.phone,
            employee:req.body.employee,
            datetime:req.body.datetime,
            purpose:req.body.purpose,
            status:'Rescheduled',
        })
        AppointBookingReschedule.save()
// Appointment booked!!! <br/>By: ${req.body.name} at ${req.body.datetime} <br/>Visitor contact: ${req.body.phone}
        const Empuser=await Employee.findOne({fullname:req.body.employee})
        const emailtitle='Appointment Rescheduled-Softmasters'
        const emailhtmlbody=`<h2 style='font-weight:bold'>Appointment Rescheduled: <br/> visitor:${req.body.name} for ${req.body.datetime} <br/> Visitor contact: ${req.body.phone}</h2>`
        const smsmail=`Appointment Rescheduled-Softmasters,visitor:${req.body.name} for ${req.body.datetime} ... Visitor contact: ${req.body.phone}!!!`
        const smsmail1=`Appointment Rescheduled-Softmasters,for  ${req.body.datetime}!!!`
        
        EMAILNOTIFICATION(Empuser.company_email,emailtitle,emailhtmlbody)
        SMSNOTIFICATION(smsmail,Empuser.company_phone)
        SMSNOTIFICATION(smsmail1,req.body.phone)
        
        res.json({success:true})

    }catch{((e)=>{console.log('An error occured in viewing the appointment booking data list')})}
    }

}