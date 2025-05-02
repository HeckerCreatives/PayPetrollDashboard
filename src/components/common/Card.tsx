'use client'
import loadingStore from '@/zustand/loading'
import rateStore from '@/zustand/rate'
import { Pen, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { handleApiError } from '@/lib/errorHandler'

type Props = {
    name: string
    amount: number
    color: string
    subcolor: string
    editable: boolean
    type?: string
}
export default function Card( prop: Props) {
    const { loading, setLoading, clearLoading } = loadingStore()
    const {rate, setRate, clearRate} = rateStore()

    const [amount, setAmount] = useState(0)
     const params = useSearchParams()
        const id = params.get('id')

    const editWallet = async () => {
        setLoading(true)
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/wallet/edituserwalletforadmin`,{
                playerid: id,
                wallettype: prop.type,
              amount: amount
            },
                {
                    withCredentials: true
                }
            )
    
            if(response.data.message === 'success'){
              toast.success('Success')
              setLoading(false)
              window.location.reload()
           
    
            } 
    
            
            
        } catch (error) {
          setLoading(false)
    
            handleApiError(error)
            
        }
    
    }

    useEffect(() => {
     setAmount(prop.amount)   
    })


  return (
    <div className={`flex items-center justify-center w-full ~w-[375px]/300px h-full  font-normal shadow-sm rounded-xl ${prop.color}`}>
    <div className=' w-full flex flex-col gap-2 text-sm p-4'>
        <p className=' '>{prop.name}</p>
        {loading === true ? (
        <h2 className=' ~text-sm/lg font-semibold mt-2'>---</h2>
        ):(
            <>
            
              <div className=' flex items-center gap-4'>
                    <div className=' flex flex-col  mt-2'>
                                <h2 className=' ~text-lg/xl font-semibold'>₱{prop.amount.toLocaleString()}</h2>
                                <p className=' text-xs text-zinc-700'>${(prop.amount / rate).toLocaleString()}</p>
                            </div>
                            {prop.editable && (
                            <Dialog>
                            <DialogTrigger>
                            <button className=' bg-black text-white p-1 rounded-sm cursor-pointer'><Pen size={ 12}/></button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure to edit <span className=' text-yellow-500'>{prop.name}</span>?</DialogTitle>
                                <DialogDescription>
                                   
                                </DialogDescription>
                                </DialogHeader>

                                <div className=' w-full'>
                                    <label htmlFor="">Amount</label>
                                    <Input
                                      type="text"
                                      className="text-black mt-1"
                                      value={amount.toLocaleString()}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(/,/g, '');
                                        const numValue = Number(rawValue);

                                        if (rawValue === '') {
                                          setAmount(0);
                                        } else if (!isNaN(numValue) && numValue >= 0) {
                                          setAmount(numValue);
                                        }
                                      }}
                                    />

                                    <Button disabled={loading} onClick={editWallet} className='clip-btn px-12 w-fit mt-4'>
                                    {loading && ( <div className='spinner'></div>)}
                                        Save</Button>

                                </div>
                            </DialogContent>
                            </Dialog>


                            )}
                           

             </div>
            
            </>

           

        )}
        <p className=' text-zinc-700 text-[.7rem]'>Total balance</p>

    </div>

    <div className=' w-fit px-6 h-full flex items-center justify-center'>
        <div className={` ~w-12/16 aspect-square rounded-full flex items-center justify-center ${prop.subcolor}`}>
            <Wallet size={25}/>
        </div>

    </div>
</div>
  )
}
