'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import loadingtableStore from '@/zustand/tableloading'
import rateStore from '@/zustand/rate'
import refreshStore from '@/zustand/refresh'

interface List {
    trainername: string
    rank: string
    type: string
    createdAt: string

}

export default function ClaimHistory() {
    const router = useRouter()
    const [list, setList] = useState<List[]>([])
    const [totalpage, setTotalPage] = useState(0)
    const [currentpage, setCurrentPage] = useState(0)
    const {loading, setLoading, clearLoading} = loadingtableStore()
    const {rate, setRate, clearRate} = rateStore()
    const {refresh, setRefresh} = refreshStore()

    useEffect(() => {
        setLoading(true)
        const getList = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/inventory/getinventoryhistory?type=claim&page=${currentpage}&limit=10`,{
            withCredentials:true
            })

            setList(response.data.data.history)
            setTotalPage(response.data.data.totalpages)
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
        getList()
    },[currentpage, refresh])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }


  return (
     <div className=' w-full flex flex-col gap-4 h-auto bg-white rounded-xl shadow-sm p-6 mt-12'>
        <p className=' text-sm font-medium'>Claim History</p>
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
                <TableHead>Pet name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Rank</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{item.trainername}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.rank}</TableCell>
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
  )
}
