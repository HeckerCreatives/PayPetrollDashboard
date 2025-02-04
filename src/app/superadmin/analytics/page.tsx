'use client'
import Card from '@/components/common/Card'
import Superadminlayout from '@/components/layout/Superadminlayout'
import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import LongChart from './LongChart'
import { useRouter } from 'next/navigation'
import loadingtableStore from '@/zustand/tableloading'
import rateStore from '@/zustand/rate'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Users, Wallet } from 'lucide-react'

interface AdminWallets {
  commission: number,
  products: number,
  commissioned: number,
  registered: number,
  payin: number,
  payoutgame: number,
  payoutcommission: number,
  payout: number,
  adminfeewallet: number
}

export default function page() {
  const router = useRouter()
  const {loading, setLoading, clearLoading} = loadingtableStore()
  const {rate, setRate, clearRate} = rateStore()
  const [wallets, setWallets] = useState<AdminWallets>()
  const [totalsales, setTotalsales] = useState(0)


  useEffect(() => {
    setLoading(true)
    const getList = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/staffuser/getsadashboard`,{
        withCredentials:true
        })

        setLoading(false)
        setWallets(response.data.data)

        setTotalsales(response.data.data.commission + response.data.data.payin)
      } catch (error) {
        setLoading(false)

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
             
            }    
          } 
      }
    }
    getList()
},[])


  return (
    <Superadminlayout>
        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-12 gap-4'>
          <Card name={'Total Sales'} amount={totalsales} color={'bg-amber-400'} subcolor={'bg-amber-300'}/>
          <Card name={'Company Commission'} amount={wallets?.commission || 0} color={'bg-teal-400'} subcolor={'bg-teal-300'}/>
          <Card name={'User Top Up'} amount={wallets?.payin || 0} color={'bg-emerald-400'} subcolor={'bg-emerald-300'}/>
          <Card name={'Total Payout'} amount={wallets?.payout || 0} color={'bg-purple-400'} subcolor={'bg-purple-300'}/>
          <Card name={'Payout Game'} amount={wallets?.payoutgame || 0} color={'bg-sky-400'} subcolor={'bg-sky-300'}/>
          <Card name={'Payout Commission'} amount={wallets?.payoutcommission || 0} color={'bg-rose-400'} subcolor={'bg-rose-300'}/>
          <Card name={'Total Company Profit'} amount={totalsales - (wallets?.payout || 0)} color={'bg-blue-400'} subcolor={'bg-blue-300'}/>
          <Card name={'Game Profit'} amount={wallets?.products || 0} color={'bg-green-400'} subcolor={'bg-green-300'}/>

          <div className={`flex items-center justify-center w-full ~w-[375px]/300px h-full  font-normal shadow-sm rounded-xl bg-rose-400`}>
            <div className=' w-full flex flex-col gap-2 text-sm p-4'>
                <p className=' '>User Account</p>
                {loading === true ? (
                <h2 className=' ~text-sm/lg font-semibold mt-2'>---</h2>
                ):(

                    <div className=' flex flex-col  mt-2'>
                        <h2 className=' ~text-xl/2xl font-semibold'>{(wallets?.registered || 0).toLocaleString()}</h2>
                    </div>

                )}
                <p className=' text-zinc-700 text-[.7rem]'>Total users</p>

            </div>

            <div className=' w-fit px-6 h-full flex items-center justify-center'>
                <div className={` ~w-12/16 aspect-square rounded-full flex items-center justify-center bg-rose-300`}>
                    <Users size={25}/>
                </div>

            </div>
        </div>

        </div>
        <LongChart/>
    </Superadminlayout>
  )
}
