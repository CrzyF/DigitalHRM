import connect from "@/mongoose/connect";
import AppointmentBooking from "../../models/appointmentbooking";

export default async function handler(req,res){

    if(req.method==='GET'){
        try{
        connect()
        const Appointmentbooking=await AppointmentBooking.find()
        res.json(Appointmentbooking)

    }catch{((e)=>{console.log('An error occured in viewing the appointment booking data list')})}
    }

}