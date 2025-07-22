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
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import OwnPetcard from '@/components/common/Ownpetscard';
import Pagination from '@/components/common/Pagination';
import refreshStore from '@/zustand/refresh';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OwnNftCard from '@/components/common/OwnNftCard';
import ClaimHistory from './Claimhistory';
import DailyClaimHistory from './GameDailyclaimHistory';


interface Store {
    trainers: Pets[]
    rank: string
}

interface Pets {
    type: string
    trainer: string
    rank: string
    qty: number,
    totalaccumulated: number,
    dailyaccumulated: number,
    limittotal: number,
    limitdaily: number
    remainingtime: number
}


export interface NftItem {
  nftid: string;
  petname: string;
  type: string; // e.g., "NFT"
  rank: string; // e.g., "NFT"
  buyprice: number;
  profit: number;
  duration: number;
  earnings: number;
  remainingtime: number;
  purchasedate: string; // ISO date string
  maturedate: string; // ISO date string
}

export interface NftData {
  [key: string]: NftItem; // e.g., "0": NftItem, "1": NftItem, etc.
}



export default function Mypets() {
    const {tab, setTab, clearTab} = trainertabStore()
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const [list, setList] = useState<Pets[]>([])
    const [nft, setNft] = useState<NftItem[]>([])
    const [totalpage, setTotalPage] = useState(0)
    const [currentpage, setCurrentPage] = useState(0)
    const [nfttotalpage, setNftTotalPage] = useState(0)
    const [nftcurrentpage, setNftCurrentPage] = useState(0)
    const {refresh, setRefresh} = refreshStore()


    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inventory/getinventory?rank=${tab}&page=${currentpage}&limit=9`,{
            withCredentials:true
            })

            setLoading(false)
            setList(response.data.data)
            setTotalPage(response.data.totalpages)
            
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
    },[tab, currentpage, refresh])

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inventory/getnftinventory?page=${nftcurrentpage}&limit=6`,{
            withCredentials:true
            })

            setLoading(false)
            setNft(response.data.data.nft)
            setNftTotalPage(response.data.data.totalPages)
            
          } catch (error) {
            setLoading(false)
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string, data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
                 
                }    
              } 
          }
        }
        getData()
    },[ refresh, nftcurrentpage])

    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    }

     const handleNftPageChange = (page: number) => {
      setNftCurrentPage(page)
    }

  return (
    <div className="w-full flex flex-col gap-4 font-light">

      <Tabs defaultValue="fiat" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="fiat">Fiat</TabsTrigger>
          <TabsTrigger value="nft">NFT</TabsTrigger>
        </TabsList>
        <TabsContent value="fiat">
           <h2 className=' text-xl font-bold mt-8 text-white'>My Pets</h2>

            <h2 className=' text-sm font-medium mt-4 text-white'>Trainers</h2>
            <div className=' w-full h-[100px] flex flex-nowrap gap-4 overflow-y-hidden overflow-x-auto'>
                
                <Trainercard img={'/assets/Trainer1.png'} name={'Novice'} pets={5} tab={''} rank={'Novice'} disable={false}/>
                <Trainercard img={'/assets/Trainer2.png'} name={'Expert '} pets={5} tab={''} rank={'Expert'} disable={false}/>
                <Trainercard img={'/assets/Trainer3.png'} name={'Elite Trainer'} pets={5} tab={''} rank={'Elite'} disable={false}/>
                <Trainercard img={'/assets/Trainer4.png'} name={'Spade Trainer'} pets={5} tab={''} rank={''} disable={true}/>
                <Trainercard img={'/assets/Trainer5.png'} name={'Heart Trainer'} pets={5} tab={''} rank={''} disable={true}/>


            </div>

            <h2 className=' text-sm font-medium mt-4 text-white'>Pets</h2>
            <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-fit'>
                {Object.values(list).map((item, index) => (
                    <OwnPetcard key={index} id={item.trainer} type={item.type} creatureid={item.trainer} rank={item.rank} qty={item.qty} totalaccumulated={item.totalaccumulated} dailyaccumulated={item.dailyaccumulated} limittotal={item.limittotal} limitdaily={item.limitdaily} remainingtime={item.remainingtime} />
                ))}

                
                

            </div>

            {Object.values(list).length === 0 && (
                  <div className=' w-full h-[200px] flex items-center justify-center'>
                    <p className=' text-sm text-zinc-200'>No pets.</p>
                  </div>
                )}

            {Object.values(list).length !== 0 && (
                <div className=' w-full flex items-center justify-center mt-6'>
                  <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
                </div>
            )}

             <Tabs defaultValue="Claim" className="w-full mt-8">
               <TabsList className=' bg-white'>
                   <TabsTrigger value="Claim">Earning Claim History</TabsTrigger>
                   <TabsTrigger value="Daily">Game Claim History</TabsTrigger>
               </TabsList>
               <TabsContent value="Claim">
                   <ClaimHistory/>
               </TabsContent>
               <TabsContent value="Daily">
                   <DailyClaimHistory/>
               </TabsContent>
               </Tabs>

        </TabsContent>
        
        <TabsContent value="nft">
          <h2 className=' text-xl font-bold mt-8 text-white'>My NFT</h2>

          

            <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-fit mt-4'>
                {Object.values(nft).map((item, index) => (
                  <OwnNftCard id={item.nftid} type={item.type} totalaccumulated={item.earnings} remainingtime={item.remainingtime} name={item.petname}/>
                ))}

              
            </div>

            {Object.values(nft).length === 0 && (
                  <div className=' w-full h-[200px] flex items-center justify-center'>
                    <p className=' text-sm text-zinc-200'>No nft.</p>
                  </div>
                )}

            {Object.values(nft).length !== 0 && (
                <div className=' w-full flex items-center justify-center mt-6'>
                  <Pagination currentPage={nftcurrentpage} total={nfttotalpage} onPageChange={handleNftPageChange}/>
                </div>
            )}

               <ClaimHistory/>
        </TabsContent>
      </Tabs>
    
           
    
           
        </div>
  )
}
