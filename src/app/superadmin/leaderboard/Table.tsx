'use client'
import Pagination from '@/components/common/Pagination'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import rateStore from '@/zustand/rate'
import refreshStore from '@/zustand/refresh'
import loadingtableStore from '@/zustand/tableloading'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface List {
    username: string
    amount: number,
    date: string
    rank: number
}

interface Lead {
  username: string,
  amount: number,
  rank: number
}

export default function Leaderboard() {
    const router = useRouter()
    const [list, setList] = useState<List[]>([])
    const [listlead, setListLead] = useState<Lead[]>([])
    const [totalpage, setTotalPage] = useState(0)
    const [currentpage, setCurrentPage] = useState(0)
    const {loading, setLoading, clearLoading} = loadingtableStore()
    const {rate, setRate, clearRate} = rateStore()
    const {refresh, setRefresh} = refreshStore()
    const [search, setSearch] = useState('')

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setLoading(true);
      
        const delayDebounceFn = setTimeout(async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/getleaderboardhistory?page&limit`,
              {
                withCredentials: true,
              }
            );
      
           setList(response.data.data)
            setTotalPage(response.data.data.totalPages);
            setLoading(false);
          } catch (error) {
            setLoading(false);
      
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string; data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
               
              }
            }
          }
        }, 500); 
      
       
        return () => clearTimeout(delayDebounceFn);
      }, [currentpage, refresh, search, router]); 

      useEffect(() => {
        setLoading(true);
      
        const delayDebounceFn = setTimeout(async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/getleaderboardsa?page&limit`,
              {
                withCredentials: true,
              }
            );

            setListLead(response.data.data.top10)
            setTotalPage(response.data.data.totalPages);
            setLoading(false);
          } catch (error) {
            setLoading(false);
      
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string; data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
               
              }
            }
          }
        }, 500); 
      
       
        return () => clearTimeout(delayDebounceFn);
      }, [currentpage, refresh, search, router]); 



    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


  return (

      <div className=' w-full flex flex-col gap-6 items-center justify-center p-6 bg-white rounded-md'>

        
              <Table>
                {loading === true && (
                    <TableCaption>
                        <span className=' loaderdark'></span>
                    </TableCaption>
                )}
                {listlead.length === 0 && (
                <TableCaption>No data.</TableCaption>
                )}
            <TableHeader>
                <TableRow>
                <TableHead className="">Rank</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Username</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listlead.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell>{item.rank}</TableCell>

                    <TableCell className=' flex flex-col'>₱{item.amount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.amount as any / rate).toLocaleString()}</span></TableCell>

                    <TableCell>{item.username}</TableCell>
                   
                    </TableRow>
                ))}
                
            </TableBody>
            </Table>

            <div className=' w-full flex items-start'>
              <p className=' mt-8 text-lg text-start'>History</p>
            </div>


                <Table className=' mt-4'>
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
                <TableHead className="">Rank</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Username</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className="">{new Date(item.date).toLocaleString()}</TableCell>
                    <TableCell>{item.rank}</TableCell>

                    <TableCell className=' flex flex-col'>₱{item.amount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.amount as any / rate).toLocaleString()}</span></TableCell>

                    <TableCell>{item.username}</TableCell>
                   
                    </TableRow>
                ))}
                
            </TableBody>
            </Table>

            {/* {list.length !== 0 && (
                <div className=' w-full flex items-center justify-center mt-6'>
                    <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>
                </div>
            )} */}
      </div>

      
  )
}
