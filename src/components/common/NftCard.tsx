'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { petimg } from '@/app/data/data'
import loadingStore from '@/zustand/loading'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import refreshStore from '@/zustand/refresh'
import { useForm } from 'react-hook-form'
import { complanSchema, NftComplan, nftcomplanSchema, SaveComplan } from '@/validitions/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '../ui/switch'

type Props = {
    id: string
    name: string
    duration: number,
    profit: number,
    stocks: number,
    price: number,
    limit: number,
    isActive: boolean
    sold: number
}

export default function NftComplanCard(prop: Props) {
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()
    const [checked, setChecked] = useState(false)


    // Form handler
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        trigger,
        formState: { errors },
    } = useForm<NftComplan>({
        resolver: zodResolver(nftcomplanSchema),
        defaultValues: ({
             duration: prop.duration,
             profit: prop.profit,
             stocks: prop.stocks,
             price: prop.price,
             limit: prop.limit,
             isActive: prop.isActive
         
        })
    });

    useEffect(() => {
        reset({
          duration: prop.duration,
          profit: prop.profit * 100,
         
             stocks: prop.stocks,
             price: prop.price,
               limit: prop.limit,
               isActive: prop.isActive
        
        });
        setChecked(prop.isActive)
      }, [prop, reset]);

    const onsubmit = async (data: NftComplan) => {
        setRefresh('true');
        setLoading(true);
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trainer/editnfttrainer`, {
                nftid: prop.id,
                profit: data.profit / 100,
                duration: data.duration,
                price: data.price,
                stocks: data.stocks,
                limit: data.limit,
                isActive: data.isActive
             
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'Application/json'
                }
            });

            const response = await toast.promise(request, {
                loading: `Updating complan for ${prop.name}...`,
                success: `Complan updated successfully. `,
                error: `Error while updating complan for ${prop.name}.`,
            });
            if (response.data.message === 'success') {
                setRefresh('false');
                reset();
                setLoading(false);
            }
        } catch (error) {
            setRefresh('true');
            setLoading(false);

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`);
                    router.push('/');
                }

                if (axiosError.response && axiosError.response.status === 400) {
                    toast.error(`${axiosError.response.data.data}`);
                }

                if (axiosError.response && axiosError.response.status === 402) {
                    toast.error(`${axiosError.response.data.data}`);
                }

                if (axiosError.response && axiosError.response.status === 403) {
                    toast.error(`${axiosError.response.data.data}`);
                }

                if (axiosError.response && axiosError.response.status === 404) {
                    toast.error(`${axiosError.response.data.data}`);
                }
            }
        }
    };

    const img = petimg.find((item) => item.id === prop.name)

    const bgImage = (data: string) => {
        if(data.toLowerCase() === 'iron puppy'){
            return '/nft/ironpuppy.jpg'
        }else if(data === 'Shiba Hulk'){
            return '/nft/shibahulk.png'
        }else if(data === 'Captain Hachi'){
            return '/nft/captainhachi.jpg'
        }else if(data === 'Thor Inu'){
            return '/nft/thorinu.jpg'
        } else {
            return '/nft/shibathanos.jpg'
        }
    }


    useEffect(() => {
        reset({
         
             duration: prop.duration,
               profit: prop.profit * 100,
             stocks: prop.stocks,
             price: prop.price,
               limit: prop.limit,
         
        })
    },[prop])



  return (
    <div className=' group w-full h-auto bg-white rounded-md overflow-hidden'>

                   

                        <div className=' group-hover:bg-gray-200 transition-all duration-300 w-full aspect-video  shadow-sm flex items-center justify-center relative bg-white p-4'
                        
                        >
                            <img src={bgImage(prop.name)} alt='store' width={200} height={150}  className=' group-hover:scale-110 transition-all duration-300'/>


                        </div>

                       <form onSubmit={handleSubmit(onsubmit)} action="" className=' p-4'>
                         <div className=' w-full flex justify-between'>
                            <p className=' text-sm font-medium'>Available on Store</p>
                            <Switch 
                             checked={checked} 
                            onCheckedChange={(value) => {setValue('isActive', value), setChecked(value)}} 
                            />
                        </div>
                     
                        <p className=' text-lg font-medium'>{prop.name}</p>


                        <label htmlFor="" className=' text-xs text-zinc-500 mt-2'>Profit (%)</label>
                        <Input type='number' className=' text-xs' {...register('profit', {valueAsNumber: true})}/>
                        {errors.profit && <p className='text-[.6em] text-red-500'>{errors.profit.message}</p>}


                        <label htmlFor="" className=' text-xs text-zinc-500 mt-2' >Duration (days)</label>
                        <Input  type='number' className=' text-xs' {...register('duration', {valueAsNumber: true})}/>
                        {errors.duration && <p className='text-[.6em] text-red-500'>{errors.duration.message}</p>}

                         <label htmlFor="" className=' text-xs text-zinc-500 mt-2' >Stocks</label>
                        <Input  type='number' className=' text-xs' {...register('stocks', {valueAsNumber: true})}/>
                        {errors.stocks && <p className='text-[.6em] text-red-500'>{errors.stocks.message}</p>}

                         <label htmlFor="" className=' text-xs text-zinc-500 mt-2' >Price</label>
                        <Input  type='number' className=' text-xs' {...register('price', {valueAsNumber: true})}/>
                        {errors.price && <p className='text-[.6em] text-red-500'>{errors.price.message}</p>}

                         <label htmlFor="" className=' text-xs text-zinc-500 mt-2' >Limit</label>
                        <Input  type='number' className=' text-xs' {...register('limit', {valueAsNumber: true})}/>
                        {errors.limit && <p className='text-[.6em] text-red-500'>{errors.limit.message}</p>}


                        <p className=' text-sm text-black mt-4'>Stocks Sold: {prop.sold.toLocaleString()}</p>


                        <button className=' primary-btn w-full mt-4'>Save</button>
                       </form>

    </div>
  )
}
