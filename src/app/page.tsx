'use client'
import { LoginForm } from "@/components/forms/LoginForm";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter()
  const [isLoggedin, setIsloggedin] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/automaticlogin`,{
        withCredentials:true
        })

        if (response.data.data.auth === 'player') {
          router.push('/user/dashboard')
          setIsloggedin(true)
        } else if (response.data.data.auth === 'superadmin') {
          router.push('/superadmin/analytics')
          setIsloggedin(true)

        } else if (response.data.data.auth === 'admin') {
          router.push('/admin/analytics')
          setIsloggedin(true)

        } else {
          toast.error(response.data.data)
          setIsloggedin(false)

        }

        
      } catch (error) {
        setIsloggedin(false)

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
            
            }    
          } 
      }
    }
    getData()
},[ ])


  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          {/* <img src="/logo.png" width={200} height={200} /> */}
          <p className=" text-2xl font-semibold">
            <img src="/Title_Icon.png" alt="" width={80} className=" ~w-28/32" />
          </p>
        </a>
        <LoginForm />
      </div>
    </div>
    </>
  );
}
