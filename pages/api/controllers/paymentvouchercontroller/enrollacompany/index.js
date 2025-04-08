import connect from "@/mongoose/connect"
import Enrollacompanymodel from "@/pages/api/models/enrollacompanymodel"

export default async function(req,res){
    if(req.method==="POST"){
        try{
        await connect()
        const enrollacompany=await new Enrollacompanymodel({...req.body})
        enrollacompany.save()
        res.json(enrollacompany)
    }catch{
        res.status(503).json("Server Error!!!!")
    }
    
    } else{
        res.status(403).json("Invalid method")
    }
}