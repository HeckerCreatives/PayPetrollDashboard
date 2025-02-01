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
import { complanSchema, SaveComplan } from '@/validitions/validation'
import { zodResolver } from '@hookform/resolvers/zod'

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

export default function Complancard(prop: Props) {
    const [dialog, setDialog] = useState(false)
    const [isOpen, setIsopen] = useState('')
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()

    // Form handler
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
    } = useForm<SaveComplan>({
        resolver: zodResolver(complanSchema),
        defaultValues: ({
             duration: prop.duration,
             profit: prop.profit,
             min: prop.min,
             max: prop.max
        })
    });

    useEffect(() => {
        reset({
          duration: prop.duration,
          profit: prop.profit * 100, // Convert profit to percentage
          min: prop.min,
          max: prop.max,
        });
      }, [prop, reset]);

    const onsubmit = async (data: SaveComplan) => {
        setRefresh('true');
        setLoading(true);
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/trainer/edittrainer`, {
                trainerid: prop.id,
                profit: data.profit / 100,
                duration: data.duration,
                min: data.min,
                max: data.max
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

    const bgImage = (animal: string) => {
        if(animal === 'Fish'){
            return '/assets/BG4.png'
        }else if(animal === 'Bird'){
            return '/assets/BG5.png'
        }else if(animal === 'Cat'){
            return '/assets/BG3.png'
        }else if(animal === 'Dog'){
            return '/assets/BG1.png'
        } else {
            return '/assets/BG2.png'
        }
    }


  return (
    <div className=' group w-full h-auto bg-white rounded-md overflow-hidden'>

                   

                        <div className=' group-hover:bg-gray-200 transition-all duration-300 w-full aspect-video  shadow-sm flex items-center justify-center relative'
                        style={{backgroundImage: `url(${bgImage(prop.animal)})`, backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}
                        
                        >
                            <img src={img?.img} alt='store' width={150} height={150}  className=' group-hover:scale-110 transition-all duration-300'/>

                            <p className=' absolute top-2 right-2 rounded-full bg-light text-white text-[.6rem] font-medium px-3 py-1'>{prop.animal}</p>

                        </div>

                       <form onSubmit={handleSubmit(onsubmit)} action="" className=' p-4'>
                        <p className=' text-lg font-medium'>{prop.name}</p>
                        <p className=' text-xs '>{prop.rank}</p>

                        <label htmlFor="" className=' text-xs text-zinc-500 mt-2'>Profit (%)</label>
                        <Input type='number' className=' text-xs' {...register('profit', {valueAsNumber: true})}/>
                        {errors.profit && <p className='text-[.6em] text-red-500'>{errors.profit.message}</p>}


                        <label htmlFor="" className=' text-xs text-zinc-500 mt-2' >Duration (days)</label>
                        <Input  type='number' className=' text-xs' {...register('duration', {valueAsNumber: true})}/>
                        {errors.duration && <p className='text-[.6em] text-red-500'>{errors.duration.message}</p>}


                        <label htmlFor="" className=' text-xs text-zinc-500 mt-2'>Mininum (php)</label>
                        <Input  type='number' className=' text-xs' {...register('min', {valueAsNumber: true})}/>
                        {errors.min && <p className='text-[.6em] text-red-500'>{errors.min.message}</p>}


                        <label htmlFor="" className=' text-xs text-zinc-500 mt-2'>Maximum (php)</label>
                        <Input  type='number' className=' text-xs' {...register('max', {valueAsNumber: true})}/>
                        {errors.max && <p className='text-[.6em] text-red-500'>{errors.max.message}</p>}


                        <button className=' primary-btn w-full mt-4'>Save</button>
                       </form>

    </div>
  )
}
