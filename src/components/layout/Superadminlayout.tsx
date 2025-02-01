'use client'
import { superadmin, user } from '@/routes/route'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ChevronDown, Copy, LogIn, Menu } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { encryptUid } from '@/helpers/encrypt'
import rateStore from '@/zustand/rate'

export default function Superadminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const path = usePathname()
    const params = useSearchParams()
    const router = useRouter()
    const [avatar, setAvatar] = useState('')
    const [referral, setReferral] = useState('')
    const {rate, setRate, clearRate} = rateStore()
    
    
    const breadcrumd = user.find((item) => path.includes(item.path))?.name

    useEffect(() => {
      const getAvatar = localStorage.getItem('avatar')

      setAvatar(getAvatar || '')
  },[avatar])

 

  //get rate 
  useEffect(() => {
    const getWallets = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/conversionrate/getcurrentconversionrate`,{
        withCredentials:true
        })

        setRate(response.data.data.rate)

      
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
            toast.error(`${axiosError.response.data.data}`)
            router.push('/')  
            }    
          } 
      }
    }
    getWallets()
},[])


  const logout = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.message === 'success') {
        toast.success('Logging out...')
        router.push('/')
      } 

    } catch (error) {

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, data: string }>
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`)
          router.push('/')
        }

      }
    }
  }

  // useEffect(() => {
  //   const logout = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             'Content-Type': 'application/json'
  //           }
  //         }
  //       )
  
  //     } catch (error) {
  
  //       if (axios.isAxiosError(error)) {
  //         const axiosError = error as AxiosError<{ message: string, data: string }>
  //         if (axiosError.response && axiosError.response.status === 401) {
  //           toast.error(`${axiosError.response.data.data}`)
  //           router.push('/')
  //         }
  
  //       }
  //     }
  //   }
  //   logout()
  // },[])

    
  return (
    <div className=' w-full flex flex-col items-center bg-gray-50 h-screen'>

      <div className=' relative z-40 w-full flex items-center justify-center bg-white'>
        <nav className=' px-4 w-full max-w-[1520px] h-[90px] md:h-[100px] flex items-center justify-between bg-white relative'>
            <div>
                <h2 className=' text-lg font-bold'>
                  <img src="/logo.png" alt="" width={80} />
                </h2>
            </div>

            <div className=' hidden  lg:flex items-center bg-gray-100 rounded-full shadow-sm'>
                {superadmin.map((item, index) => (
                    <a key={index} href={item.path} className={` flex items-center gap-1 px-4 py-3 text-[.7rem] rounded-full font-medium ${path.includes(item.path) ? 'bg-[#75C09F] text-white' : 'text-black'}`}>{item.icon}{item.name}</a>
                ))}

            </div>

            <div className=' flex items-center gap-2'>

              <DropdownMenu>
                  <DropdownMenuTrigger className=' focus:ring-0'>
                      <div className=" flex items-center  gap-3 text-xs text-zinc-400 bg-gray-100 p-1 rounded-full shadow-sm focus:ring-0">
                          
                          <div className=" w-7 aspect-square rounded-full bg-white flex items-center justify-center">
                            
                            <img src='/event.png' width={120} height={120} />
                         
                          </div>
                          <div className=" flex flex-col">
                            <ChevronDown size={15}/>
                          </div>
                      </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent >
                      <DropdownMenuLabel className=' text-xs'>Superadmin</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className=' text-xs flex items-center gap-2'><button onClick={logout} className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem>
                  
                  
                  </DropdownMenuContent>
              </DropdownMenu>

             

              <DropdownMenu>
                  <DropdownMenuTrigger className=' block lg:hidden focus:ring-0'>
                  <div className=' hover:rotate-180 flex flex-col gap-1 bg-gray-100 rounded-sm w-fit p-2 shadow-sm'>
                    {/* <div className=' flex items-center gap-1'>
                      <div className=' w-2 h-2 rounded-sm bg-light'></div>
                      <div className=' w-2 h-2 rounded-sm bg-light'></div>
                    </div>

                    <div className=' flex items-center gap-1'>
                      <div className=' w-2 h-2 rounded-sm bg-light'></div>
                      <div className=' w-2 h-2 rounded-sm bg-light'></div>
                    </div> */}

                    <Menu size={ 15}/>

                  </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=' text-sm' >
                      <DropdownMenuLabel className=' text-sm w-[250px]'>Menu</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {superadmin.map((item, index) => (
                          <a key={index} href={item.path} className={` flex items-center gap-2 px-4 py-3 text-[.7rem] rounded-md font-medium ${path.includes(item.path) ? 'bg-[#75C09F] text-white' : 'text-black'}`}>{item.icon}{item.name}</a>
                      ))}
                      {/* <DropdownMenuItem className=' text-xs flex items-center gap-2'><button className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem> */}
                  
                  
                  </DropdownMenuContent>
              </DropdownMenu>

            </div>

        </nav>
      </div>
        

        <div className=" w-full relative h-screen flex flex-col items-center overflow-y-auto overflow-x-hidden"
         style={{backgroundImage: "url(/hero2.png)", backgroundSize:'cover', backgroundRepeat:'no-repeat'}}
        >

          <div className=' w-full h-screen bg-zinc-950/60 fixed top-0 '>

          </div>
        
          <main className=" px-4 w-full max-w-[1520px]  relative flex flex-1 flex-col items-center gap-4  ">
              {children}
          </main>
        </div>

    </div>
  )
}
