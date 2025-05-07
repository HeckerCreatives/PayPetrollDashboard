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

interface List {
  _id: string
  username: string
  createdAt: string
  level: number,
  totalAmount: number

}


export default function Invites() {
  const [current, setCurrent] = useState('0');
  const { loading, setLoading, clearLoading } = loadingStore()
  const router = useRouter()
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [list, setList] = useState<List[]>([])
  const {rate, setRate, clearRate} = rateStore()
  const [search, setSearch] = useState('')

  const params = useSearchParams()
const id = params.get('id')

  


  //invites 
  useEffect(() => {
   
    const debounceTimer = setTimeout(() => {
        if(id !== null) {
        fetchData();

        }
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [current, search, currentpage]); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/unilevel/playeviewadminunilevel?playerid=${id}&level=${current}&page=${currentpage}&limit=10&search=${search}`,
        { withCredentials: true }
      );

      setLoading(false);
      setList(response.data.data.length !== 0 ? response.data.data[0].data : []);
      setTotalPage(response.data.data[0].totalPages);
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
                {Array.from({ length: 12 }).map((_, index) => (
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
                <TableHead className="">Date</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Lvl</TableHead>
                <TableHead className="">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={item._id}>
                <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>Lvl {item.level}</TableCell>

                <TableCell className=' '>
                  <div className='flex flex-col'>
                    ₱{item.totalAmount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.totalAmount / rate).toLocaleString()}</span>
                  </div>
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