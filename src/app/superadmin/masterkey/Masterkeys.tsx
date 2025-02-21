import Masterkey from '@/components/forms/Masterkey'
import React from 'react'
import Masterkeyhistory from './Masterkeyhistory'

export default function Masterkeys
() {
  return (
    <div className=' flex flex-col gap-8 w-full bg-cream p-4 rounded-md'>
        <Masterkey/>
        <Masterkeyhistory/>
    </div>
  )
}
