"use client"
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
import { Input } from '@/components/ui/input';
import { Slider } from "@/components/ui/slider"
import Trainercard from '@/components/common/Trainercard';
import trainertabStore from '@/zustand/trainertab';
import Petcard from '@/components/common/Petcard';
import loadingStore from '@/zustand/loading';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Petloadingcard from '@/components/common/Petcardloading';

interface Store {
    trainers: Pets[]
    rank: string
}

interface Pets {
    id: string,
    name: string
    animal: string
    rank: string
    min: number,
    max: number,
    duration: number,
    profit: number
    b1t1: string
}


const items = [
    { id: 1, content: '1', img:'/assets/Dog1.png' },
    { id: 2, content: '2', img:'/assets/Bird1.png' },
    { id: 3, content: '3', img:'/assets/Cat1.png' },
    { id: 4, content: '4', img:'/assets/Fish1.png' },
    { id: 5, content: '5', img:'/assets/Dog2.png' },
    { id: 6, content: '6', img:'/assets/Bird2.png' },
    { id: 7, content: '7', img:'/assets/Cat2.png' },
    { id: 8, content: '8', img:'/assets/Fish2.png' },
    { id: 9, content: '9', img:'/assets/Dog3.png' },
    { id: 10, content: '10', img:'/assets/Bird3.png' },
    { id: 11, content: '10', img:'/assets/cat3.png' },
  ];

export default function Store() {
    const {tab, setTab, clearTab} = trainertabStore()
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const [store, setStore] = useState<Store[]>([])

    const findPets = store.find((item) => item.rank === tab)


    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trainer/gettrainers`,{
            withCredentials:true
            })

            setLoading(false)
            setStore(response.data.data)
            
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
    },[tab])




  return (
    <div className="w-full flex flex-col gap-4 font-light">
    
            <h2 className=' text-xl font-bold mt-8 text-white'>Store</h2>

            <h2 className=' text-sm font-medium mt-4 text-white'>Trainers</h2>
            <div className=' flex flex-nowrap gap-4 h-[100px] w-full overflow-y-hidden overflow-x-auto'>
                
                <Trainercard img={'/assets/Trainer1.png'} name={'Novice'} pets={5} tab={''} rank={'Novice'} disable={false}/>
                <Trainercard img={'/assets/Trainer2.png'} name={'Expert '} pets={5} tab={''} rank={'Expert'} disable={false}/>
                <Trainercard img={'/assets/Trainer3.png'} name={'Elite Trainer'} pets={5} tab={''} rank={'Elite'} disable={false}/>
                <Trainercard img={'/assets/Trainer4.png'} name={'Spade Trainer'} pets={5} tab={''} rank={''} disable={true}/>
                <Trainercard img={'/assets/Trainer5.png'} name={'Heart Trainer'} pets={5} tab={''} rank={''} disable={true}/>
            </div>

            <h2 className=' text-sm font-medium mt-4 text-white'>Pets</h2>
            <div className=' w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 '>
               

                {loading === true ? (
                    <>
                     {[0,1,2,3,4].map((item, index) => (
                        <Petloadingcard key={index} id={''} name={''} animal={''} rank={''} min={0} max={0} duration={0} profit={0}/>
                    ))}
                    </>
                        
                ) : (
                    <>
                     {findPets?.trainers.map((item, index) => (
                            <Petcard key={index} name={item.name} id={item.id} animal={item.animal} rank={item.rank} min={item.min} max={item.max} duration={item.duration} profit={item.profit} b1t1={item.b1t1}/>
                        ))}
                    </>
                )}

                

            </div>
    
           
        </div>
  )
}
