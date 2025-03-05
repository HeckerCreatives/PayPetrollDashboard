'use client';
import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import loadingStore from '@/zustand/loading';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/common/Pagination';
import rateStore from '@/zustand/rate';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Countdown from 'react-countdown';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import refreshStore from '@/zustand/refresh';
import { Box, Trash2 } from 'lucide-react';
import GrantForm from '@/components/forms/Grant';

  

interface List {
    type: string
    trainer: string
    rank: string
    totalaccumulated: number,
    dailyaccumulated: number,
    limittotal: number,
    limitdaily: number,
    earnings: number,
    remainingtime: number

}


export default function Inventory() {
  const [current, setCurrent] = useState('0');
  const { loading, setLoading, clearLoading } = loadingStore()
  const router = useRouter()
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [list, setList] = useState<List[]>([])
  const {rate, setRate, clearRate} = rateStore()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const params = useSearchParams()
  const id = params.get('id')

  const { refresh, setRefresh} = refreshStore()


  


  //invites 
  useEffect(() => {
   
    const debounceTimer = setTimeout(() => {
        if(id !== null) {
        fetchData();

        }
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [currentpage, search]); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory/getplayerinventoryforadmin?playerid=${id}&page=${currentpage}&limit=10`,
        { withCredentials: true }
      );

      setLoading(false);
      setList(response.data.data)
      setTotalPage(response.data.totalpages)
    
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; data: string }>;
        if (axiosError.response && axiosError.response.status === 401) {
          
        }
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const grantPet = async ( petid: string) => {
    setRefresh('true');
    setLoading(true);
    try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/maxplayerinventorysuperadmin`, {
          playerid: id,
          petid: petid
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const response = await toast.promise(request, {
            loading: `Granting pet maturity...`,
            success: `Successfully granted `,
            error: `Error while granting pet maturity.`,
        });
        if (response.data.message === 'success') {
            setRefresh('false');
            setOpen(false)
            setLoading(false);
            // window.location.reload()
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
    <div className="w-full flex flex-col gap-8">

      <div className=' w-full p-6 bg-white shadow-sm rounded-md'>

        <div className=' flex flex-wrap items-center gap-4 mb-6'>
            <Input type='text' placeholder='Search e.g user123' value={search} onChange={(e) => setSearch(e.target.value)} className=' w-[250px] bg-gray-100 '/>

            <Select value={current} onValueChange={setCurrent} >
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
                {Array.from({ length: 10 }).map((_, index) => (
                    <SelectItem key={index} value={`${index}`}>Level {index + 1}</SelectItem>
                ))}
                
            </SelectContent>
            </Select>


        </div>


        <Table>
            {loading === true && (
                <TableCaption>
                  <span className=' loaderdark'></span>
                </TableCaption>
            )}
            {list.length === 0 && (
              <TableCaption>No data.</TableCaption>
            )}
            <TableHeader>
                <TableRow>
                <TableHead className="">Pet Name</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="">TotalAccumulated</TableHead>
                {/* <TableHead className="">Duration</TableHead> */}
                <TableHead className="">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={item.trainer}>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.rank}</TableCell>

                <TableCell className=' '>
                  <div className='flex flex-col'>
                    ₱{item.totalaccumulated.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.totalaccumulated / rate).toLocaleString()}</span>
                  </div>
                </TableCell>



                {/* <TableCell className=' '>
                   <Countdown
                         className=' mt-4'
                        date={Date.now() + (item.remainingtime * 1000)} 
                        renderer={({ days, hours, minutes, seconds }) => (
                        <span className=' text-xs'>
                            {days} : {hours} : {minutes} : {seconds}
                        </span>
                        )}
                    />
                </TableCell> */}

                <TableCell>
               <GrantForm userid={id || ''} petid={item.trainer}/>
                </TableCell>


               
                
                </TableRow>
              ))}
                
            </TableBody>
        </Table>

         {list.length !== 0 && (
            <div className=' w-full flex items-center justify-center mt-6'>
                <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
            </div>
        )}
      </div>

        
    </div>
  );
}