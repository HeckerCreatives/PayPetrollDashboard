import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import loadingStore from '@/zustand/loading';
import rateStore from '@/zustand/rate';
import refreshStore from '@/zustand/refresh';
import axios, { AxiosError } from 'axios';
import { Box } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { List } from 'postcss/lib/list';
import toast from 'react-hot-toast';
import { string } from 'zod';

type Props = {
    userid: string
    petid: string
}

export default function GrantForm(data: Props) {
  const { loading, setLoading, clearLoading } = loadingStore()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const params = useSearchParams()
  const id = params.get('id')

  const { refresh, setRefresh} = refreshStore()

    const grantPet = async () => {
        setRefresh('true');
        setLoading(true);
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inventory/maxplayerinventorysuperadmin`, {
              playerid: data.userid,
              petid: data.petid
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'Application/json'
                }
            });
    
            const response = await toast.promise(request, {
                loading: `Granting pet maturity...`,
                success: `Successfully granted `,
                error: `Error while granting pet maturity.`,
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


  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className=' text-[.7rem] bg-green-500 text-white py-1 px-3 rounded-md flex items-center gap-1'><Box size={15}/>Grant</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This action will grant user pet maturity.
        </DialogDescription>
      </DialogHeader>

      <div className=' w-full flex items-end justify-end'>
        <button disabled={loading} onClick={() => grantPet()} className=' px-4 py-2 text-xs bg-green-500 text-white rounded-md'>Continue</button>

      </div>
    </DialogContent>
</Dialog>
  )
}
