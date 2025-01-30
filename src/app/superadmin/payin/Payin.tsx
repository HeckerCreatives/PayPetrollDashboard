'use client';
import { Input } from '@/components/ui/input';
import loadingStore from '@/zustand/loading';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendFiat, SendFiat } from '@/validitions/validation';
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from 'next/navigation';
import refreshStore from '@/zustand/refresh';
 


const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

interface UserSerach {
    id: string
    username: string
    referralUsername: string
    status:string
    createdAt: string
}

export default function Payin() {
  const { loading, setLoading, clearLoading } = loadingStore();
  const { refresh, setRefresh} = refreshStore()
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState("")
  const router = useRouter()
  const [users, setUsers] = useState<UserSerach[]>([])

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SendFiat>({
    resolver: zodResolver(sendFiat),
  });

  // Handle form submission
  const onSubmit = async (data: SendFiat) => {
    setLoading(true);
    setRefresh('true')
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payin/superadminsendfiatplayer`,
        {
          playerusername: data.username,
          amount: data.amount,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Fiat sent successfully!');
      reset()
      clearLoading();
      setRefresh('false')

    } catch (error) {
      setLoading(false);
      setRefresh('false')

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


  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/searchplayerlist?playerusername=${user}`,{
        withCredentials:true
        })

        setUsers(response.data.data.userlist)
        
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
    getList()
},[user])

 // Watch the username value
 const selectedUsername = watch("username");

  return (
    <div className='w-full flex flex-col gap-8 font-light'>
      <h2 className='text-xl font-bold mt-8 text-white'>Payin</h2>

      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center max-w-[400px] w-full bg-white h-auto rounded-lg relative p-4'>
          <div className='w-full p-4 flex flex-col gap-4'>
            <p className='text-lg font-medium'>Send fiat to player</p>

            


            {/* Form with validation */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
              <p className=' label'>Username</p>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-gray-100"
                      >
                        {selectedUsername
                          ? users.find((item) => item.username === selectedUsername)?.username
                          : "Select username..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {users.map((item) => (
                              <CommandItem
                                key={item.id}
                                value={item.username}
                                onSelect={(currentValue) => {
                                  setValue("username", currentValue); // Update the form value
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedUsername === item.username ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {item.username}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.username && <p className='text-[.6em] text-red-400'>{errors.username.message}</p>}


              <div>
                <p className=' label'>Amount</p>
                <Input
                defaultValue={0}
                  type='number'
                  placeholder=''
                  className='bg-gray-100'
                  {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && (
                  <p className='error text-red-600 mt-2'>{errors.amount.message}</p>
                )}
              </div>

              


              <button type='submit' className='primary-btn mt-4' disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}