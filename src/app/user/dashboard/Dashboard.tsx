'use client'
import Card from '@/components/common/Card'
import { encryptUid } from '@/helpers/encrypt'
import loadingStore from '@/zustand/loading'
import axios, { AxiosError } from 'axios'
import { Copy, Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Wallet {
    gamebalance: number,
    fiatbalance: number,
    commissionbalance: number
    directbalance: number,
    unilevelbalance: number,
  
}

interface Statistics {
    game:number,
    referral:number,
    unilevel:number
}

export default function Dashboard() {
    const router = useRouter()
    const [wallet, setWallet] = useState<Wallet>()
    const [stats, setStats] = useState<Statistics>()
    const { loading, setLoading, clearLoading } = loadingStore()
    const [referral, setReferral] = useState('')
    const [unclaimed, setUnclaimed] = useState(0)
    const [status, setStatus] = useState(false)
    const [event, setEvent] = useState('On')

       //all wallets
       useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuserdashboard`,{
            withCredentials:true
            })
  
           
            setLoading(false)
            console.log(response.data)
          
          } catch (error) {
            setLoading(false)
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string, data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
                
                }    
              } 
          }
        }
        getWallets()
    },[])
  
    


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
                
                }    
              } 
          }
        }
        getWallets()
    },[])

    useEffect(() => {
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallethistory/getwalletstatistics`,{
            withCredentials:true
            })
            
            setStats(response.data.data)
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string, data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
               
                }    
              } 
          }
        }
        getWallets()
    },[])

    useEffect(() => {
      const getWallets = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inventory/getunclaimedincomeinventory`,{
          withCredentials:true
          })
          
        setUnclaimed(response.data.data.totalaccumulated)
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
             
              }    
            } 
        }
      }
      getWallets()
  },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/getreferrallinkstatus`,{
        withCredentials:true
        })

        setStatus(response.data.data.status)
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
           
            }    
          } 
      }
    }
    getData()
  },[])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/maintenance/geteventmainte?maintenancetype=eventgame`,{
        withCredentials:true
        })

        setEvent(response.data.data.value === '0' ? 'Off' : 'On')
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
           
            }    
          } 
      }
    }
    getData()
},[])

    //get referral
    useEffect(() => {
      const getReferral = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getreferrallink`,{
          withCredentials:true
          })

          console.log(response.data)
          setReferral(response.data.data)

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
      }
      getReferral()
    },[])

    const copyReferral = () => {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_REFERRAL}/auth/signup?uid=${encryptUid(referral)}`)
      toast.success('Referral link copied')
    }

 


  return (
    <div className=' w-full h-fit flex flex-col gap-2 py-8 font-thin'>

        <h2 className=' text-xl font-bold text-white'>Dashboard</h2>
        <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-8 h-auto bg-white rounded-xl shadow-sm'>
                <div className='relative w-full h-full flex flex-col justify-between p-6 text-xs'>

                    <div className=' flex flex-col'>
                        <p>Referral</p>
                        {/* <h2 className=' ~text-4xl/5xl font-medium'>99</h2> */}
                        {status === true && (
                        <button onClick={copyReferral} className=' primary-btn w-fit px-4 mt-2'><Copy size={15}/>Copy</button>
                        )}
                    </div>

                    <p className=' text-zinc-500 w-[30%]'>Invites your your friends.</p>
                   
                    <img src="/assets/Dog1.png" width={400} height={400} className=' ~w-48/64 absolute bottom-0 right-0' />
                </div>

                <div className='relative w-full h-full flex flex-col justify-between p-6 text-xs'>

                    <div className=' flex flex-col'>
                        <p>Events</p>
                        <h2 className=' ~text-3xl/5xl font-medium'>{event}</h2>
                    </div>

                    <p className=' text-zinc-500 w-[30%]'>Join the events to get rewards.</p>
                   
                    <img src="/event.png" width={400} height={400} className=' ~w-40/56 absolute bottom-0 right-0' />
                </div>
            </div>

            <div className=' w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2'>
            
                <Card name={'Wallet Balance'} amount={wallet?.fiatbalance || 0} color={'bg-amber-400'} subcolor={'bg-amber-300'} editable={false}/>
                <Card name={'Total Withdrawables'} amount={(wallet?.gamebalance || 0) + (wallet?.directbalance || 0) + (wallet?.unilevelbalance || 0)} color={'bg-lime-400'} subcolor={'bg-lime-300'} editable={false}/>
                <Card name={'Game Total Earnings'} amount={stats?.game || 0} color={'bg-green-400'} subcolor={'bg-green-300'} editable={false}/>
                <Card name={'Game Wallet Balance'} amount={wallet?.gamebalance || 0} color={'bg-emerald-400'} subcolor={'bg-emerald-300'} editable={false}/>

            </div>

        </div>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Card name={'Referral Commissions'} amount={wallet?.directbalance || 0} color={'bg-teal-400'} subcolor={'bg-teal-300'} editable={false}/>
          <Card name={'Unilevel Commissions'} amount={wallet?.unilevelbalance || 0} color={'bg-cyan-400'} subcolor={'bg-cyan-300'} editable={false}/>
          <Card name={'Commission Wallet Earnings'} amount={(wallet?.directbalance || 0) + (wallet?.unilevelbalance || 0)} color={'bg-sky-400'} subcolor={'bg-sky-300'} editable={false}/>
          <Card name={'Total Earnings'} amount={(wallet?.gamebalance || 0) + (wallet?.unilevelbalance || 0) + (wallet?.directbalance || 0)} color={'bg-indigo-400'} subcolor={'bg-indigo-300'} editable={false}/>
        </div>

    </div>
  )
}
