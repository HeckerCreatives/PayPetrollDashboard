"use client"
import React, { useEffect } from 'react'
import Link from "next/link"
import {
  Menu,
  LogOut,
  PanelsTopLeft,
  ChevronRight,
  ChevronDown,
  LogIn
} from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import home from '/icons/home.png'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import axios, { AxiosError } from 'axios'
// import toast from 'react-hot-toast'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { user } from '@/routes/route'


  

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()
  const router = useRouter()

  const breadcrumd = user.find((item) => path.includes(item.path))?.name


  return (
      <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr] overflow-hidden bg-gray-50 ">
        <div className=" hidden lg:block">
          <div className=" relative flex h-full max-h-screen flex-col gap-2 bg-primary"> 
            
            <div className=' absolute w-full h-screen bg-white z-0 border-r-[1px] shadow-sm border'></div>
             <div className=' relative z-10 w-full flex items-center justify-center gap-2 p-8'>
               <img src="/logo.png" alt="" width={150} />
            </div>
            <div className=" relative z-10 flex-1 mt-4 overflow-y-auto">
              <nav className=" flex flex-col text-sm px-4">
                {user.map((item, index) => (
                    <a href={item.path}
                    className={`px-4 py-3  flex items-center gap-2  font-thin rounded-sm text-xs ${path.includes(item.path) ? 'bg-[#204E4C] text-white' : 'text-black'}`}
                    >{item.icon}{item.name}</a>
                ))} 

              </nav>
            </div>
            
          </div>
        </div>
        <div className=" relative h-screen flex flex-col overflow-y-auto bg-gray-50 dark:bg-zinc-900">
          <header className=" sticky top-0 z-50 flex h-14 border-b-[1px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 items-center justify-between gap-4 bg-secondary p-4 lg:h-[60px] lg:px-6">
            <div className=' flex items-center gap-4 h-[74px]'>

              <Sheet>
                <SheetTrigger className=' lg:hidden block text-black'>
                  <Menu size={15}/>
                </SheetTrigger>
                <SheetContent side="left" className=" flex flex-col bg-primary border-none bg-zinc-950"
               
                >
                  
                  <div className=' flex items-center gap-2 text-white p-4'>
                    <div className=' relative z-10 w-full flex items-center justify-start gap-2 text-black'>
                        <div className=' w-10 aspect-square rounded-full bg-zinc-950'>

                        </div>
                        <p className=' text-lg font-medium'>logo</p>
                    </div>
                  </div>
                  <nav className=" flex flex-col gap-2 px-2 text-sm font-medium">
                     
                  </nav>
                
                </SheetContent>
              </Sheet>

              <p className=' text-xs font-medium'>Dashboard / {breadcrumd}</p>


              <Breadcrumb />

            </div>

            <DropdownMenu>
                <DropdownMenuTrigger className=' focus:ring-0'>
                    <div className=" flex items-center  gap-2 text-xs text-zinc-400">
                        <div className=" flex flex-col">
                            <p>User</p>
                        </div>
                        <div className=" w-10 aspect-square rounded-full bg-zinc-200">
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuLabel className=' text-xs'>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=' text-xs flex items-center gap-2'><button className=' flex items-center gap-2'>Log out <LogIn size={12}/></button></DropdownMenuItem>
                 
                 
                </DropdownMenuContent>
            </DropdownMenu>

          </header>
          <main className=" relative flex flex-1 flex-col items-center gap-4 p-4 lg:p-12 ">
              {children}
          </main>
        </div>
      </div>
  )
}
