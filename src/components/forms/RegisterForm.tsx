'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { decryptUid } from "@/helpers/encrypt"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Register, registeruser } from "@/validitions/validation"
import loadingStore from "@/zustand/loading"
import { Eye, EyeOff } from "lucide-react"

export function RegisterForm() {
  const [referral, setReferral] = useState('')
  const [referralDecrypt, setReferralDecrypt] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false) // State for confirm password visibility
  const params = useSearchParams()
  const referralId = params.get('uid')
  const router = useRouter()
  const { loading, setLoading, clearLoading } = loadingStore()

  const replaceSpacesWithPlus = (input: string): string => {
    return input.replace(/ /g, '+')
  }

  useEffect(() => {
    if (referralId !== null) {
      const finalId = replaceSpacesWithPlus(referralId)
      setReferralDecrypt(finalId)
    }
  }, [referralId])

  // Get referral username
  useEffect(() => {
    const getWallets = async () => {
      try {
        if (referralDecrypt !== '') {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/getreferralusername?id=${decryptUid(referralDecrypt)}`, {
            withCredentials: true
          })
          console.log(response.data)
          setReferral(response.data.data)
        }
      } catch (error) {
        toast.error(`Please do not tamper the URL`)
      }
    }
    getWallets()
  }, [referralDecrypt])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(registeruser),
  })

  const onSubmit = async (data: Register) => {
    setLoading(true)
    const { confirm, ...submitData } = data
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        username: submitData.username,
        password: submitData.password,
        referral: decryptUid(referralDecrypt),
        phonenumber: submitData.phonenumber
      })

      const response = await toast.promise(request, {
        loading: 'Registering account....',
        success: `Registered successfully`,
        error: 'Error while registering your account out',
      })

      if (response.data.message === 'success') {
        router.push('/')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, data: string }>
        if (axiosError.response && axiosError.response.status === 401) {
          toast.error(`${axiosError.response.data.data}`)
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

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <div className="grid">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    maxLength={20}
                    placeholder="e.g user123"
                    {...register('username')}
                  />
                  {errors.username && <p className='text-[.6em] text-red-400'>{errors.username.message}</p>}
                </div>

                <div className="grid">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      maxLength={20}
                      type={showPassword ? "text" : "password"}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
                    </button>
                  </div>
                  {errors.password && <p className='text-[.6em] text-red-400'>{errors.password.message}</p>}
                </div>

                <div className="grid">
                  <div className="flex items-center">
                    <Label htmlFor="confirm">Confirm Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="confirm"
                      maxLength={20}

                      type={showConfirmPassword ? "text" : "password"}
                      {...register('confirm')}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <Eye size={15}/> : <EyeOff size={15}/>}
                    </button>
                  </div>
                  {errors.confirm && <p className='text-[.6em] text-red-400'>{errors.confirm.message}</p>}
                </div>

                <div className="grid">
                  <div className="flex items-center">
                    <Label htmlFor="phonenumber">Phone no.</Label>
                  </div>
                  <Input
                    id="phone"
                    type="number"
                    placeholder="e.g 098745635462"
                    {...register('phonenumber')}
                  />
                  {errors.phonenumber && <p className='text-[.6em] text-red-400'>{errors.phonenumber.message}</p>}
                </div>

                <div className="grid">
                  <Label htmlFor="referral">Referral</Label>
                  <Input
                    disabled={true}
                    value={referral}
                    id="referral"
                    type="text"
                    placeholder=""
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/" className="underline underline-offset-4">
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}