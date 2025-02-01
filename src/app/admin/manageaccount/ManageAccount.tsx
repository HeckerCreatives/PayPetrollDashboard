import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminTable from './AdminTable'
import PlayerTable from './UserTable'
import PlayerCount from './PlayerCount'


export default function ManageAccount() {
  return (
    <div className=' w-full flex flex-col'>
      <h2 className='text-xl font-bold mt-8 text-white mb-6'>Manage Account</h2>
      <PlayerCount/>
          <PlayerTable/>
        
    </div>
  )
}
