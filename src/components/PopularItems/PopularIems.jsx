import React from 'react'
import Product from '../product/Product'
import Link from 'next/link';
const PopularIems = () => {
  return (
    
      <div className="w-full p-4 shadow-md">
        <div className="flex w-full justify-between mb-2">
          <h2 className="capitalize text-[#695acde4] text-lg">poular items</h2>
          <button className="capitalize border-none  underline underline-offset-1 bg-[#695acde4] text-white rounded-lg px-3 py-1">see all</button>
        </div>
        <div className="flex gap-4">
          <Product />
          <Product />
        </div>
      </div>
  );
}

export default PopularIems