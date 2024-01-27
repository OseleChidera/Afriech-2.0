import React from 'react'
import BrandOptionButton from './BrandOptionButton'

const BrandOptions = () => {
  return (
    <div className='flex gap-4 py-2 w-full overflow-x-auto px-4 hide-scrollbar '>
        <BrandOptionButton/>
        <BrandOptionButton/>
        <BrandOptionButton/>
        <BrandOptionButton/>
        <BrandOptionButton/>
    </div>
  )
}

export default BrandOptions



