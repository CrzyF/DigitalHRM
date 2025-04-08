const multer = require('multer');
const fs = require('fs');
const uploadDirectory = './public/receipts/';


export const config={
    api:{
      bodyParser:false
    }
  }
  
try{

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const add = req.body.payee+ '.jpeg'
    cb(null,add)
  }
});

const upload = multer({ storage: storage });

module.exports=upload

}catch{
    console.log('An error occured while trying to parse files')
    res.json('An error occured while trying to parse files')
}
