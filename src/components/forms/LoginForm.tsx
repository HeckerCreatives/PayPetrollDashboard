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
import axios, { AxiosError } from 'axios'
import { useRouter } from "next/navigation"
import toast from 'react-hot-toast'
import loadingStore from "@/zustand/loading"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react" // Import eye icons for toggling

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
  const { loading, setLoading, clearLoading } = loadingStore()

  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
      }
    };

    fetchIP();
  }, []);

  const login = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/login?username=${username}&password=${password}&ipAddress=${ip}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.data.data.auth === 'player') {
        toast.success('Successfully logged in')
        router.push('/user/dashboard')
        setLoading(false)
      } else if (response.data.data.auth === 'superadmin') {
        toast.success('Successfully logged in')
        router.push('/superadmin/analytics')
        setLoading(false)
      } else if (response.data.data.auth === 'admin') {
        toast.success('Successfully logged in')
        router.push('/admin/analytics')
        setLoading(false)
      } else {
        toast.error(response.data.data)
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Username</Label>
                  <Input
                    value={username.toLocaleLowerCase()}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="test"
                    placeholder="e.g user123"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      value={password.toLowerCase()}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                      onClick={() => setShowPassword(!showPassword)} 
                    >
                      {showPassword ? <Eye size={15} /> : <EyeOff size={15} />} 
                    </button>
                  </div>
                </div>
               
                  <Button disabled={loading} onClick={login} type="submit" className="w-full">
                    {loading === true && (
                      <span className="loader"></span>
                    )}
                    Login
                  </Button>
                
              </div>
              {/* <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/auth/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}