import connect from "@/mongoose/connect"
import Enrollacompanymodel from "@/pages/api/models/enrollacompanymodel"

export default async function handler(req,res){
    if(req.method==="GET"){

        try{
            await connect()
            const companies=await Enrollacompanymodel.find()
            res.json(companies)

        }catch{
            res.status(503).json("Internal server error")
        }

    }else{
        res.status(403).json("Invalid request method")
    }
} 