import connect from "@/mongoose/connect"
import mongoose from "mongoose"
import PaymentVoucher from "../../models/paymentvoucher"

export default async function handler(req,res){
    if(req.method==='POST'){
        try{
            await connect()
            if(req.body.id){
            const pv= await PaymentVoucher.findById(req.body.id)
            res.json(pv)

        }else if(req.body.payee){
            const pv= await PaymentVoucher.find({payee:req.body.payee})
            res.json(pv)

        }else{
        res.status(404).json('Data cannot be processed')
    }
    
    }catch{
        res.status(503).json("Bad Gateway")
}
    }else{
        try{
        res.status(403).json("REQEST METHOD NOT ALLOWED")
    }catch{
        res.status(503).json("Bad Gateway")
    }
    }
}