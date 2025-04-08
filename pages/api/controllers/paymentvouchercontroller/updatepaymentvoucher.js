import connect from "@/mongoose/connect";
import multer from "multer";
import fs from 'fs';
import PaymentVoucher from "../../models/paymentvoucher";

export const config = {
  api: {
    bodyParser: false
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './public/pv/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]; // Extract the file extension from the MIME type
    const add = new Date().getTime() + '.' + extension; // Use getTime() to ensure a unique filename with the correct extension
    cb(null, add);
  },
})

const upload = multer({ storage: storage });

export default async function handler(req, res) {
  try {
    await connect();

    if (req.method === 'GET') {
      res.json({ message: 'Here I am' });
    } else if (req.method === 'POST') {

      upload.fields([{ name: 'receipt', maxCount: 20 }, { name: 'voucher', maxCount: 20 },{ name: 'cheque', maxCount: 20 }])(req, res, async function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: err.message });
        } else {

          const selfiename = req.body.name + '.jpeg';
          
          const receipt=req.files.receipt?await (req.files.receipt).map((items)=>items.filename):''
          const voucher=req.files.voucher?await (req.files.voucher).map((items)=>items.filename):''
          const cheque=req.files.cheque?await (req.files.cheque).map((items)=>items.filename):''
          const receiptfileob={receipt,voucher,cheque}

    
          const pv=await PaymentVoucher.findByIdAndUpdate(req.body.id,{...req.body,receiptfile:JSON.stringify(receiptfileob)})
          pv.save()

          res.json({ success: true,pv});
        }
      });
    }
  } catch (error) {
    console.error('An error occurred in the appointment booking server:', error);
    res.status(500).json({ error: 'An error occurred in the appointment booking server' });
  }
}
