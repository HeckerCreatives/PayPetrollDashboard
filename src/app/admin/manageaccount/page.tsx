import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import ManageAccount from './ManageAccount'
import Adminlayout from '@/components/layout/AdminLayout'

export default function page() {
  return (
    <Adminlayout>
        <ManageAccount/>
    </Adminlayout>
  )
}
