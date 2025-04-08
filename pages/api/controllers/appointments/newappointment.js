import connect from "@/mongoose/connect";
import AppointmentTable from "../../models/newappointmentsbooking";


export default async function handler(req,res){

    try{
    await connect()
    const NewAppointmentTable= await new AppointmentTable({...req.body})

    if(NewAppointmentTable){
        NewAppointmentTable.save()
        res.status(201).json('Appointment Booked')

    }else{
        res.status(400).json('Bad Request')
    }
}catch{
    res.staus(503).json('Internal Server Error !!!')
}
}