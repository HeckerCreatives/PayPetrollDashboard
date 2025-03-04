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
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from 'lucide-react'


interface List {
    id: string
    username: string
    userid: string
    firstname: string
    lastname: string
    value: string
    status:  string
    createdAt: string

}



export default function Payinhistory() {
    const router = useRouter()
    const [list, setList] = useState<List[]>([])
    const [totalpage, setTotalPage] = useState(0)
    const [currentpage, setCurrentPage] = useState(0)
    const {loading, setLoading, clearLoading} = loadingtableStore()
    const {rate, setRate, clearRate} = rateStore()
    const [search, setSearch] = useState('')
    const { refresh, setRefresh} = refreshStore()
    const [open, setOpen] = useState(false)



    useEffect(() => {
        setLoading(true);
    
        const delayDebounceFn = setTimeout(async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/payin/getpayinhistorysuperadmin?page=${currentpage}&limit=10&searchUsername=${search}`,
              { withCredentials: true }
            );
    
            setList(response.data.data.payinhistory);
            setTotalPage(response.data.data.totalPages);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string; data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
               
              }
            }
          } finally {
            setLoading(false);
          }
        }, 500); 
    
        return () => clearTimeout(delayDebounceFn); 
      }, [currentpage, search, refresh]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const deletePayin = async (userid: string, transactionid: string) => {
      setRefresh('true');
      setLoading(true);
      try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payin/deletepayinplayersuperadminn`, {
            userid: userid,
            transactionid: transactionid
          }, {
              withCredentials: true,
              headers: {
                  'Content-Type': 'Application/json'
              }
          });

          const response = await toast.promise(request, {
              loading: `Deleting payin...`,
              success: `Successfully deleted `,
              error: `Error while deleting payin.`,
          });
          if (response.data.message === 'success') {
              setRefresh('false');
              setOpen(false)
              setLoading(false);
              window.location.reload()
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
     <div className=' w-full flex flex-col gap-4 h-auto bg-white rounded-xl shadow-sm mt-4 p-6'>
        <div className=' w-full flex items-center justify-between '>
        <p className=' text-sm font-medium'>Payin History</p>

        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search user...' className=' bg-gray-100 w-fit'/>
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
                <TableHead>Amount</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell className=' flex flex-col'>₱{item.value.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.value as any / rate).toLocaleString()}</span></TableCell>

                    <TableCell>{item.username}</TableCell>
                    <TableCell>
                    <Dialog >
                      <DialogTrigger className=' text-[.7rem] bg-red-500 text-white py-1 px-3 rounded-md flex items-center gap-1'><Trash2 size={15}/>Delete</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete payin history and amount that sent.
                          </DialogDescription>
                        </DialogHeader>

                        <div className=' w-full flex items-end justify-end'>
                          <button disabled={loading} onClick={() => deletePayin(item.userid, item.id)} className=' px-4 py-2 text-xs bg-red-500 text-white rounded-md'>Continue</button>

                        </div>
                      </DialogContent>
                    </Dialog>
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
  )
}
