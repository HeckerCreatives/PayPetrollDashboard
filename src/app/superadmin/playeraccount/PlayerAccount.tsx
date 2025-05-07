'use client'
import Card from '@/components/common/Card'
import { encryptUid } from '@/helpers/encrypt'
import loadingStore from '@/zustand/loading'
import rateStore from '@/zustand/rate'
import refreshStore from '@/zustand/refresh'
import loadingtableStore from '@/zustand/tableloading'
import axios, { AxiosError } from 'axios'
import { Copy, Wallet } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Invites from './Invites'
import Inventory from './Inventory'
import WalletHistory from './WalletHistory'
import BuyHistory from './BuyHistory'
import PayoutHistory from './payoutHistory'

  

interface Wallet {
    type: string
    amount: number
}

interface User {
    username: string
    status: string
    referral: string
    referralid: string
}

interface Statistics {
    game:number,
    referral:number,
    unilevel:number
}

export default function PlayerAccount() {
    const router = useRouter()
    const [wallet, setWallet] = useState<Wallet[]>([])
    const { loading, setLoading, clearLoading } = loadingStore()
    const [referral, setReferral] = useState('')
    const [unclaimed, setUnclaimed] = useState(0)
    const params = useSearchParams()
    const {rate, setRate} = rateStore()
    const id = params.get('id')
    const [data, setData] = useState<User>()
    const [open, setOpen] = useState(false)
    const {refresh, setRefresh} = refreshStore()
        const [stats, setStats] = useState<Statistics>()
    
    


    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {

            if(id !== null){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallet/getplayerwalletforadmin?playerid=${id}`,{
                    withCredentials:true
                    })
        
                    setWallet(response.data.data.userwallets)
                    setLoading(false)
            }
           
          
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
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/wallethistory/getwalletstatisticssuperadmin?id=${id}`,{
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
        setLoading(true)
        const getWallets = async () => {
          try {

            if(id !== null){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuserdetailssuperadmin?userid=${id}`,{
                    withCredentials:true
                    })
        
                    setLoading(false)
                    setData(response.data.data)
                    
            }
           
          
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
    },[refresh])

    //get rate 
    useEffect(() => {
        const getWallets = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/conversionrate/getcurrentconversionrate`,{
            withCredentials:true
            })

            setRate(response.data.data.rate)

        
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

    const banuser = async () => {
        setLoading(true);
        setRefresh("true");
    
        try {
            const request = axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/banunbanuser`,
                {
                    status: data?.status === "active" ? "banned" : "active", // Toggle status
                    userid: id,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "Application/json",
                    },
                }
            );
    
            const response = await toast.promise(request, {
                loading: `${data?.status === "active" ? "Banning" : "Unbanning"} player account...`,
                success: `Successfully ${data?.status === "active" ? "banned" : "unbanned"}.`,
                error: `Error while ${data?.status === "active" ? "banning" : "unbanning"} player account.`,
            });
    
            if (response.data.message === "success") {
                setLoading(false);
                setRefresh("false");
                setOpen(false);
            }
        } catch (error) {
            setLoading(false);
            setRefresh("false");
    
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string; data: string }>;
                if (axiosError.response) {
                    toast.error(`${axiosError.response.data.data}`);
                    if (axiosError.response.status === 401) router.push("/");
                }
            }
        }
    };

    const getWalletAmount = (type: string) => {
        return wallet.find(w => w.type === type)?.amount || 0;
      };
      


  return (
    <div className=' w-full h-fit flex flex-col gap-2 py-8 font-thin'>

        <h2 className=' text-xl font-bold text-black'>Player Account</h2>
        <div className=' grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-4'>
            <div className=' w-full grid grid-cols-1  gap-8 h-auto bg-white rounded-xl shadow-sm'>
                <div className='relative w-full h-full flex flex-col justify-between p-6 text-xs'>

                    <div className=' flex flex-col'>
                        <h2 className=' ~text-xl/2xl font-medium'>{data?.username} <span className={` text-sm ${data?.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>({data?.status})</span></h2>
                        {data?.referralid !== '' ? (
                        <a target='_blank' href={`/superadmin/playeraccount/?id=${data?.referralid}`} className=' text-xs underline cursor-pointer'>Referral: {data?.referral}</a>
                        ) : (
                        <p className=' text-xs'>Referral: {data?.referral}</p>
                        )}
                        <Dialog open={open} onOpenChange={(setOpen)}>
                        <DialogTrigger className={`${data?.status === 'active' ? 'danger-btn ' : 'primary-btn ' } w-[150px] mt-4`}>{data?.status === 'active' ? 'Ban' : 'Unban' }</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>{data?.status === 'active' ? 'Ban' : 'Unban' } User</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to {data?.status === 'active' ? 'ban' : 'unban' } {data?.username}
                            </DialogDescription>
                            </DialogHeader>

                            <div className=' w-full flex items-center justify-end gap-4'>
                                <button onClick={banuser} className={`${data?.status === 'active' ? 'danger-btn' : ' primary-btn px-4'}`}>{data?.status === 'active' ? 'Ban' : 'Unban' }</button>
                            </div>
                        </DialogContent>
                        </Dialog>

                    </div>

                   
                    <img src="/event.png" width={400} height={400} className=' ~w-40/48 absolute bottom-0 right-0' />

                </div>

               
            </div>

            <div className=' w-full h-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2'>
            
                <Card name={'Wallet Balance'} amount={getWalletAmount('fiatbalance')} type='fiatbalance' color={'bg-amber-400'} subcolor={'bg-amber-300'} editable={true}/>
                <Card name={'Total Withdrawables'} amount={
                    getWalletAmount('gamebalance') +
                    getWalletAmount('commissionbalance')
                    } color={'bg-blue-400'} subcolor={'bg-blue-300'} editable={false}/>
                <Card name={'Total Earnings'} amount={
                    (stats?.game || 0) +
                    (stats?.unilevel || 0) +
                    (stats?.referral || 0)
                    } color={'bg-cyan-400'} subcolor={'bg-cyan-300'} editable={false} />

            </div>

        </div>

        <div className=' w-full h-full grid grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-2'>

            <Card name={'Referral Commissions Earnings'} amount={(stats?.referral || 0)} type='directbalance' color={'bg-green-400'} subcolor={'bg-green-300'} editable={false} />
            <Card name={'Unilevel Commissions Earnings'} amount={(stats?.unilevel || 0)} type='unilevelbalance' color={'bg-purple-400'} subcolor={'bg-purple-300'} editable={false} />
           
            <Card name={'Game Wallet Balance'} amount={getWalletAmount('gamebalance')} type='gamebalance' color={'bg-yellow-400'} subcolor={'bg-yellow-300'} editable={false} />
            <Card name={'Commission Wallet Balance'} amount={
                    getWalletAmount('commissionbalance')
                } color={'bg-lime-400'} subcolor={'bg-lime-300'} editable={false} />
            <Card name={'Game Total Earnings'} amount={stats?.game || 0} type='gamebalance' color={'bg-yellow-400'} subcolor={'bg-yellow-300'} editable={false} />


        

            </div>

        <Tabs defaultValue="Invites" className="w-full mt-8">
        <TabsList className=' bg-white'>
            <TabsTrigger value="Invites">Invites</TabsTrigger>
            <TabsTrigger value="Inventory">Inventory</TabsTrigger>
            <TabsTrigger value="WalletHistory">Wallet History</TabsTrigger>
            {/* <TabsTrigger value="BuyHistory">Purchase History</TabsTrigger>
            <TabsTrigger value="payoutHistory">Payout History</TabsTrigger> */}
        </TabsList>
        <TabsContent value="Invites">
            <Invites/>
        </TabsContent>
        <TabsContent value="Inventory">
            <Inventory/>
        </TabsContent>

        <TabsContent value="WalletHistory">
            <WalletHistory/>
        </TabsContent>

        <TabsContent value="BuyHistory">
            <BuyHistory/>
        </TabsContent>

        <TabsContent value="payoutHistory">
            <PayoutHistory/>
        </TabsContent>
        </Tabs>





    </div>
  )
}
