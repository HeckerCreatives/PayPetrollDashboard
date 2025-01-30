import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import Saleshistory from './SalesHistory'

export default function page() {
  return (
    <Superadminlayout>
        <div className=' w-full'>
        <h2 className='text-xl font-bold mt-8 text-white'>Sales</h2>

        </div>
        <Saleshistory/>
    </Superadminlayout>
  )
}
