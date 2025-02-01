import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import Settings from './Settings'
import Adminlayout from '@/components/layout/AdminLayout'

export default function page() {
  return (
    <Adminlayout>
        <Settings/>
    </Adminlayout>
  )
}
