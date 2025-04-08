import connect from "@/mongoose/connect"
import AppointmentTable from "../../models/newappointmentsbooking"

export default async function handler(req,res){

    if(req.method==='GET'){

        try{

        await connect()
        const all_appointments=await AppointmentTable.find()
        res.json(all_appointments)
        }catch{
            res.status(503).json('An internal server error occurred')
        }

    }else{
        res.status(400).json('Method not valid')
    }
}