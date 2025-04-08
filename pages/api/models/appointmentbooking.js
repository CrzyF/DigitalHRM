import mongoose from "mongoose";

const AppointmentBookingSchema=new mongoose.Schema({
name:{
    type:String,
    default:''
},
phone:{
    type:String,
    default:''
},
employee:{
    type:String,
    default:''
},
datetime:{
    type:String,
    default:''
},
purpose:{
    type:String,
    default:''
},
selfie:{
    type:String,
    default:''
},
status:{
    type:String,
    default:'awaiting'
},
})


const AppointmentBooking= mongoose.models.AppointmentBooking || mongoose.model('AppointmentBooking',AppointmentBookingSchema)

export default AppointmentBooking;
