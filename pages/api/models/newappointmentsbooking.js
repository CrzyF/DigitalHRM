import mongoose from "mongoose";

const AppointmentsSchema = new mongoose.Schema({
subject:{
    type:String,
},

location:{
    type:String,
},

start_date:{
    type:String,
},

start_time:{
    type:String,
},

end_time: {
    type:String,
},

notes:{
    type:String,
},

},{
    timestamps:true
})

const AppointmentTable= mongoose.models.Appointments || mongoose.model("Appointments",AppointmentsSchema)

export default AppointmentTable;