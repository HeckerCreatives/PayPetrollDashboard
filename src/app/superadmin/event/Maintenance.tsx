'use client'
import React, { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import trainertabStore from '@/zustand/trainertab'
import loadingStore from '@/zustand/loading'
import { useRouter } from 'next/navigation'
import refreshStore from '@/zustand/refresh'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { Input } from '@/components/ui/input'

interface List {
    type: string
    value: string
}

interface IngameEntry {
    type: 'entrylimit' | 'tierentry' | 'gametimelimit';
    value: number | string[];
}

const TIER_OPTIONS = ['free', 'novice', 'expert', 'elite'] as const;

type TierType = typeof TIER_OPTIONS[number];

interface TierEntry {
  type: 'tierentry';
  value: TierType[];
}



export default function Maintenance() {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(false)
    const [checked3, setChecked3] = useState(false)
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()
    const [list, setList] = useState<List[]>([])
    const [ingame, setIngame] = useState<IngameEntry[]>([])
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [entry, setEntry] = useState(0)

    const [tierEntry, setTierEntry] = useState<TierEntry>({
    type: 'tierentry',
    value: ['free', 'novice', 'expert', 'elite'], // initial state
  });

  const toggleTier = (tier: TierType) => {
    setTierEntry(prev => ({
      ...prev,
      value: prev.value.includes(tier)
        ? prev.value.filter(t => t !== tier)
        : [...prev.value, tier],
    }));
  };

    const getMilliseconds = (min: number, secs: number) => {
        const ms = (min * 60 + secs) * 1000;
        console.log("Milliseconds:", ms);
        return ms;
    };

    const event = list.find((item) => item.type === 'eventgame')
    const buyonetakeone = list.find((item) => item.type === 'b1t1')
    const payout = list.find((item) => item.type === 'payout')
    const entrylimit = ingame.find((item) => item.type === 'entrylimit')
    const timelimit = ingame.find((item) => item.type === 'gametimelimit')
    const tierentry = ingame.find((item) => item.type === 'tierentry')

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
        setLoading(true)
        const getData = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reset/resetleaderboard`,{
            withCredentials:true
            })

            setLoading(false)
            
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
    },[ refresh])

    useEffect(() => {
        setChecked1(event?.value == '0' ? false : true)
        setChecked2(payout?.value == '0' ? false : true)
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
                success: `${data === 'eventgame' 
                ? 'Event game' 
                : data === 'payout' 
                    ? 'Payout' 
                    : 'Buy one take one'} successfully ${open ? 'on' : 'off'}.`,

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

    const resetleaderboard = async () => {
        setRefresh('true');
        setLoading(true);
        try {
            const request = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reset/resetleaderboard`,{
                withCredentials: true,
                headers: {
                    'Content-Type': 'Application/json'
                }
            });

            const response = await toast.promise(request, {
                loading: `Reseting leaderboard...`,
                success: `Leaderboard successfully reset. `,
                error: `Error while reseting leaderboard.`,
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

     useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ingame/getingamelist`,{
            withCredentials:true
            })

            setLoading(false)
            setIngame(response.data.data.ingamelist)
            
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

     const updateIngame = async (data: string, value: any) => {
        setRefresh('true');
        setLoading(true);
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ingame/updateingamelist`, {
                type: data,
                value: value
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'Application/json'
                }
            });

            const response = await toast.promise(request, {
                loading: `Updating ${data}...`,
                success: `Success`,

                error: `There's an error while updating the data.`,
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

    useEffect(() => {
        setEntry(entrylimit?.value as number)
    },[])


  return (
    <div className="w-full flex flex-col gap-4 font-light">

        <div className=' w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
        

            <div className=' h-auto flex flex-col gap-2 bg-white p-4 rounded-md w-full '>
                <h2 className=' text-lg font-semibold'>Events ({!checked1 ? 'off' : 'on'})</h2>
                <Switch checked={checked1} 
                onCheckedChange={(newChecked) => {
                    setChecked1(newChecked); 
                    updateMaintenance('eventgame', newChecked); 
                }}
                />
            </div>

            <div className=' h-auto flex flex-col gap-2 bg-white p-4 rounded-md w-full '>
                <h2 className=' text-lg font-semibold'>Leaderboard</h2>
                
                <button onClick={resetleaderboard} className=' primary-btn text-xs'>
                    {loading === true && (
                        <span className='loader'></span>
                    )}
                    Reset</button>
                
            </div>

              <div className=' h-auto flex flex-col gap-2 bg-white p-4 rounded-md w-full'>
                <h2 className=' text-lg font-semibold'>Player Entry Limit</h2>
                <div className=' flex items-center gap-2'>
                    <Input placeholder='Limit' type='number' value={entry} onChange={(e) => setEntry(e.target.valueAsNumber)}/>
                    <button onClick={() => updateIngame('entrylimit',entry)}  className=' px-3 primary-btn text-xs'>
                    {loading === true && (
                        <span className='loader'></span>
                    )}
                Save</button>
                </div>
                
                
            </div>

             <div className=' h-auto flex flex-col gap-2 bg-white p-4 rounded-md w-full '>
                <h2 className=' text-lg font-semibold'>Tier Entry</h2>
                <div className=' flex items-center gap-2'>
                   <div className=' flex items-center gap-2 w-full'>
                    {TIER_OPTIONS.map(tier => (
                    <label key={tier} className=' flex flex-col items-center text-sm'>
                        <input
                        type="checkbox"
                        checked={tierEntry.value.includes(tier)}
                        onChange={() => toggleTier(tier)}
                        />
                        {tier}
                    </label>
                    ))}
                </div>
                    <button onClick={() => updateIngame('tierentry', tierEntry.value)} className=' px-3 primary-btn text-xs'>
                    {loading === true && (
                        <span className='loader'></span>
                    )}
                Save</button>
                </div>
                
                
            </div>


            <div className=' h-auto flex flex-col gap-2 bg-white p-4 rounded-md w-full '>
                <h2 className=' text-lg font-semibold'>Time Limit</h2>
                <div className=' flex items-center gap-2'>
                 <div className=' flex flex-col'>
                    <label htmlFor="" className=' text-[.7rem]'>Minutes</label>
                    <Input placeholder="Seconds" type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.valueAsNumber)} />
                    </div>

                    <div className=' flex flex-col'>
                    <label htmlFor="" className=' text-[.7rem]'>Seconds</label>
                    <Input placeholder="Seconds" type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(e.target.valueAsNumber)} />
                    </div>


                    <button onClick={() => updateIngame('gametimelimit',getMilliseconds(minutes, seconds))} className=' px-3 primary-btn text-xs'>
                    {loading === true && (
                        <span className='loader'></span>
                    )}
                Save</button>
                </div>
                
                
            </div>

            



        </div>
    </div>
  )
}
