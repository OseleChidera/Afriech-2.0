'use client'
import React from 'react'

const BrandOptionButton = ({brandID}) => {
  return (
    <div className='rounded-2xl px-3 py-1 border bg-[#695acde4] text-white border-white capitalize text-xl'>
      <input
        type="checkbox"
        id={id}
        onChange={handleCheckboxChange}
        checked={isSelected}
        className='hidden'
      />
      <label htmlFor={id} className='flex-auto rounded-md h-fit'>
        {brandID}
      </label>
    </div>
  )
}

export default BrandOptionButton