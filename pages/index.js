'use client'
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import Dashboardindex from "./dashboard"



const changepage=()=>{
  window.location.href=process.env.NEXT_PUBLIC_SOFTMASTERSWEB
}
export default function Home() {
  return (
   <Dashboardindex/>
  )
}
