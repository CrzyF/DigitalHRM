import connect from "@/mongoose/connect"
import mongoose from "mongoose"
import PaymentVoucher from "../../models/paymentvoucher"

export default async function handler(req,res){
    if(req.method==='GET'){
        try{
            await connect()
            const pv= await PaymentVoucher.find()
            res.json(pv)
        
    }catch{
        res.status(404).json('Data cannot be processed')
    }}else{
        
        res.status(403).json("REQEST METHOD NOT ALLOWED")
    }}