import React from 'react'
import BrandOptionButton from './BrandOptionButton'


const brandOptions = [
 { brandID: 'samsung' },
 { brandID: 'apple'},
 { brandID: 'google'},
 { brandID: 'sony'},
 { brandID: 'oneplus' },
]
const BrandOptions = () => {
  return (
    <div className='flex gap-4 py-2 w-full overflow-x-auto px-4 hide-scrollbar '>
      {
        brandOptions.map((brandName) => (<BrandOptionButton brandID={brandName.brandID}/>))
      }
        
    </div>
  )
}

export default BrandOptions



