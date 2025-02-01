'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Pen, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { AddSocialMedia, socialsSchema, userchangepassword, UserChangePassword } from "@/validitions/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import loadingStore from "@/zustand/loading";
import refreshStore from "@/zustand/refresh";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

type Props = {
    id: string
    title: string
    link: string
}
export default function EditSocials(prop: Props) {
  
  const { refresh, setRefresh } = refreshStore();
  const { loading, setLoading, clearLoading } = loadingStore();
  const router = useRouter();
  const [open, setOpen] = useState(false)

   // Form handler
   const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    formState: { errors },
} = useForm<AddSocialMedia>({
    resolver: zodResolver(socialsSchema),
    defaultValues: ({
        link: prop.link,
        type: prop.title
    })
});

const edit = async (data: AddSocialMedia) => {
    setRefresh('true');
    setLoading(true);
    try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sociallinks/editsociallink`, {
            id: prop.id,
            title: data.type,
            link: data.link
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const response = await toast.promise(request, {
            loading: `Creating social media...`,
            success: `Created successfully. `,
            error: `Error while creating social.`,
        });
        if (response.data.message === 'success') {
            setRefresh('false');
            reset();
            setLoading(false);
            setOpen(false)
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

const title = watch('type', prop.title)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className=" ">
        <Pen size={12}/>
      </DialogTrigger>
      <DialogContent className=" h-auto">
        <DialogHeader>
          <DialogTitle>Edit Social Media</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(edit)} className=" flex flex-col gap-1">
          <label htmlFor="" className=" text-xs text-zinc-500">Type</label>
            <Select value={title} onValueChange={(value) => setValue('type', value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="x">X</SelectItem>
                <SelectItem value="discord">Discord</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="youtube">Youtube</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
            </Select>
        {errors.type && <span className="error">{errors.type.message}</span>}


          <label htmlFor="" className=" text-xs text-zinc-500">Link</label>
          <Input placeholder="Link" type="text" {...register('link')}/>
        {errors.link && <span className="error">{errors.link.message}</span>}


          <button
          disabled={loading}
            className="primary-btn w-full mt-6"
          >
            {loading === true && (
                        <span className='loader'></span>
                    )}
            Save
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
