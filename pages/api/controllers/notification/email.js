import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.COMPEMAIL}`,
      pass: `${process.env.COMPPASS}`
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  export default  function EMAILNOTIFICATION(emailto,emailtitle,emailhtmlbody,filename = '', fullpath = ''){
    try{

    const attachments = [];

    if (filename !== '' && fullpath !== '') {
      attachments.push({
        filename: filename,
        path: fullpath
      });
    }


    transporter.sendMail({
        from: `${process.env.COMPEMAIL}`,
        to: `${emailto}`,
        subject: `${emailtitle}`,
        html: `${emailhtmlbody}`,
        attachments:attachments
      }, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('email sent: \n', info);
        }
      })
    }
    catch{((e)=>{
      console.log('\nan error occurred with the notifications\n')
      console.log(e)
    })}

  }
