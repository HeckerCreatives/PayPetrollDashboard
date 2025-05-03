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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RotateCcw, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




interface History {
    id: string
    username: string
    userid: string
    firstname: string
    lastname: string
    value: string
    status:  string
    createdAt: string
}


interface List {
  id: string
  username: string
  userid: string
  firstname: string
  lastname: string
  paymentmethod: string
  accountnumber:string
  accountname: string
  grossamount: number
  withdrawalfee: number
  netammount: number
  status: string
  type:string
  createdAt:string
  phonenumber: string
}


export default function Payouthistory() {
    const router = useRouter()
    const [list, setList] = useState<List[]>([])
    const [history, setHistory] = useState<List[]>([])
    const [totalpage, setTotalPage] = useState(0)
    const [currentpage, setCurrentPage] = useState(0)

    const [totalpage2, setTotalPage2] = useState(0)
    const [currentpage2, setCurrentPage2] = useState(0)
    const {loading, setLoading, clearLoading} = loadingtableStore()
    const {rate, setRate, clearRate} = rateStore()
    const [search, setSearch] = useState('')
    const { refresh, setRefresh} = refreshStore()
    const [tab, setTab] = useState('gamebalance')
    const [status, setStatus] = useState('done')
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)

  const [selectedItem, setSelectedItem] = useState('');
  const [amount, setAmount] = useState(0)
  const [netamount, setNetAmount] = useState(0)
  const [payoutid, setPayoutId] = useState('')



    useEffect(() => {
        setLoading(true);
    
        const delayDebounceFn = setTimeout(async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/payout/getpayouthistorysuperadmin?page=${currentpage2}&limit=10&type=${tab}`,
              { withCredentials: true }
            );
    
            setHistory(response.data.data.payoutlist);
            setTotalPage2(response.data.data.totalPages);
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
      }, [currentpage2, refresh, tab]);

      useEffect(() => {
        setLoading(true);
    
        const delayDebounceFn = setTimeout(async () => {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/payout/getpayoutlist?page=${currentpage}&limit=10&type=${tab}`,
              { withCredentials: true }
            );
    
            setList(response.data.data.payoutlist);
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
      }, [currentpage, refresh, tab]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePageChange2 = (page: number) => {
      setCurrentPage2(page)
  }

  const processPayout = async (id: string) => {
    setLoading(true);
    setRefresh('true')
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payout/processpayout`,
        {
          payoutid: payoutid,
          status: status
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Payout sucessfully processed.');
      clearLoading();
      setRefresh('false')
      setOpen(false)

    } catch (error) {
      setLoading(false);
      setRefresh('false')
      setOpen(false)


      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; data: string }>;
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`);
          router.push('/')
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

  const deletePayout = async (id: string) => {
    setLoading(true);
    setRefresh('true')
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payout/deletepayout`,
        {
          payoutid: id,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Payout history sucessfully deleted .');
      clearLoading();
      setRefresh('false')
      setOpen(false)
      setOpen2(false)
      setOpen3(false)

    } catch (error) {
      setLoading(false);
      setRefresh('false')
      setOpen(false)


      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; data: string }>;
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`);
          router.push('/')
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

    <div className=' flex flex-col gap-12 w-full'>
      <h2 className='text-xl font-bold mt-8 text-white '>Payout</h2>


      <Tabs defaultValue="gamebalance" className="w-full">
      <TabsList>
        <TabsTrigger onClick={() => setTab('gamebalance')} value="gamebalance">Game</TabsTrigger>
        <TabsTrigger onClick={() => setTab('commissionbalance')} value="commissionbalance">Comission</TabsTrigger>
      </TabsList>
      <TabsContent value="gamebalance" className=' flex flex-col gap-4'>
      <div className=' w-full flex flex-col gap-4 h-auto bg-white rounded-xl shadow-sm p-6'>
        <div className=' w-full flex items-center justify-between '>
        <p className=' text-sm font-medium'>Game Payout List</p>

        {/* <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search user...' className=' bg-gray-100 w-fit'/> */}
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
                <TableHead>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead>Payment method</TableHead>
                <TableHead>Account no.</TableHead>
                <TableHead>Account name</TableHead>
                <TableHead>Gross amount</TableHead>
                <TableHead>Net amount</TableHead>

                <TableHead>Withdrawal fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.firstname}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>{item.paymentmethod}</TableCell>
                    <TableCell>{item.accountnumber}</TableCell>
                    <TableCell>{item.accountname}</TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.grossamount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.grossamount / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.netammount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.netammount / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.withdrawalfee.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.withdrawalfee / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>

                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger
                        className='text-[.6rem] bg-dark text-white px-2 py-1 rounded-sm font-medium flex items-center gap-1 justify-center'
                        onClick={() => {
                          setSelectedItem(item.username);
                          setAmount(item.grossamount)
                          setNetAmount(item.netammount)
                          setPayoutId(item.id)
                          setOpen(true);
                        }}
                      >
                        <RotateCcw size={12}/>Process
                      </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Process Payout</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. Process payout <span className=' text-green-500'>{item.id}</span> from <span className=' text-green-500'>{selectedItem}</span>, gross amount of <span className=' text-green-500'>{amount.toLocaleString()} php </span> and net amount of  <span className=' text-green-500'>{netamount.toLocaleString()}php</span>
                            </DialogDescription>
                          </DialogHeader>
                          <div className=' w-full flex flex-col gap-4'>
                          <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="done">Approved</SelectItem>
                              <SelectItem value="reject">Reject</SelectItem>
                            </SelectContent>
                          </Select>

                          <button onClick={() => processPayout(item.id)} disabled={loading} className=' primary-btn mt-4'>
                            {loading === true && (
                              <span className='loader'></span>
                            )}
                            Continue</button>

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
       <div className=' w-full flex flex-col gap-4 h-auto bg-white rounded-xl shadow-sm p-6'>
        <div className=' w-full flex items-center justify-between '>
        <p className=' text-sm font-medium'>Game Payout History</p>
        </div>
            <Table>
                {loading === true && (
                    <TableCaption>
                        <span className=' loaderdark'></span>
                    </TableCaption>
                )}
                {history.length === 0 && (
                <TableCaption>No data.</TableCaption>
                )}
            <TableHeader>
                <TableRow>
                  <TableHead className="">Date</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Payment method</TableHead>
                  <TableHead>Account no.</TableHead>
                  <TableHead>Account name</TableHead>
                  <TableHead>Gross amount</TableHead>
                  <TableHead>Net amount</TableHead>

                  <TableHead>Withdrawal fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.paymentmethod}</TableCell>
                    <TableCell>{item.accountnumber}</TableCell>
                    <TableCell>{item.accountname}</TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.grossamount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.grossamount / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.netammount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.netammount / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.withdrawalfee.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.withdrawalfee / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>

                    <TableCell className={`${item.status === 'done' ? 'text-green-400' : 'text-red-500'}`}>{item.status}</TableCell>
                    <TableCell>
                    <Dialog open={open2} onOpenChange={setOpen2}>
                      <DialogTrigger className=' text-[.7rem] bg-red-500 text-white py-1 px-3 rounded-md flex items-center gap-1'><Trash2 size={15}/>Delete</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete history.
                          </DialogDescription>
                        </DialogHeader>

                        <div className=' w-full flex items-end justify-end'>
                          <button disabled={loading} 
                          onClick={() => deletePayout(item.id)} 
                          className=' px-4 py-2 text-xs bg-red-500 text-white rounded-md'>Continue</button>

                        </div>
                      </DialogContent>
                    </Dialog>
                    </TableCell>

                   
                   
                   
                    </TableRow>
                ))}
                
            </TableBody>
            </Table>

            {history.length !== 0 && (
                <div className=' w-full flex items-center justify-center mt-6'>
                    <Pagination currentPage={currentpage2} total={totalpage2} onPageChange={handlePageChange2}/>
                </div>
            )}
        
       </div>
      </TabsContent>
      <TabsContent value="commissionbalance" className=' flex flex-col gap-4'>
      <div className=' w-full flex flex-col gap-4 h-auto bg-white rounded-xl shadow-sm p-6'>
        <div className=' w-full flex items-center justify-between '>
        <p className=' text-sm font-medium'>Comission Payout List</p>

        {/* <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search user...' className=' bg-gray-100 w-fit'/> */}
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
                <TableHead>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead>Payment method</TableHead>
                <TableHead>Account no.</TableHead>
                <TableHead>Account name</TableHead>
                <TableHead>Gross amount</TableHead>
                <TableHead>Net amount</TableHead>

                <TableHead>Withdrawal fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map((item, index) => (
                   <TableRow key={index}>
                   <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                   <TableCell>{item.username}</TableCell>
                   <TableCell>{item.firstname}</TableCell>
                   <TableCell>{item.lastname}</TableCell>
                   <TableCell>{item.paymentmethod}</TableCell>
                   <TableCell>{item.accountnumber}</TableCell>
                   <TableCell>{item.accountname}</TableCell>
                   <TableCell className=' '>
                     <div className='flex flex-col'>
                       ₱{item.grossamount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.grossamount / rate).toLocaleString()}</span>
                     </div>
                   </TableCell>
                   <TableCell className=' '>
                     <div className='flex flex-col'>
                       ₱{item.netammount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.netammount / rate).toLocaleString()}</span>
                     </div>
                   </TableCell>
                   <TableCell className=' '>
                     <div className='flex flex-col'>
                       ₱{item.withdrawalfee.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.withdrawalfee / rate).toLocaleString()}</span>
                     </div>
                   </TableCell>

                   <TableCell>{item.status}</TableCell>
                   <TableCell>
                     <Dialog open={open} onOpenChange={setOpen}>
                     <DialogTrigger
                        className='text-[.6rem] bg-dark text-white px-2 py-1 rounded-sm font-medium flex items-center gap-1 justify-center'
                        onClick={() => {
                          setSelectedItem(item.username);
                          setAmount(item.grossamount)
                          setNetAmount(item.netammount)
                          setPayoutId(item.id)
                          setOpen(true);
                        }}
                      >
                        <RotateCcw size={12}/>Process
                      </DialogTrigger>
                       <DialogContent>
                         <DialogHeader>
                           <DialogTitle>Process Payout</DialogTitle>
                           <DialogDescription>
                             This action cannot be undone. Process payout <span className=' text-green-500'>{item.id}</span> from <span className=' text-green-500'>{selectedItem}</span>, gross amount of <span className=' text-green-500'>{amount.toLocaleString()} php </span> and net amount of  <span className=' text-green-500'>{netamount.toLocaleString()}php</span>
                           </DialogDescription>
                         </DialogHeader>
                         <div className=' w-full flex flex-col gap-4'>
                         <Select value={status} onValueChange={setStatus}>
                           <SelectTrigger className="w-[180px]">
                             <SelectValue placeholder="Status" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="done">Approved</SelectItem>
                             <SelectItem value="reject">Reject</SelectItem>
                           </SelectContent>
                         </Select>

                         <button onClick={() => processPayout(item.id)} disabled={loading} className=' primary-btn mt-4'>
                           {loading === true && (
                             <span className='loader'></span>
                           )}
                           Continue</button>

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
       <div className=' w-full flex flex-col gap-4 h-auto bg-white rounded-xl shadow-sm p-6'>
        <div className=' w-full flex items-center justify-between '>
        <p className=' text-sm font-medium'>ComissionPayout History</p>
        </div>
            <Table>
                {loading === true && (
                    <TableCaption>
                        <span className=' loaderdark'></span>
                    </TableCaption>
                )}
                {history.length === 0 && (
                <TableCaption>No data.</TableCaption>
                )}
            <TableHeader>
            <TableRow>
                  <TableHead className="">Date</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Payment method</TableHead>
                  <TableHead>Account no.</TableHead>
                  <TableHead>Account name</TableHead>
                  <TableHead>Gross amount</TableHead>
                  <TableHead>Net amount</TableHead>
                  <TableHead>Withdrawal fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {history.map((item, index) => (
                    <TableRow key={index}>
                    <TableCell className="">{new Date(item.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.paymentmethod}</TableCell>
                    <TableCell>{item.accountnumber}</TableCell>
                    <TableCell>{item.accountname}</TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.grossamount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.grossamount / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.netammount.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.netammount / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className=' '>
                      <div className='flex flex-col'>
                        ₱{item.withdrawalfee.toLocaleString()} <span className=' text-[.6rem] text-zinc-500'>${(item.withdrawalfee / rate).toLocaleString()}</span>
                      </div>
                    </TableCell>

                    <TableCell className={`${item.status === 'done' ? 'text-green-400' : 'text-red-500'}`}>{item.status}</TableCell>
                    <TableCell>
                    <Dialog open={open3} onOpenChange={setOpen3}>
                      <DialogTrigger className=' text-[.7rem] bg-red-500 text-white py-1 px-3 rounded-md flex items-center gap-1'><Trash2 size={15}/>Delete</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete history.
                          </DialogDescription>
                        </DialogHeader>

                        <div className=' w-full flex items-end justify-end'>
                          <button disabled={loading} 
                            onClick={() => deletePayout(item.id)} 

                          className=' px-4 py-2 text-xs bg-red-500 text-white rounded-md'>Continue</button>

                        </div>
                      </DialogContent>
                    </Dialog>
                    </TableCell>
                   
                   
                    </TableRow>
                ))}
                
            </TableBody>
            </Table>

            {history.length !== 0 && (
                <div className=' w-full flex items-center justify-center mt-6'>
                    <Pagination currentPage={currentpage2} total={totalpage2} onPageChange={handlePageChange2}/>
                </div>
            )}
        
       </div>
      </TabsContent>
      
    </Tabs>

       
    </div>
    
  )
}
