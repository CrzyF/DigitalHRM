import mongoose from 'mongoose';

const PaymentVoucherSchema = new mongoose.Schema({
user: {
  type: String,
  default:'',
},
date:{
  type:String,
  default:''
},
time:{
  type:String,
  default:''
},
pvno:{
  type:String,
  default:''
},
paymentsource:{
  type:String,
  default:''
},
phonenumber:{
  type:String,
  default:''
},
phonenumbername:{
  type:String,
  default:''
},
bank:{
  type:String,
  default:''
},
pickername:{
  type:String,
  default:''
},
pickerphone:{
  type:String,
  default:''
},
pvno:{
  type:String,
  default:''
},
amount:{
  type:String,
  default:''
},
accountnumber:{
  type:String,
  default:''
},
chequenumber:{
  type:String,
  default:''
},
vat:{
  type:String,
  default:''
},
withholding:{
  type:String,
  default:''
},
commservice:{
  type:String,
  default:''
},
payee:{
  type:String,
  default:''
},
description:{
  type:String,
  default:''
},
receiptnumber:{
  type:String,
  default:''
},
receiptfile:{
  type:String,
  default:''
},
  
});
//profilepicture
const PaymentVoucher = mongoose.models.PaymentVoucher || mongoose.model('PaymentVoucher', PaymentVoucherSchema);

export default PaymentVoucher;
