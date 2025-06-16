'use client'
import { Copy, RefreshCcw } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { encryptUid } from '@/helpers/encrypt';
import { useForm } from 'react-hook-form';
import { accountSchema, UserAccount } from '@/validitions/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import refreshStore from '@/zustand/refresh';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import loadingStore from '@/zustand/loading';
import { petimg } from '@/app/data/data';
import Changepassword from '@/components/forms/Changepassword';
  

interface Account {
    username: string
    phonenumber: string
    lastname: string
    fistname: string,
    address: string
    city: string
    country:string
    postalcode: string
    paymentmethod: string
    accountnumber: string
    profilepicture: string
}

export default function Settings() {
    const [avatar, setAvatar] = useState('')
    const router = useRouter()
    const [account, setAccount] = useState<Account>()
    const [referral, setReferral] = useState('')
    const {refresh, setRefresh} = refreshStore()
    const { loading, setLoading, clearLoading } = loadingStore()


    

    const setAvatarUser = (data: string) => {
        localStorage.setItem('avatar', data)
    }

    useEffect(() => {
        const getAvatar = localStorage.getItem('avatar')

        setAvatar(getAvatar || '')
    },[avatar])

    useEffect(() => {
        const getList = async () => {
          try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getuserdetails`,{
            withCredentials:true
            })

            setAccount(response.data.data)

          } catch (error) {

            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string, data: string }>;
              if (axiosError.response && axiosError.response.status === 401) {
                
                }    
              } 
          }
        }
        getList()
    },[refresh])

    //get referral
    useEffect(() => {
        const getReferral = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getreferrallink`,{
            withCredentials:true
            })

            setReferral(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
               
                }    
            } 
        }
        }
        getReferral()
    },[])

    const copyReferral = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_REFERRAL}/auth/signup?uid=${encryptUid(referral)}`)
        toast.success('Referral link copied')
    }


    //form handler
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        trigger,
        formState: { errors },
    } = useForm<UserAccount>({
        resolver: zodResolver(accountSchema),
        defaultValues: ({
            username: account?.username || '',
            phonenumber: account?.phonenumber || '',
            lastname: account?.lastname || '',
            fistname: account?.lastname || '',
            address: account?.address || '',
            city: account?.city || '',
            country: account?.country || '',
            postalcode: account?.postalcode || '',
            paymentmethod: account?.paymentmethod || '',
            accountnumber: account?.accountnumber || '',
        })
    })

    const onSubmit = async (data: UserAccount) => {
        setRefresh('true')
        setLoading(true)
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/updateuserprofile`,{
                firstname: data.fistname,
                lastname: data.lastname,
                address: data.address,
                city: data.city,
                country: data.country,
                postalcode: data.postalcode,
                paymentmethod: data.paymentmethod,
                accountnumber: data.phonenumber,
                phonenumber: data.phonenumber 
            },{
                withCredentials: true,
                headers:{
                    'Content-Type':'Application/json'
                }
            })


            const response = await toast.promise(request, {
                loading: `Updating account details...`,
                success: `Updated successfully. `,
                error: `Error while updating account details.`,
            });
            if(response.data.message === 'success'){
                setRefresh('false')
                reset()
                setLoading(false)

            }
        } catch (error) {
        setRefresh('true')
        setLoading(false)

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`)
                    router.push('/')

                }

                if (axiosError.response && axiosError.response.status === 400) {
                    toast.error(`${axiosError.response.data.data}`)     
                        
                }

                if (axiosError.response && axiosError.response.status === 402) {
                    toast.error(`${axiosError.response.data.data}`)          
                            
                }

                if (axiosError.response && axiosError.response.status === 403) {
                    toast.error(`${axiosError.response.data.data}`)              
                    
                }

                if (axiosError.response && axiosError.response.status === 404) {
                    toast.error(`${axiosError.response.data.data}`)             
                }
        } 
  
            
        }
    }

    useEffect(() => {
        if(account){
            reset({
                username: account.username,
                phonenumber: account.phonenumber,
                lastname: account.lastname,
                fistname: account.fistname,
                address: account.address,
                city: account.city,
                country: account.country,
                postalcode: account.postalcode,
                paymentmethod: account.paymentmethod,
                accountnumber: account.accountnumber,
              });
        }
    },[account])

    const selectedPaymentMethod = watch('paymentmethod', account?.paymentmethod || "");

   

  return (
    <div className="w-full flex flex-col gap-8 font-light">
    
        <h2 className=' text-xl font-bold mt-8 text-white'>Settings</h2>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[400px_1fr_1fr] gap-4'>
            <div className=' flex flex-col items-center w-full h-[320px] bg-white rounded-lg shadow-sm py-12'>

                <div className=' relative w-44 aspect-square rounded-full bg-gray-100 flex items-center justify-center'>

                    <DropdownMenu>
                        <DropdownMenuTrigger className=' absolute top-2 right-4 w-8 aspect-square bg-gray-300 rounded-full flex items-center justify-center'>
                        <div className=''>
                            <RefreshCcw size={15} className=' '/>
                        </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className=' text-sm overflow-y-auto' >
                            <DropdownMenuLabel className=' text-sm w-[250px]'>Select avatar</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className=' w-full grid grid-cols-3 gap-1'>
                            {petimg.map((item, index) => (

                                <div onClick={() => {setAvatarUser(item.img), setAvatar(item.img)}}  key={index} className={`cursor-pointer w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 ${avatar === item.img && ' border-b-4 border-[#A0E870]'}`}>
                                    <img src={item.img} width={60} height={60} className=''/>
                                </div>
                                ))}
                            </div>
                            
                           
                    
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {avatar !== '' && (
                    <img src={avatar} width={150} height={150} />
                    )}

                </div>

                <div className=' flex flex-col items-center justify-center gap-2 mt-4'>
                    <p className=' text-xl font-semibold'>{account?.username}</p>
                    {/* <p onClick={copyReferral} className=' cursor-pointer text-sm mt-4 text-zinc-700 bg-light px-4 py-2 rounded-full flex items-center gap-2'><Copy size={15}/>Referral: {encryptUid(referral).slice(0,3)}...{encryptUid(referral).slice(4,8)} </p> */}

                </div>

                {/* <div className=' flex flex-col gap-2 text-sm mt-4'>
                    <p>{account?.phonenumber}</p>
                    <p>{account?.address}</p>

                </div> */}
            </div>

           <Changepassword/>

            <div className=' w-full h-auto flex flex-col gap-4 bg-white shadow-sm p-6'>
                <h2 className=' text-lg font-semibold'>Personal Info</h2>

                <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-1'>
                    <label htmlFor="" className=' text-sm text-zinc-500'>Username</label>
                    <Input placeholder='Username' className=' bg-gray-100' {...register('username')}/>

                    <div className=' flex items-center gap-2 w-full'>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500'>Firstname</label>
                            <Input placeholder='Firstname' className=' bg-gray-100' {...register('fistname')}/>
                        </div>

                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500'>Lastname</label>
                            <Input placeholder='Lastname' className=' bg-gray-100' {...register('lastname')}/>
                        </div>
                    </div>

                    <div className=' flex items-center gap-2 w-full'>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>Phone no.</label>
                            <Input placeholder='Phone no.' type='number' className=' bg-gray-100' {...register('phonenumber')}/>
                        </div>

                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>Address</label>
                            <Input placeholder='Address' className=' bg-gray-100' {...register('address')}/>
                        </div>
                    </div>

                    <div className=' flex items-center gap-2 w-full'>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>Country</label>
                            <Input placeholder='Country' className=' bg-gray-100' {...register('country')}/>
                        </div>

                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>City</label>
                            <Input placeholder='City' className=' bg-gray-100' {...register('city')}/>
                        </div>
                    </div>

                    <div className=' flex items-center gap-2 w-full'>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>Postal Code</label>
                            <Input placeholder='Postal Code' className=' bg-gray-100' {...register('postalcode')}/>
                        </div>
                    </div>

                    <div className=' flex items-center gap-2 w-full'>
                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>Payment Method</label>
                            <Select value={selectedPaymentMethod}  onValueChange={(value) => setValue('paymentmethod', value)}>
                            <SelectTrigger className="w-full bg-gray-100">
                                <SelectValue placeholder="Payment Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GCash">GCash</SelectItem>
                                <SelectItem value="GoTyme">GoTyme</SelectItem>
                            </SelectContent>
                            </Select>

                        </div>

                        <div className=' w-full flex flex-col'>
                            <label htmlFor="" className=' text-sm text-zinc-500 mt-2'>Account No.</label>
                            <Input placeholder='Account No.' className=' bg-gray-100' {...register('accountnumber')}/>
                        </div>
                    </div>

                    <button disabled={loading} className=' bg-dark ~text-xs/sm text-white py-3 rounded-md font-medium mt-4 flex items-center justify-center gap-2'>
                    {loading === true && (
                        <span className='loader'></span>
                    )}
                    Save</button>
                </form>

            </div>
        </div>

    </div>
  )
}
