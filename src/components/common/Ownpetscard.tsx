'use client'
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from '../ui/slider'
import { Input } from '../ui/input'
import { petimg } from '@/app/data/data'
import loadingStore from '@/zustand/loading'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import refreshStore from '@/zustand/refresh'
import { CircularProgress } from './Progressbar'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Clock } from 'lucide-react'
import Countdown from 'react-countdown';

  


type Props = {
    id: string
    type: string
    creatureid: string
    rank: string
    qty: number,
    totalaccumulated: number,
    dailyaccumulated: number,
    limittotal: number,
    limitdaily: number
    remainingtime: number
}

export default function OwnPetcard(prop: Props) {
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()
    const percentage = (prop.totalaccumulated / prop.limittotal) * 100

    console.log(prop)

    const img = petimg.find((item) => item.id === prop.type)

    const claimEarnings = async () => {
        setDialog(false)
        setLoading(true)
        setRefresh('true')
        try {

                const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/claimtotalincome`,{
                    trainerid: prop.id
                },{
                    withCredentials: true,
                    headers:{
                        'Content-Type':'application/json'
                    }
                })

                const response = await toast.promise(request, {
                    loading: `Claiming ${prop.type} earnings...`,
                    success: `You succesfully claimed ${prop.type} earnings.`,
                    error: `Error while claiming ${prop.type} earnings.`,
                });
                if(response.data.message === 'success'){
                    setLoading(false)
                    router.push('?state=false')
                    setRefresh('false')
    
    
                }
         
            

            

        } catch (error) {
            setLoading(false)
            setRefresh('false')

             if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`)
                        router.push('/')

                    }

                    if (axiosError.response && axiosError.response.status === 400) {
                        toast.error(`${axiosError.response.data.data}`)     
                            
                    }

                    if (axiosError.response && axiosError.response.status === 402) {
                        toast.error(`${axiosError.response.data.data}`)          
                                
                    }

                    if (axiosError.response && axiosError.response.status === 403) {
                        toast.error(`${axiosError.response.data.data}`)              
                        
                    }

                    if (axiosError.response && axiosError.response.status === 404) {
                        toast.error(`${axiosError.response.data.data}`)             
                    }
            } 
      
            
        }
    }

    
   
    

  return (
    <div className=' group w-full h-fit'>

        <div className='  transition-all duration-300 w-full  bg-white shadow-sm flex items-center gap-4 relative p-6 rounded-lg'>

            <div className=' relative flex items-center justify-center'>
                <CircularProgress value={isNaN(percentage) ? 0 : percentage} />

                <div className=' absolute flex items-center justify-center'>
                    <img src={img?.img} alt='store' width={90} height={90}  className=' group-hover:scale-110 transition-all duration-300'/>
                </div>
            </div>
        
           

            <div className=' flex flex-col'>
                <h2 className=' text-xl font-medium'>{prop.type} <span className=' text-xs text-zinc-500'>({prop.rank})</span></h2>
                <h2 className=' ~text-xs/sm text-zinc-500 mt-1'>Total Earnings: Php <span className=' text-green-500 font-medium'>{prop?.limittotal?.toLocaleString()}</span></h2>
                <h2 className=' ~text-xs/sm text-zinc-500'>Total Accumulated: Php <span className=' text-green-500 font-medium'>{prop?.totalaccumulated?.toLocaleString()}</span></h2>
                {/* <p className=' text-xs text-black mt-2 flex items-center gap-1' ><Clock size={12} className=' mb-1'/>Ends in:</p> */}

                <p className=' mt-2'></p>
                <Countdown
                    className=' mt-4'
                    date={Date.now() + (prop.remainingtime * 1000)} 
                    renderer={({ days, hours, minutes, seconds }) => (
                    <span className=' text-xs'>
                        Ends in: {days} days : {hours} hours : {minutes} minutes : {seconds}
                    </span>
                    )}
                />

                    <Dialog open={dialog} onOpenChange={setDialog}>
                    <DialogTrigger className=' primary-btn mt-4 w-[150px]'>Claim</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Claim {prop.type} earnings</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to claim {prop.type} earnings
                        </DialogDescription>
                        </DialogHeader>

                        <div className=' w-full flex items-end justify-end gap-4'>
                            <button onClick={() => setDialog(!dialog)} className=' secondary-btn px-4'>Cancel</button>
                            <button disabled={loading} onClick={claimEarnings} className=' primary-btn mt-4 w-[150px]'>
                            {loading === true && (
                                <span className=' loader'></span>
                            )}
                            Claim</button>
                        </div>
                        
                    </DialogContent>
                    </Dialog>


                {!isNaN(prop.dailyaccumulated) && prop.dailyaccumulated !== 0 && (
                <p className="text-xs text-green-600 mt-4">
                    You earned {prop.dailyaccumulated} php today, keep grinding.
                </p>
                )}
            </div>

            {/* <p className=' absolute top-2 right-2 rounded-full bg-red-600  text-[.6rem] font-medium px-3 py-1'>{prop.animal}</p> */}
        </div>

       

        {/* <div className=' w-full flex items-center justify-between text-sm py-2'>
            <p className=' font-medium'>{prop.min.toLocaleString()} <span className=' text-[.6rem] md:text-xs font-normal text-zinc-500'>php</span></p>

        </div> */}

    </div>
  )
}
