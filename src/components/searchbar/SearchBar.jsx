'use client'
import React , {useState} from 'react'
import searchIcon from '../../../public/icons/search-01.svg'
import Image from 'next/image'

const SearchBar = () => {
    const [searchBarText, setSearchBarText] = useState('')
  return (
      <div className="max-w-md w-4/6 mx-auto flex items-center relative ">
          <input type="text" name="" id="" value={searchBarText} onChange={(e) => setSearchBarText(e.target.value)}className='rounded-[0.25rem] border border-black w-full indent-2 py-1' placeholder='Search for product' />
          <div className="w-fit aspect-sqiare absolute right-2">
              <Image src={searchIcon} width={20}/>
          </div>
      </div>
  )
}

export default SearchBar