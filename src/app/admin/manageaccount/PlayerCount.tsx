'use client'
import rateStore from '@/zustand/rate'
import refreshStore from '@/zustand/refresh'
import loadingtableStore from '@/zustand/tableloading'
import axios, { AxiosError } from 'axios'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Count {
    totalusers:number
    activeusers:number
    banusers:number
}

export default function PlayerCount() {
    const router = useRouter()
    const {loading, setLoading, clearLoading} = loadingtableStore()
    const {rate, setRate, clearRate} = rateStore()
    const [totalsales, setTotalsales] = useState(0)
    const [count, setCount] = useState<Count>()
    const {refresh} = refreshStore()
  
  
    useEffect(() => {
      setLoading(true)
      const getList = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getplayercount`,{
          withCredentials:true
          })
  
          setLoading(false)
          setCount(response.data.data)
  
        } catch (error) {
          setLoading(false)
  
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
      }
      getList()
  },[refresh])


  return (
    <div className=' w-full flex flex-wrap items-center justify-center gap-4'>

        <div className={`flex items-center justify-center w-full max-w-[375px] h-auto  font-normal shadow-sm rounded-xl bg-purple-400`}>
            <div className=' w-full flex flex-col gap-2 text-sm p-4'>
                <p className=' '>Registered Users</p>
                {loading === true ? (
                <h2 className=' ~text-sm/lg font-semibold mt-2'>---</h2>
                ):(

                    <div className=' flex flex-col  mt-2'>
                        <h2 className=' ~text-xl/2xl font-semibold'>{count?.totalusers.toLocaleString()}</h2>
                    </div>

                )}
                <p className=' text-zinc-700 text-[.7rem]'>Total registered users</p>

            </div>

            <div className=' w-fit px-6 h-full flex items-center justify-center'>
                <div className={` ~w-12/16 aspect-square rounded-full flex items-center justify-center bg-purple-300`}>
                    <Users size={25}/>
                </div>

            </div>
        </div>

        <div className={`flex items-center justify-center w-full max-w-[375px] h-auto  font-normal shadow-sm rounded-xl bg-green-400`}>
            <div className=' w-full flex flex-col gap-2 text-sm p-4'>
                <p className=' '>Active users</p>
                {loading === true ? (
                <h2 className=' ~text-sm/lg font-semibold mt-2'>---</h2>
                ):(

                    <div className=' flex flex-col  mt-2'>
                        <h2 className=' ~text-xl/2xl font-semibold'>{count?.activeusers.toLocaleString()}</h2>
                    </div>

                )}
                <p className=' text-zinc-700 text-[.7rem]'>Total active users</p>

            </div>

            <div className=' w-fit px-6 h-full flex items-center justify-center'>
                <div className={` ~w-12/16 aspect-square rounded-full flex items-center justify-center bg-green-300`}>
                    <Users size={25}/>
                </div>

            </div>
        </div>

        <div className={`flex items-center justify-center w-full max-w-[375px] h-auto  font-normal shadow-sm rounded-xl bg-sky-400`}>
            <div className=' w-full flex flex-col gap-2 text-sm p-4'>
                <p className=' '>Banned Users</p>
                {loading === true ? (
                <h2 className=' ~text-sm/lg font-semibold mt-2'>---</h2>
                ):(

                    <div className=' flex flex-col  mt-2'>
                        <h2 className=' ~text-xl/2xl font-semibold'>{count?.banusers.toLocaleString()}</h2>
                    </div>

                )}
                <p className=' text-zinc-700 text-[.7rem]'>Total banned users</p>

            </div>

            <div className=' w-fit px-6 h-full flex items-center justify-center'>
                <div className={` ~w-12/16 aspect-square rounded-full flex items-center justify-center bg-sky-300`}>
                    <Users size={25}/>
                </div>

            </div>
        </div>
    </div>
  )
}
