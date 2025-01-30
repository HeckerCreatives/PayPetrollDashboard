import Playerlayout from '@/components/layout/Playerlayout'
import UserLayout from '@/components/layout/UserLayout'
import React from 'react'
import Invites from './Invites'

export default function page() {
  return (
    <Playerlayout>
       <Invites/>
    </Playerlayout>
  )
}
