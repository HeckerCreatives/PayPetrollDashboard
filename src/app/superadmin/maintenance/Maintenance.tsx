'use client'
import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import trainertabStore from '@/zustand/trainertab'
import loadingStore from '@/zustand/loading'
import { useRouter } from 'next/navigation'
import refreshStore from '@/zustand/refresh'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

interface List {
    type: string
    value: string
}

export default function Maintenance() {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()
    const [list, setList] = useState<List[]>([])

    const event = list.find((item) => item.type === 'eventgame')
    const buyonetakeone = list.find((item) => item.type === 'b1t1')

    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/maintenance/getmaintenance`,{
            withCredentials:true
            })

            setLoading(false)
            setList(response.data.data.maintenancelist)
            
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
    },[ refresh])

    useEffect(() => {
        setChecked1(event?.value == '0' ? false : true)
        setChecked3(buyonetakeone?.value == '0' ? false : true)
    },[list])

    const updateMaintenance = async (data: string, open: boolean) => {
        setRefresh('true');
        setLoading(true);
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/maintenance/changemaintenance`, {
                type: data,
                value: open ? '1' : '0'
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'Application/json'
                }
            });

            const response = await toast.promise(request, {
                loading: `Updating ${data === 'eventgame' ? 'event game' : 'buy one take one'} maintenance...`,
                success: `${data === 'eventgame' ? 'Event game' : 'Buy one take one'} successfully ${open ? 'on' : 'off'}. `,
                error: `Error while updating ${data === 'eventgame' ? 'event game' : 'buy one take one'} maintenance.`,
            });
            if (response.data.message === 'success') {
                setRefresh('false');
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

  return (
    <div className="w-full flex flex-col gap-4 font-light">
        <h2 className=' text-xl font-bold mt-8 text-white'>Maintenance</h2>

        <div className=' flex flex-wrap items-center gap-4'>
            <div className='flex flex-col gap-2 bg-white p-4 rounded-md w-full max-w-[250px]'>
                <h2 className=' text-lg font-semibold'>Events ({!checked1 ? 'off' : 'on'})</h2>
                <Switch checked={checked1} 
                onCheckedChange={(newChecked) => {
                    setChecked1(newChecked); 
                    updateMaintenance('eventgame', newChecked); 
                }}
                />
            </div>


            <div className='flex flex-col gap-2 bg-white p-4 rounded-md w-full max-w-[250px]'>
                <h2 className=' text-lg font-semibold'>Buy one take one({!checked3 ? 'off' : 'on'})</h2>
                <Switch checked={checked3} 
                 onCheckedChange={(newChecked) => {
                    setChecked3(newChecked); 
                    updateMaintenance('b1t1', newChecked); 
                }}
                />
                
            </div>

        </div>
    </div>
  )
}
