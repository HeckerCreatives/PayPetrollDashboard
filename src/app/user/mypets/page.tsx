import Playerlayout from '@/components/layout/Playerlayout'
import UserLayout from '@/components/layout/UserLayout'
import React from 'react'
import Mypets from './mypets'
import ClaimHistory from './Claimhistory'
import DailyClaimHistory from './GameDailyclaimHistory'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function page() {
  return (
    <Playerlayout>
       <Mypets/>
       {/* <ClaimHistory/>
       <DailyClaimHistory/> */}
      
    </Playerlayout>
  )
}
