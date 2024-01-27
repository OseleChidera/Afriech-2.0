import Nav from '@/components/Nav'
import React from 'react'
import SearchBar from '@/components/searchbar/SearchBar'
import Product from '@/components/product/Product'

export default function page() {
  return (
    <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
      <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
        <SearchBar />
        <div className="grid-container ">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
      <Nav />
    </div>
  )
}
