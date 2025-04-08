import mongoose from "mongoose";

const Enrollacompanyschema=new mongoose.Schema({

    bussinessType:{
        type:String,
    },
    bussinessname:{
        type:String,
    },
    country:{
        type:String,
    },
    accountnumber:{
        type:String,
    },
    telephone:{
        type:String,
    },
    email:{
        type:String,
    },
    registrationtype:{
        type:String,
    },

},{timestamps:true})


const Enrollacompanymodel = mongoose.models.Enrollacompany || mongoose.model('Enrollacompany', Enrollacompanyschema);

export default Enrollacompanymodel;
