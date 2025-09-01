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
import Complancard from '@/components/common/Complancard';
import refreshStore from '@/zustand/refresh';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NftComplanCard from '@/components/common/NftCard';

interface Complan {
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
    profit: number,
    b1t1: string,
  isActive: boolean

}

export interface NFT {
  id: string;
  name: string;
  price: number;
  profit: number;
  duration: number;
  type: string;
  rank: string;
  stocks: number;
  limit: number;
  isActive: boolean
  timesbought: number
}


export default function Complan() {
    const {tab, setTab, clearTab} = trainertabStore()
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const [store, setStore] = useState<Complan[]>([])
    const [nft, setNft] = useState<NFT[]>([])
    const {refresh, setRefresh} = refreshStore()


    const findPets = store.find((item) => item.rank === tab)


    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trainer/gettrainersadmin`,{
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
    },[tab, refresh])

     useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trainer/getnfttrainersadmin`,{
            withCredentials:true
            })

            setLoading(false)
            setNft(response.data.data)
            
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




  return (
    <div className="w-full flex flex-col gap-4 font-light">

      <Tabs defaultValue="fiat" className="w-full mt-8">
      <TabsList>
        <TabsTrigger value="fiat">Fiat</TabsTrigger>
        <TabsTrigger value="nft">NFT</TabsTrigger>
      </TabsList>
      <TabsContent value="fiat">
          {/* <h2 className=' text-xl font-bold mt-8 text-white'>Complan</h2> */}

            <h2 className=' text-sm font-medium mt-4 text-white'>Trainers</h2>
            <div className=' flex flex-nowrap gap-4 h-[100px] w-full overflow-y-hidden overflow-x-auto'>
                
                <Trainercard img={'/assets/Trainer1.png'} name={'Novice'} pets={5} tab={''} rank={'Novice'} disable={false}/>
                <Trainercard img={'/assets/Trainer2.png'} name={'Expert'} pets={5} tab={''} rank={'Expert'} disable={false}/>
                <Trainercard img={'/assets/Trainer3.png'} name={'Elite Trainer'} pets={5} tab={''} rank={'Elite'} disable={false}/>
                <Trainercard img={'/assets/Trainer4.png'} name={'Spade Trainer'} pets={5} tab={''} rank={'Ace of Spade'} disable={false}/>
                <Trainercard img={'/assets/Trainer5.png'} name={'Heart Trainer'} pets={5} tab={''} rank={'Ace of Heart'} disable={false}/>
            </div>

            <h2 className=' text-sm font-medium mt-4 text-white'>Pets</h2>
            <div className=' w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 '>
              
                
              {findPets?.trainers.map((item, index) => (
                    <Complancard key={index} name={item.name} id={item.id} animal={item.animal} rank={item.rank} min={item.min} max={item.max} duration={item.duration} profit={item.profit * 100} b1t1={item.b1t1} isActive={item.isActive}/>
              ))}
               

            </div>
      </TabsContent>
      <TabsContent value="nft">
         {/* <h2 className=' text-sm font-medium mt-4 text-white'>Trainers</h2> */}
            

            <div className=' w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6'>
              
                
              {nft.map((item, index) => (
                <NftComplanCard key={item.id} id={item.id} name={item.name} duration={item.duration} profit={item.profit} stocks={item.stocks} price={item.price} limit={item.limit} isActive={item.isActive} sold={item.timesbought}/>
              ))}
               

            </div>
      </TabsContent>
    </Tabs>
    
          
    
           
        </div>
  )
}
