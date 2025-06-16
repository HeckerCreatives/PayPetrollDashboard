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
import { petRanks } from '@/lib/petRank';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GrantNftForm from '@/components/forms/GrantNftForm';

  

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

export interface NftItem {
  nftid: string;
  petname: string;
  type: string; // e.g., "NFT"
  rank: string; // e.g., "NFT"
  buyprice: number;
  profit: number;
  duration: number;
  earnings: number;
  remainingtime: number;
  purchasedate: string; // ISO date string
  maturedate: string; // ISO date string
}

export interface NftData {
  [key: string]: NftItem; // e.g., "0": NftItem, "1": NftItem, etc.
}


export default function Inventory() {
  const [current, setCurrent] = useState('0');
  const { loading, setLoading, clearLoading } = loadingStore()
  const router = useRouter()
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
   const [nfttotalpage, setNftTotalPage] = useState(0)
  const [nftcurrentpage, setNftCurrentPage] = useState(0)
  const [list, setList] = useState<List[]>([])
      const [nft, setNft] = useState<NftItem[]>([])
  
  const {rate, setRate, clearRate} = rateStore()
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const params = useSearchParams()
  const id = params.get('id')

  const { refresh, setRefresh} = refreshStore()


  


  useEffect(() => {
   
    const debounceTimer = setTimeout(() => {
        if(id !== null) {
        fetchData();

        }
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [currentpage, refresh]); 

   useEffect(() => {
   
    const debounceTimer = setTimeout(() => {
        if(id !== null) {
        fetchNftData();

        }
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [refresh, nftcurrentpage]); 

  

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

  
  const fetchNftData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory/getplayernftinventory?playerid=${id}&page=${nftcurrentpage}&limit=10`,
        { withCredentials: true }
      );

      setLoading(false);
      setNft(response.data.data.nft)
      setNftTotalPage(response.data.data.totalPages)
    
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

  const deletPet = async ( petid: string) => {
    setRefresh('true');
    setLoading(true);
    try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/deleteplayerinventoryforadmin`, {
          playerid: id,
          petid: petid
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const response = await toast.promise(request, {
            loading: `Deleting pet...`,
            success: `Successfully deleted `,
            error: `Error while deleting pet.`,
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

  const deletNft = async ( nftid: string) => {
    setRefresh('true');
    setLoading(true);
    try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/deleteplayernftinventoryforadmin`, {
          nftid: nftid,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const response = await toast.promise(request, {
            loading: `Deleting nft...`,
            success: `Successfully deleted `,
            error: `Error while deleting nft.`,
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

 const handleNftPageChange = (page: number) => {
      setNftCurrentPage(page)
    }




  return (
    <div className="w-full flex flex-col gap-8">

      <div className=' w-full p-6 bg-white shadow-sm rounded-md'>

        {/* <div className=' flex flex-wrap items-center gap-4 mb-6'>
            <Input type='text' placeholder='Search e.g user123' value={search} onChange={(e) => setSearch(e.target.value)} className=' w-[250px] bg-gray-100 '/>

        </div> */}

        <Tabs defaultValue="fiat" className="w-full">
        <TabsList>
          <TabsTrigger value="fiat">Fiat</TabsTrigger>
          <TabsTrigger value="nft">NFT</TabsTrigger>
        </TabsList>
        <TabsContent value="fiat">
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
                <TableCell>{petRanks(item.rank)}</TableCell>

                <TableCell className=' '>
                  <div className='flex flex-col'>
                    ₱{item.totalaccumulated.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className=' text-[.6rem] text-zinc-500'>${(item.totalaccumulated / rate).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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

                <TableCell className=' flex items-center gap-2'>
               <GrantForm userid={id || ''} petid={item.trainer}/>

                                   <Dialog >
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
                                          onClick={() => deletPet( item.trainer)} 
                                         className=' px-4 py-2 text-xs bg-red-500 text-white rounded-md'>Continue</button>
               
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
        </TabsContent>
         
        <TabsContent value="nft">
           <Table>
            {loading === true && (
                <TableCaption>
                  <span className=' loaderdark'></span>
                </TableCaption>
            )}
            {nft.length === 0 && (
              <TableCaption>No data.</TableCaption>
            )}
            <TableHeader>
                <TableRow>
                <TableHead className="">Nft Name</TableHead>
                <TableHead className="">Earnings</TableHead>
                <TableHead className="">Time Left</TableHead>
                {/* <TableHead className="">Duration</TableHead> */}
                <TableHead className="">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(nft).map((item, index) => (
                <TableRow key={item.nftid}>
                <TableCell>{item.petname}</TableCell>
               
               

                <TableCell className=' '>
                  <div className='flex flex-col'>
                    ₱{item.earnings.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className=' text-[.6rem] text-zinc-500'>${(item.earnings / rate).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </TableCell>

                 <TableCell>
                    <Countdown
                                    className=' mt-4'
                                    date={Date.now() + (item.remainingtime * 1000)} 
                                    renderer={({ days, hours, minutes, seconds }) => (
                                    <span className=' text-xs'>
                                        Ends in: {days} days : {hours} hours : {minutes} minutes : {seconds}
                                    </span>
                                    )}
                                />
                </TableCell>





                <TableCell className=' flex items-center gap-2'>
               <GrantNftForm userid={id || ''} nftid={item.nftid}/>

                                   <Dialog >
                                     <DialogTrigger className=' text-[.7rem] bg-red-500 text-white py-1 px-3 rounded-md flex items-center gap-1'><Trash2 size={15}/>Delete</DialogTrigger>
                                     <DialogContent>
                                       <DialogHeader>
                                         <DialogTitle>Are you absolutely sure?</DialogTitle>
                                         <DialogDescription>
                                           This action cannot be undone. This will permanently delete the inventory.
                                         </DialogDescription>
                                       </DialogHeader>
               
                                       <div className=' w-full flex items-end justify-end'>
                                         <button disabled={loading} 
                                          onClick={() => deletNft( item.nftid)} 
                                         className=' px-4 py-2 text-xs bg-red-500 text-white rounded-md'>Continue</button>
               
                                       </div>
                                     </DialogContent>
                                   </Dialog>
                </TableCell>


               
                
                </TableRow>
              ))}
                
            </TableBody>
        </Table>

         {Object.values(nft).length !== 0 && (
            <div className=' w-full flex items-center justify-center mt-6'>
                <Pagination currentPage={nftcurrentpage} total={nfttotalpage} onPageChange={handleNftPageChange}/>
            </div>
        )}
        </TabsContent>
         
      </Tabs>


     
      </div>

        
    </div>
  );
}