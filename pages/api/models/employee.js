import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default:'',
  },
  lastname: {
    type: String,
    default:'',

  },fullname: {
    type: String,
    default:'',

  },
  company_email: {
    type: String,
    default:'',

  },
  company_phone: {
    type: String,
    default:'',

  },
  company_password: {
    type: String,
    default:'',

  },
  
  profilepicture: {
    type: String,
    default:'',

  },
  permissionsvalue:{
    type: String,
    default:'',
  },
  companyid:{
    type: String,
    default:'',
  }
});
//profilepicture
const Employee = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);

export default Employee;
