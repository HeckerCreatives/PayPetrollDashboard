'use client'
import React, { useEffect, useState } from 'react'
import History from './History'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import loadingStore from '@/zustand/loading'
import Withdrawform from '@/components/forms/Withdrawform'
import Withdrawhistory from './History'
import refreshStore from '@/zustand/refresh'

  

interface Wallet {
    gamebalance: 0,
    fiatbalance: 0,
    commissionbalance: 0
}


export default function Withdraw() {

    const router = useRouter()
    const [wallet, setWallet] = useState<Wallet>()
    const { loading, setLoading, clearLoading } = loadingStore()
    const [referral, setReferral] = useState('')
    const [unclaimed, setUnclaimed] = useState(0)


    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/playerwallets`,{
            withCredentials:true
            })

            setWallet(response.data.data)
            setLoading(false)
          
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
        getWallets()
    },[])


  return (
    <div className="w-full flex flex-col gap-8 font-light">

        <h2 className=' text-xl font-bold mt-8 text-white'>Withdraw</h2>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className=' flex w-full h-auto bg-white shadow-sm rounded-xl p-6'>
                <div className=' w-full'>
                    <div className=' flex flex-col'>
                        <p className=' text-sm/lg font-medium'>Game Wallet Ballance</p>
                        <p className=' text-xs text-zinc-500 mt-8'>Total earnings</p>
                        <h2 className=' ~text-2xl/4xl font-medium '>₱{wallet?.gamebalance.toLocaleString()}</h2>

                        <Withdrawform wallet={'Game Wallet Ballance'} type={'gamebalance'}/>
                    </div>

                </div>

                <div>
                    <img src="/assets/Dog1.png" width={600} height={600} />
                </div>
            </div>

            <div className=' flex w-full h-auto bg-white shadow-sm rounded-xl p-6'>
                <div className=' w-full'>
                    <div className=' flex flex-col'>
                        <p className=' text-sm/lg font-medium'>Commission Wallet Ballance</p>
                        <p className=' text-xs text-zinc-500 mt-8'>Total comissions</p>
                        <h2 className=' ~text-2xl/4xl font-medium '>₱{wallet?.commissionbalance.toLocaleString()}</h2>

                        <Withdrawform wallet={'Commission Wallet Ballance'} type={'commissionbalance'}/>
                    </div>

                </div>

                <div>
                    <img src="/assets/Cat1.png" width={700} height={700} />
                </div>
            </div>

        </div>

        <Withdrawhistory/>

       

    </div>
  )
}
