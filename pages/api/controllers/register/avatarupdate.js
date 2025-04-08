import multer from 'multer';
import connect from '@/mongoose/connect';
import fs from 'fs';
import mongoose from 'mongoose';
import Employee from '../../models/employee';
import SMSNOTIFICATION from '../notification/sms';
import EMAILNOTIFICATION from '../notification/email';

export const config={
  api:{
    bodyParser:false
  }
}


const storage=multer.diskStorage({
  destination:function(req,files,cb){
      const uploadDir = './public/uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
  },
  filename:function(req,file,cb){
      const add = req.body.company_email+ '.jpeg'//path.extname(file.originalname)
      cb(null,add)
  },
})


const upload = multer({ storage: storage })



export default async function handler(req, res) {
  await connect()
  try {

    upload.single('avatar')(req, res,async function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      } else {
        const fullname=req.body.firstname+' '+req.body.lastname
        const user = await Employee.findOneAndUpdate({company_email:req.body.company_email},{
          profilepicture:req.body.company_email+ '.jpeg',
          'firstname':req.body.firstname,
          'fullname':fullname,
          'lastname':req.body.lastname,
          'permissionsvalue':req.body.permissionsvalue,
          'companyid':req.body.companyid,
        });
        user.save()
        const emailtitle='Registration successful'
        const emailhtmlbody="<h2 style='font-weight:bold'>Welcome to Softmasters!!!</h2>"
        const smsmail='Registration successful,Welcome to Softmasters!!!'
        
        EMAILNOTIFICATION(user.company_email,emailtitle,emailhtmlbody)
        SMSNOTIFICATION(smsmail,user.company_phone)
        
        console.log(user)
        res.status(200).json({ success: true ,
        userdata:{
          firstname:user.firstname,
          lastname:user.lastname,
          company_email:user.company_email,
          company_phone:user.company_phone,
          profilepicture:user.profilepicture,
          permissionsvalue:user.permissionsvalue,
          companyid:user.companyid,
        }
        });
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

