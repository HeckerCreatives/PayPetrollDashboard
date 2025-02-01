import Changepasswordadmin from '@/components/forms/Changepasswordadmin'
import Conversionrate from '@/components/forms/Conversionrate'
import React from 'react'
import Socialmedias from './Socialmedias'

export default function Settings() {
  return (
    <div className="w-full flex flex-col gap-8 font-light">
    
        <h2 className=' text-xl font-bold mt-8 text-white'>Settings</h2>

        <div className=' w-full flex-wrap flex gap-4'>
           <Changepasswordadmin/>
           
        </div>

    </div>
  )
}
