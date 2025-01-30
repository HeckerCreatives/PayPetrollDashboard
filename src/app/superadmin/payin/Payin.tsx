'use client';
import { Input } from '@/components/ui/input';
import loadingStore from '@/zustand/loading';
import axios, { AxiosError } from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
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

export default function Payin() {
  const { loading, setLoading, clearLoading } = loadingStore();
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendFiat>({
    resolver: zodResolver(sendFiat),
  });

  // Handle form submission
  const onSubmit = async (data: SendFiat) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payin/adminsendfiatplayer`,
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
      clearLoading();
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; data: string }>;
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`);
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
    <div className='w-full flex flex-col gap-8 font-light'>
      <h2 className='text-xl font-bold mt-8 text-white'>Payin</h2>

      <div className='w-full flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center max-w-[400px] w-full bg-white h-auto rounded-lg relative p-4'>
          <div className='w-full p-4 flex flex-col gap-4'>
            <p className='text-lg font-medium'>Send fiat to player</p>

            


            {/* Form with validation */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              

              <Popover open={open} onOpenChange={setOpen} {...register('username')}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className=" w-full justify-between bg-gray-100"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)?.label
                    : "Username..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandList>
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
              </Popover>

              <div>
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

              


              <button type='submit' className='primary-btn' disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}