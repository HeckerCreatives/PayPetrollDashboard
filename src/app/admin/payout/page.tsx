'use-client'
import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import Payouthistory from './PayoutHistory'
import Adminlayout from '@/components/layout/AdminLayout'


export default function page() {
  return (
    <Adminlayout>
      
       <Payouthistory/>
    </Adminlayout>
  )
}
