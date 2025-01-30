import Playerlayout from '@/components/layout/Playerlayout'
import UserLayout from '@/components/layout/UserLayout'
import React from 'react'
import Dashboard from './Dashboard'
import Tables from './Table'
import Playnow from './Playnow'

export default function page() {
  return (
    <Playerlayout>
       

      <Dashboard/>
            <div className=' w-full grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6'>
                <Tables/>

              <Playnow/>


            </div>
       
    </Playerlayout>
  )
}
