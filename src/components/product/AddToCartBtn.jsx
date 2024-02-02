import React , {useEffect,useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import addICON from '../../../public/icons/add-01.svg'
import minus from '../../../public/icons/minus-sign.svg'
import { formatNumberWithCommas } from '@/utils/helperFunctions'



export default function AddToCartBtn({ price  , qty }) {
    const [itemQtyToAddToCart, setItemQtyToAddToCart] = useState(1)

    function incrementCounter() {
        if (itemQtyToAddToCart == qty) {
            return
        }
        setItemQtyToAddToCart(itemQtyToAddToCart + 1)
    }
    function decrementCounter() {
        if (itemQtyToAddToCart == 1) {
            return
        }
        setItemQtyToAddToCart(itemQtyToAddToCart - 1)
    }
  return (
      <div className="flex justify-between items-baseline fixed  bottom-0 left-0 w-full p-6 pb-2 bg-white shadow-2xl  border-[0.2px] border-black ">
          <div className="flex flex-col">
              <h2 className="capitalize font-bold text-xl ">
                  ₦{formatNumberWithCommas(price)}
              </h2>
              <h2 className="capitalize font-regular text-lg ">
                  {qty}<span className='font-light lowercase text-sm'> pcs</span>
              </h2>
          </div>
          <div className="flex flex-col gap-4">
              <div className="flex gap-1 ">
                  <button className="flex items-center justify-centerc border-none px-3 py-2 rounded-xl bg-[#695acd]"
                      onClick={decrementCounter}>
                      <Image src={minus} width={20} height={20} className="" />
                  </button>
                  <input
                      type="number"
                      className="text-center border border-black py-1 rounded-xl"
                      max={`${qty}`}
                      min="1"
                      placeholder="1"
                      value={itemQtyToAddToCart}
                  />
                  <button className="flex items-center justify-centerc border-none px-3 py-2 rounded-xl bg-[#695acd]"
                      onClick={incrementCounter}>
                      <Image src={addICON} width={20} height={20} className="" />
                  </button>
              </div>
              <button className="font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative float-right  ">
                  Add To Cart
              </button>
          </div>
      </div>
  )
}
