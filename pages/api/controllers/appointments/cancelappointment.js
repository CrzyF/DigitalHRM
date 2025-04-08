import AppointmentBooking from "../../models/appointmentbooking"
import Employee from "../../models/employee"
import EMAILNOTIFICATION from "../notification/email"
import SMSNOTIFICATION from "../notification/sms"

export default async function handler(req,res) {
    try{

    if(req.method==='POST'){    
            
    const AppointBookingReschedule = await AppointmentBooking.findByIdAndUpdate(req.body.id,{
        status:'Cancelled',
    })
    AppointBookingReschedule.save()

    const Empuser=await Employee.findOne({fullname:AppointBookingReschedule.employee})
    const emailtitle='Appointment Cancelled-Softmasters'
    const emailhtmlbody=`<h2 style='font-weight:bold'>Appointment Cancelled: <br/> Appointment made by visitor:${AppointBookingReschedule.name} for ${AppointBookingReschedule.datetime}  was cancelled!!!<br/> Visitor contact: ${AppointBookingReschedule.phone}.</h2>`
    const smsmail=`Appointment Cancelled-Softmasters,visitor:${AppointBookingReschedule.name} for ${AppointBookingReschedule.datetime} was cancelled!!!... Visitor contact: ${AppointBookingReschedule.phone}!!!`
    const smsmail1=`Appointment Cancelled-Softmasters,for  ${AppointBookingReschedule.datetime}!!!`
    
    EMAILNOTIFICATION(Empuser.company_email,emailtitle,emailhtmlbody)
    SMSNOTIFICATION(smsmail,Empuser.company_phone)
    SMSNOTIFICATION(smsmail1,req.body.phone)

    res.json('Appointment Canclled')


    }

}catch{((e)=>{
    res.json('An error occurred in the appointment cancellation server section.')
})}

}
