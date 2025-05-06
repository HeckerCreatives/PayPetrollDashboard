'use client'
import loadingStore from '@/zustand/loading'
import rateStore from '@/zustand/rate'
import { Wallet } from 'lucide-react'
import React from 'react'

type Props = {
    name: string
    amount: number
    color: string
    subcolor: string
}
export default function Card( prop: Props) {
    const { loading, setLoading, clearLoading } = loadingStore()
    const {rate, setRate, clearRate} = rateStore()


  return (
    <div className={`flex items-center justify-center w-full ~w-[375px]/300px h-full  font-normal shadow-sm rounded-xl ${prop.color}`}>
    <div className=' w-full flex flex-col gap-2 text-sm p-4'>
        <p className=' '>{prop.name}</p>
        {loading === true ? (
        <h2 className=' ~text-sm/lg font-semibold mt-2'>---</h2>
        ):(

            <div className=' flex flex-col  mt-2'>
                <h2 className=' ~text-lg/xl font-semibold'>₱{prop.amount.toLocaleString()}</h2>
                <p className=' text-xs text-zinc-700'>${(prop.amount / rate).toLocaleString()}</p>
            </div>

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
