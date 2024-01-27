import Location from '@/components/Location'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='w-full min-h-screen max-h-fit bg-[#ffffff] relative shadow-2xl'>
        {/* <div className="w-full aspect-video bg-green-600 rounded-full absolute green"></div> */}
        <Location/>
         {/* <div className="mt-4"> */}
        {children}
         {/* </div> */}
    </div>
  )
}

export default layout