import { Download, Facebook, Instagram, Play, Send, Twitter, Youtube } from 'lucide-react'
import React from 'react'

export default function Playnow() {
  return (
    <div className=' w-full h-fit flex flex-col bg-white rounded-xl shadow-sm p-6'>

        <h2 className=' text-xl font-semibold'>Play now</h2>

        <div className=' w-full grid grid-cols-1 gap-4 mt-2'>

          {/* <div className=' w-full flex flex-col gap-2'>
            <div className=' w-full aspect-square relative bg-gray-100 rounded-md flex items-center justify-center'>
                <img src="/assets/Dog1.png" alt="bird" width={250} height={250} />
            </div>
            <button className=' text-sm text-white font-medium bg-dark py-3 w-full rounded-lg'><Download size={20}/>Download apk</button>

          </div> */}

          <div className=' w-full flex flex-col gap-2'>
            <div className=' relative w-full aspect-video bg-gray-100 rounded-md flex items-center justify-center'
            style={{backgroundImage: "url(/hero2.png)", backgroundSize:'cover', backgroundRepeat:'no-repeat'}}
            >
                <img src="/assets/Trainer1.png" alt="bird" width={100} height={100} className=' ~w-20/32 absolute bottom-0 left-0' />
            </div>
            <button className=' text-sm text-white font-medium bg-dark py-3 w-full rounded-lg'><Play size={20}/>Play now</button>

          </div>
          
        </div>

        <h2 className=' text-sm mt-6'>Follow us on:</h2>
        <div className=' w-full grid grid-cols-6 gap-2'>
          <a className=' socials'>
            <Facebook size={25}/>
          </a>

          <a className=' socials'>
            <Instagram size={25}/>
          </a>

          <a className=' socials'>
            <Twitter size={25}/>
          </a>

          <a className=' socials'>
            <Send size={25}/>
          </a>

          <a className=' socials'>
            <Youtube size={25}/>
          </a>

          <a className=' socials'>
            <Facebook size={25}/>
          </a>

        </div>


    </div>
  )
}
