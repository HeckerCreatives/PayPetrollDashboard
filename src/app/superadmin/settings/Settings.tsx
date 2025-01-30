import Changepasswordadmin from '@/components/forms/Changepasswordadmin'
import React from 'react'

export default function Settings() {
  return (
    <div className="w-full flex flex-col gap-8 font-light">
    
        <h2 className=' text-xl font-bold mt-8 text-white'>Settings</h2>

        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[400px_1fr_1fr] gap-4'>
           

           <Changepasswordadmin/>

        
        </div>

    </div>
  )
}
