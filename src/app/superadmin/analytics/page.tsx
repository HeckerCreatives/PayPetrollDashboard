import Card from '@/components/common/Card'
import Superadminlayout from '@/components/layout/Superadminlayout'
import React from 'react'
import Chart from './Chart'
import LongChart from './LongChart'

export default function page() {
  return (
    <Superadminlayout>
        <div className=' w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-12 gap-4'>
          <Card name={'Total Sales'} amount={0} color={'bg-amber-400'} subcolor={'bg-amber-300'}/>
          <Card name={'Company Commission'} amount={0} color={'bg-teal-400'} subcolor={'bg-teal-300'}/>
          <Card name={'User Top Up'} amount={0} color={'bg-emerald-400'} subcolor={'bg-emerald-300'}/>
          <Card name={'Total Payout'} amount={0} color={'bg-purple-400'} subcolor={'bg-purple-300'}/>
          <Card name={'Payout Game'} amount={0} color={'bg-sky-400'} subcolor={'bg-sky-300'}/>
          <Card name={'Payout Commission'} amount={0} color={'bg-rose-400'} subcolor={'bg-rose-300'}/>
          <Card name={'Total Company Profit'} amount={0} color={'bg-blue-400'} subcolor={'bg-blue-300'}/>
          <Card name={'Game Profit'} amount={0} color={'bg-green-400'} subcolor={'bg-green-300'}/>
          <Card name={'User Account'} amount={0} color={'bg-rose-400'} subcolor={'bg-rose-300'}/>

        </div>
        <LongChart/>
    </Superadminlayout>
  )
}
