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
import { DialogTitle } from '@radix-ui/react-dialog'

type Props = {
    id: string
    name: string
    animal: string
    rank: string,
    min: number,
    max: number,
    duration: number,
    profit: number
}

export default function Petloadingcard(prop: Props) {
    const [val, setVal] = useState([0]);
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()

    useEffect(() => {
        setVal([prop.min])
    }, [prop])

    const img = petimg.find((item) => item.id === prop.name)

  return (
    <div className=' animate-pulse duration-700 group w-full h-auto '>

                        <div className=' w-full flex'>

                            <div className=' w-[70%] h-[35px] bg-gray-200 rounded-t-md flex items-center p-2'
                            style={{ clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)' }}
                            >

                            </div>

                        </div>

                        <div className=' transition-all duration-300 w-full aspect-square bg-gray-200 shadow-sm flex items-center justify-center relative'>


                        </div>

                        <div className=' w-full flex items-center justify-between text-sm py-2'>
                            <p className=' animate-pulse duration-1000 font-medium bg-gray-200 p-2 w-32 rounded-full'></p>
                        </div>

    </div>
  )
}
