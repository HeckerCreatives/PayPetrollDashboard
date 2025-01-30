"use client"
import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useRouter } from "next/navigation"
import loadingtableStore from "@/zustand/tableloading"
import rateStore from "@/zustand/rate"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const chartConfig = {
  amount: {
    label: "Amount",
    color: "#75C09F",
  },
} satisfies ChartConfig

export default function LongChart() {
  const router = useRouter()
  const { loading, setLoading, clearLoading } = loadingtableStore()
  const { rate, setRate, clearRate } = rateStore()
  const [data, setdata] = useState<{ timeframe: string, amount: number }[]>([])
  const [type, setType] = useState('daily')

  const total = React.useMemo(
    () => ({
      amount: data ? data.reduce((acc, curr) => acc + curr.amount, 0) : 0,
    }),
    [data]
  )

  useEffect(() => {
    setLoading(true)
    const getList = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/payingraph?charttype=${type}`, {
          withCredentials: true
        })

        // Transform the API response data
        const transformedData = Object.entries(response.data.data).map(([time, value]) => ({
          timeframe: time, // Use the time directly
          amount: value as number,
        }))

        setdata(transformedData) // Set the transformed data
        setLoading(false)

      } catch (error) {
        setLoading(false)

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>
          if (axiosError.response && axiosError.response.status === 401) {
            toast.error(`${axiosError.response.data.data}`)
            router.push('/')
          }
        }
      }
    }
    getList()
  }, [type])

  console.log(data)

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className=" uppercase">{type} Sales</CardTitle>
          <CardDescription>
            Showing total sales {type}
          </CardDescription>
          <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent className=" text-xs">
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>

        </div>
        <div className="flex">
          <button
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">
              {chartConfig.amount.label}
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.amount.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data} // Use the transformed data from the state
            margin={{
              left: 12,
              right: 12,
            }}
            barCategoryGap={10} 
            barGap={0} 
            barSize={30} 
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeframe"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return value // Display the time directly (e.g., "00:00")
              }}
              className=" uppercase"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return value // Display the time directly in the tooltip
                  }}
                />
              }
            />
            <Bar dataKey="amount" fill={chartConfig.amount.color} className=" w-9" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}