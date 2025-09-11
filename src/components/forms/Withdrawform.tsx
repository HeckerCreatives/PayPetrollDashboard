import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from '../ui/input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentForm, paymentFormSchema } from '@/validitions/validation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import loadingStore from '@/zustand/loading'
import { useRouter } from 'next/navigation'
import refreshStore from '@/zustand/refresh'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

  
type Props = {
    wallet: string
    type: string
}

export default function Withdrawform( prop: Props) {
    const [payment, setPayment] = useState('gcash')
    const { loading, setLoading, clearLoading } = loadingStore()
    const router = useRouter()
    const {refresh, setRefresh} = refreshStore()

    
    


    const { register,control,reset, handleSubmit,setValue, formState: { errors } } = useForm<PaymentForm>({
        resolver: zodResolver(paymentFormSchema),
       
      });
    
      const onSubmit = async (data: PaymentForm) => {
        setLoading(true)
        setRefresh('true')
        try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payout/requestpayout`,{
                type: prop.type,
                payoutvalue: data.amount,
                paymentmethod: payment,
                accountname: data.accountName,
                accountnumber: data.accountNumber
            },{
                withCredentials: true,
                headers:{
                    'Content-Type':'Application/json'
                }
            })

            const response = await toast.promise(request, {
                loading: `Requesting withdrawal...`,
                success: `Requesting withdrawal success. `,
                error: `Error while requesting withdrawal.`,
            });
            if(response.data.message === 'success'){
                setLoading(false)
                setRefresh('false')
                reset()
                window.location.reload()


            }

        } catch (error) {
            setLoading(false)
            setRefresh('false')

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
      };

      useEffect(() => {
        reset({
          amount: 0
        })
      },[payment])


      
  return (
    <Dialog>
    <DialogTrigger className='primary-btn mt-6'>
        Withdraw
    </DialogTrigger>
    <DialogContent className=' md:w-full w-[90%] rounded-lg'>
      <DialogHeader>
        <DialogTitle>Request Withdrawal<span className=' text-sm text-green-500 font-normal'>({prop.wallet})</span></DialogTitle>
        <DialogDescription>
         
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-1'>
        <label htmlFor="type" className=' label'>Select Payment Method</label>

        <Controller
          name="paymentMethod"
          control={control}
          defaultValue='gcash'
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setPayment(value);
              }}
              defaultValue={field.value}
              className="flex items-center flex-wrap mt-2"
            >
              <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem value="gcash" id="gcash" />
                {/* <img src="/gcash.png" width={30} alt="GCash logo" /> */}
                <Label htmlFor="gcash">GCash</Label>
              </div>
              <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem value="gotyme" id="gotyme" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="gotyme">GoTyme</Label>
              </div>

              <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem value="bdo" id="bdo" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="bdo">BDO</Label>
              </div>
               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem value="bpi" id="bpi" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="bpi">BPI</Label>
              </div>
               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem value="maya" id="maya" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="maya">Maya</Label>
              </div>

               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem disabled value="eastwest" id="eastwest" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="eastwest">Eastwest</Label>
                <p className=' text-[.6rem] text-red-500'>(Coming soon!)</p>
              </div>

               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem disabled value="securitybank" id="securitybank" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="securitybank">Security Bank</Label>
                <p className=' text-[.6rem] text-red-500'>(Coming soon!)</p>
              </div>

               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem disabled value="metrobank" id="metrobank" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="metrobank">Metro Bank</Label>
                <p className=' text-[.6rem] text-red-500'>(Coming soon!)</p>
              </div>

               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem disabled value="unionbank" id="unionbank" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="unionbank">Unionbank</Label>
                <p className=' text-[.6rem] text-red-500'>(Coming soon!)</p>
              </div>
               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem disabled value="cimb" id="cimb" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="cimb">CIMB</Label>
                <p className=' text-[.6rem] text-red-500'>(Coming soon!)</p>
              </div>

               <div className="flex items-center space-x-2 bg-zinc-100 p-2 rounded-md">
                <RadioGroupItem disabled value="komo" id="komo" />
                {/* <img src="/gotyme.png" width={30} alt="GoTyme logo" /> */}
                <Label htmlFor="komo">KOMO</Label>
                <p className=' text-[.6rem] text-red-500'>(Coming soon!)</p>
              </div>
            </RadioGroup>
          )}
        />
        {errors.paymentMethod && <span className="error">{errors.paymentMethod.message}</span>}


        <label htmlFor="type" className=' label mt-2'>Account Name</label>
        <Input type='text' placeholder='Account name' {...register('accountName')}/>
        {errors.accountName && <span className="error">{errors.accountName.message}</span>}


        <label htmlFor="type" className=' label mt-2'>Account no.</label>
        <Input type='number' placeholder='Account no.' {...register('accountNumber')}/>
        {errors.accountNumber && <span className="error">{errors.accountNumber.message}</span>}


        <label htmlFor="type" className=' label mt-2'>Amount</label>

        {prop.wallet === 'Commission Wallet Balance' ? (

          <>
          {payment === 'gcash' && (
              <Select onValueChange={(value) => setValue('amount',  Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">₱500</SelectItem>
                <SelectItem value="1000">₱1,000</SelectItem>
                <SelectItem value="2000">₱2,000</SelectItem>
                <SelectItem value="3000">₱3,000</SelectItem>
                <SelectItem value="4000">₱4,000</SelectItem>
                <SelectItem value="5000">₱5,000</SelectItem>
          
              </SelectContent>
            </Select>
        // <Input type='number' placeholder='Amount'  {...register('amount', { valueAsNumber: true })}/>

          )}  {payment === 'gotyme' &&   (
            <Select onValueChange={(value) => setValue('amount',  Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="500">₱500</SelectItem>
                <SelectItem value="1000">₱1,000</SelectItem>
                <SelectItem value="2000">₱2,000</SelectItem>
                <SelectItem value="3000">₱3,000</SelectItem>
                <SelectItem value="5000">₱5,000</SelectItem>
                <SelectItem value="10000">₱10,000</SelectItem>
                <SelectItem value="15000">₱15,000</SelectItem>
                <SelectItem value="20000">₱20,000</SelectItem>
                <SelectItem value="30000">₱30,000</SelectItem>
                <SelectItem value="50000">₱50,000</SelectItem>
                <SelectItem value="70000">₱70,000</SelectItem>
                <SelectItem value="100000">₱100,000</SelectItem>
                <SelectItem value="150000">₱150,000</SelectItem>
                <SelectItem value="200000">₱200,000</SelectItem>
                <SelectItem value="300000">₱300,000</SelectItem>
                <SelectItem value="500000">₱500,000</SelectItem>
              </SelectContent>
            </Select>
          )}

          {payment === 'bdo' &&   (
            <Select onValueChange={(value) => setValue('amount',  Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">₱5,000</SelectItem>
                <SelectItem value="10000">₱10,000</SelectItem>
                <SelectItem value="15000">₱15,000</SelectItem>
                <SelectItem value="20000">₱20,000</SelectItem>
                <SelectItem value="30000">₱30,000</SelectItem>
                <SelectItem value="50000">₱50,000</SelectItem>
                {/* <SelectItem value="70000">₱70,000</SelectItem>
                <SelectItem value="100000">₱100,000</SelectItem>
                <SelectItem value="150000">₱150,000</SelectItem>
                <SelectItem value="200000">₱200,000</SelectItem>
                <SelectItem value="300000">₱300,000</SelectItem>
                <SelectItem value="500000">₱500,000</SelectItem> */}
              </SelectContent>
            </Select>
          )}

           {payment === 'bpi' &&   (
            <Select onValueChange={(value) => setValue('amount',  Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000">₱5,000</SelectItem>
                <SelectItem value="10000">₱10,000</SelectItem>
                <SelectItem value="15000">₱15,000</SelectItem>
                <SelectItem value="20000">₱20,000</SelectItem>
                <SelectItem value="30000">₱30,000</SelectItem>
                <SelectItem value="50000">₱50,000</SelectItem>
                {/* <SelectItem value="70000">₱70,000</SelectItem>
                <SelectItem value="100000">₱100,000</SelectItem>
                <SelectItem value="150000">₱150,000</SelectItem>
                <SelectItem value="200000">₱200,000</SelectItem>
                <SelectItem value="300000">₱300,000</SelectItem>
                <SelectItem value="500000">₱500,000</SelectItem> */}
              </SelectContent>
            </Select>
          )}

          {payment === 'maya' &&   (
            <Select onValueChange={(value) => setValue('amount',  Number(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="500">₱500</SelectItem>
                  <SelectItem value="1000">₱1,000</SelectItem>
                  <SelectItem value="2000">₱2,000</SelectItem>
                  <SelectItem value="3000">₱3,000</SelectItem>
                  <SelectItem value="5000">₱5,000</SelectItem>
              </SelectContent>
            </Select>
          )}


          {/* {(payment !== 'gcash' || 'gotyme') && (
             <Input type='number' placeholder='Amount'  {...register('amount', { valueAsNumber: true })}/>

          )} */}

          </>

          
         
          
        ):(

          
        <Input type='number' placeholder='Amount'  {...register('amount', { valueAsNumber: true })}/>

        )}
        
        {errors.amount && <span className="error">{errors.amount.message}</span>}

       



        <button disabled={loading} className=' primary-btn px-4 py-3 mt-4'>
            {loading === true && (
                <span className=' loader'></span>
            )}
            Send</button>
    
      </form>

     
    </DialogContent>
  </Dialog>
  
  )
}
