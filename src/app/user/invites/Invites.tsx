'use client';
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { type CarouselApi } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
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
import { useRouter } from 'next/navigation';
import Pagination from '@/components/common/Pagination';
import rateStore from '@/zustand/rate';
import { Input } from '@/components/ui/input';

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
];

interface List {
  _id: string
  username: string
  createdAt: string
  level: number,
  totalAmount: number

}


export default function Invites() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { loading, setLoading, clearLoading } = loadingStore()
  const router = useRouter()
  const [totalpage, setTotalPage] = useState(0)
  const [currentpage, setCurrentPage] = useState(0)
  const [list, setList] = useState<List[]>([])
  const {rate, setRate, clearRate} = rateStore()
  const [search, setSearch] = useState('')

  

  


  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  //invites 
  useEffect(() => {
   
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [currentpage, search]); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/unilevel/playerunilevel?level=${current}&page=${currentpage}&limit=10&search=${search}`,
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

        <h2 className=' text-xl font-bold mt-8 text-white'>Invites</h2>

      <div className="w-full  h-auto bg-white shadow-sm flex items-center justify-center gap-4 overflow-hidden">
        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full max-w-[1240px]"
          ref={emblaRef}
          setApi={setApi}
        >
          <CarouselContent>
            {items.map((item, index) => (
              <CarouselItem onClick={() => api && api.scrollTo(index)} key={item.id} className="basis-1/5 cursor-pointer">
                <div className="p-1">
                  <div
                    className={' md:h-[250px] h-auto flex items-center justify-center py-4'}
                  >
                    <div className={cn(
                      'transition-all duration-300 ease-in-out relative flex items-center justify-center  w-48 aspect-square rounded-full  bg-gray-100 shadow-sm',
                      index === current ? ' w-48 border-b-4 border-[#75C09F] ' : ' w-36 opacity-40'
                    )}>

                        <div className={` ${ index !== current ? ' w-8 md:w-12 h-8 md:h-12' : ' w-8 h-8 md:w-16 md:h-16'} -translate-y-2 absolute top-0 right-0 aspect-square bg-light rounded-full flex items-center justify-center`}>
                            <p className={`font-medium ${ index !== current ? ' text-[.5rem] md:text-xs' : ' text-[.5rem] md:text-sm'}`}>lvl {index + 1}</p>

                        </div>
                        <img src={item.img} alt="pet" width={150} height={150} />
                      
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className=' w-full p-6 bg-white shadow-sm'>

        <Input type='text' placeholder='Search e.g user123' value={search} onChange={(e) => setSearch(e.target.value)} className=' w-[250px] bg-gray-100 mb-6'/>

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