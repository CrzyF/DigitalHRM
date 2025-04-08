import axios from 'axios';
import React from 'react'

export default async function SMSNOTIFICATION(smsmail,smsto) {
    try{
    await axios.get(`https://apps.mnotify.net/smsapi?key=${process.env.API_KEY}&to=${smsto}&msg=${smsmail}&sender_id=${process.env.SENDER}`)
    .then((resp)=>{
      console.log(resp)
      })
      .catch((e)=>{
        console.log(e)
      })
    }catch{
        console.log('An error occured with the sms system.')
    }
}
