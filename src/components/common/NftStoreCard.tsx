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
import refreshStore from '@/zustand/refresh'

type Props = {
    id: string
    name: string
    duration: number,
    profit: number,
    price: number,
    stocks: number,
}

export default function NftStoreCard(prop: Props) {
    const [val, setVal] = useState([0]);
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()
    const [open, setOpen] = useState(false)


    const img = petimg.find((item) => item.id === prop.name)

    const buyNft = async () => {
        setDialog(false)
        setLoading(true)
        setRefresh('true')
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/buynfttrainer`,{
                nftid: prop.id,
            },{
                withCredentials: true,
                headers:{
                    'Content-Type':'Application/json'
                }
            })

            const response = await toast.promise(request, {
                loading: `Purchasing ${prop.name}...`,
                success: `You succesfully purchased ${prop.name}`,
                error: `Error while purchasing ${prop.name}`,
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

    const bgImage = (data: string) => {
        if(data === 'iron Puppy'){
            return '/nft/ironpuppy.jpg'
        }else if(data === 'Shiba Ihulk'){
            return '/nft/shibahulk.jpg'
        }else if(data === 'Captain Hachi'){
            return '/nft/captainhachi.jpg'
        }else if(data === 'Thor Inu'){
            return '/nft/thorinu.jpg'
        } else {
            return '/nft/shibathanos.jpg'
        }
    }

    // const canBuy = async () => {
    //     setLoading(true)
    //     try {
    //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trainer/getusertrainer?type=${prop.rank}`,{
    //     withCredentials:true
    //     })
    
    //     setLoading(false)
    //     if(response.data.message === 'success'){
    //         buyPet()
    //         setLoading(false)
    //         setOpen(false)
    //     }
                
    //     } catch (error) {
    //     setLoading(false)
    //     setOpen(false)
    //     if (axios.isAxiosError(error)) {
    //         const axiosError = error as AxiosError<{ message: string, data: string }>;
    //         if (axiosError.response && axiosError.response.status === 401) {
    //             toast.error(`${axiosError.response.data.data}`)
    //             router.push('/')

    //         }

    //         if (axiosError.response && axiosError.response.status === 400) {
    //             toast.error(`${axiosError.response.data.data}`)     
                    
    //         }

    //         if (axiosError.response && axiosError.response.status === 402) {
    //             toast.error(`${axiosError.response.data.data}`)          
                        
    //         }

    //         if (axiosError.response && axiosError.response.status === 403) {
    //             toast.error(`${axiosError.response.data.data}`)              
                
    //         }

    //         if (axiosError.response && axiosError.response.status === 404) {
    //             toast.error(`${axiosError.response.data.data}`)             
    //         }
    // } 

    //     }
    // }
        



  return (
    <div className=' group w-full h-auto '>

                        <div className=' w-full flex'>

                            <div className=' w-[70%] h-[35px] bg-dark text-white rounded-t-md flex items-center p-2'
                            style={{ clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)' }}
                            >
                                <p className=' text-[.6rem] md:text-xs font-medium'>{prop.name}</p>

                            </div>

                        </div>

                        <div className=' group-hover:bg-gray-200 transition-all duration-300 w-full aspect-square  shadow-sm flex items-center justify-center relative bg-white p-6'
                        
                        >
                            <img src={bgImage(prop.name)} alt='store' width={200} height={200}  className=' group-hover:scale-110 transition-all duration-300'/>



                           

                        </div>

                        <div className=' w-full flex items-center justify-between text-sm py-2'>
                            <p className=' font-medium text-white'>{prop.price.toLocaleString()} <span className=' text-[.6rem] md:text-xs font-normal'>php</span></p>

                            <Sheet open={open} onOpenChange={setOpen} key={'bottom'}>
                            <SheetTrigger className=' primary-btn px-4 font-medium'>
                                Buy now
                            </SheetTrigger>
                            <SheetContent side={'bottom'} className=' h-auto max-h-[90%] lg:h-[500px] flex items-center justify-center'>
                                <DialogTitle></DialogTitle>
                                <div className=' w-full max-w-[1040px] h-full flex items-center justify-center gap-4'>
                                    <div className=' w-full h-full max-w-[1020px] flex md:flex-row flex-col gap-4'>
                                        <div className=' bg-gray-100 flex items-center justify-center h-full aspect-video lg:aspect-square'>
                                            <img src={bgImage(prop.name)} alt='store' width={300} height={300}  className=' w-[200px] md:w-[300px] group-hover:scale-110 transition-all duration-300'/>
                                        </div>

                                        <div className=' w-full lg:w-[40%] flex flex-col justify-end gap-2'>
                                            <h2 className=' text-3xl font-semibold'>{prop.name}</h2>
                                            <p className=' text-sm mt-4'>{prop.profit * 100}% profit</p>
                                            <p className=' text-sm'>{prop.duration} days duration</p>
                                            <p className=' text-sm'>Price: {prop.price.toLocaleString()}php</p>

                                            <p className='text-zinc-50 mt-4 bg-red-600 rounded-full w-fit px-3 py-1 text-xs '>Stocks left: {prop.stocks}</p>

                                      
                                           
                                            <button onClick={buyNft} disabled={loading} className=' primary-btn px-6 w-fit mt-4 flex items-center justify-center gap-2'>
                                                {loading === true && (
                                                <span className="loader"></span>
                                                )}
                                                Buy now</button>

                                        </div>
                                    </div>
                                    
                                </div>
                                <SheetFooter>
                                <SheetClose asChild>
                                    {/* <Button type="submit">Save changes</Button> */}
                                </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                            </Sheet>

                        </div>

    </div>
  )
}
