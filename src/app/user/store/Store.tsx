"use client"
import React, { useEffect, useState } from 'react'
import Trainercard from '@/components/common/Trainercard';
import trainertabStore from '@/zustand/trainertab';
import Petcard from '@/components/common/Petcard';
import loadingStore from '@/zustand/loading';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Petloadingcard from '@/components/common/Petcardloading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NftStoreCard from '@/components/common/NftStoreCard';
import refreshStore from '@/zustand/refresh';



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
  purchasedCount: number
}


export default function Store() {
    const {tab, setTab, clearTab} = trainertabStore()
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const [store, setStore] = useState<Store[]>([])
    const [nft, setNft] = useState<NFT[]>([])
    const {refresh, setRefresh} = refreshStore()


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

     useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trainer/getnfttrainers`,{
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

    const filteredNft = nft.filter((item) => item.isActive === true)




  return (
    <div className="w-full flex flex-col gap-4 font-light">
    
            <h2 className=' text-xl font-bold mt-8 text-white'>Store</h2>

            <Tabs defaultValue="fiat" className="w-full">
            <TabsList>
              <TabsTrigger value="fiat">Fiat</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
            </TabsList>
            <TabsContent value="fiat">
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
            </TabsContent>
            <TabsContent value="nft">
              
                <h2 className=' text-sm font-medium mt-4 text-white'>NFT</h2>
                <div className=' w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6'>
                  

                    {loading === true ? (
                        <>
                        {[0,1,2,3,4].map((item, index) => (
                            <Petloadingcard key={index} id={''} name={''} animal={''} rank={''} min={0} max={0} duration={0} profit={0}/>
                        ))}
                        </>
                            
                    ) : (
                        <>
                        {filteredNft.map((item, index) => (
                          <NftStoreCard id={item.id} name={item.name} duration={item.duration} profit={item.profit} price={item.price} stocks={item.stocks} limit={item.limit}  purchasedCount={item.purchasedCount}/>
                            ))}
                        </>
                    )}

                    

                </div>

                {filteredNft.length === 0 && (
                  <div className=' w-full flex items-center justify-center py-16'>
                   <p className=' text-xs text-zinc-200'>No NFTs available at the moment</p>
                  </div>
                )}

                
            </TabsContent>
          </Tabs>

          
    
           
        </div>
  )
}
