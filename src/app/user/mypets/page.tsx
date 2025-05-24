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
       <Tabs defaultValue="Claim" className="w-full mt-8">
               <TabsList className=' bg-white'>
                   <TabsTrigger value="Claim">Earning Claim History</TabsTrigger>
                   <TabsTrigger value="Daily">Game Claim History</TabsTrigger>
               </TabsList>
               <TabsContent value="Claim">
                   <ClaimHistory/>
               </TabsContent>
               <TabsContent value="Daily">
                   <DailyClaimHistory/>
               </TabsContent>
               </Tabs>
    </Playerlayout>
  )
}
