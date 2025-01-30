'use client'
import trainertabStore from '@/zustand/trainertab'
import { Lock } from 'lucide-react'
import React from 'react'


type Props = {
    img: string
    name: string
    pets: number
    tab: string
    rank: string
    disable: boolean
}


export default function Trainercard(prop:Props) {
    const {tab, setTab, clearTab} = trainertabStore()

  return (
    <button disabled={prop.disable} onClick={() => setTab(prop.rank)} className={` relative whitespace-nowrap flex gap-4 w-[250px] h-auto bg-white shadow-sm rounded-md p-6 hover:border-b-4 hover:border-[#75C09F] cursor-pointer ${tab === prop.rank && 'border-b-4 border-[#75C09F]'}`}>

        <div className=' relative overflow-hidden bg-dark flex w-12 h-12 rounded-full '>
            <img src={prop.img} alt="" width={20} className=' w-12 absolute top-2' />
        </div>

        <div className=' flex flex-col items-start'>
            <p className=' text-lg font-medium'>{prop.name}</p>
            <p className=' text-xs text-zinc-500'>with {prop.pets} pets</p>

        </div>

        {prop.disable === true && (
            <div className=' w-full h-full bg-white/80 absolute top-0 left-0 flex flex-col items-center justify-center rounded-md'>
                <Lock size={20}/>
                <p className=' text-[.6rem]'>Coming soon!</p>

            </div>
        )}
        
    </button>
  )
}
