import React, { useState } from 'react'
import cartIcin from '../../../public/icons/shopping-cart-inactive.svg'
import Image from 'next/image'
import CartItemProductComponent from './CartItemProductComponent'
import CartItemCheckout from './CartItemCheckout'


const Cart = ({ showCartFn, showCart }) => {
    const [selectCartItems, setSelectCartItems] = useState(false)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    function setSelectCartItemsFn(){
        setSelectCartItems(!selectCartItems)
    }
    function removeSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems)
        Array.from(checkboxes).map((checkbox) => ({
            ...checkbox,
            checked: false,
        }));
      
    }
    const handleCheckAll = () => {
        
        const checkBoxIds = Array.from(checkboxes).filter((checkbox) => checkbox.checked ? checkbox.id : null).map((checkbox) => checkbox.id);
        console.log('Checked Radio IDs:', checkBoxIds);
    };
  return (
      <div className="relative z-10 ">
          <div className="cart relative flex-end border border-black" onClick={() => showCartFn()}>
              <Image src={cartIcin} width={20} />
          </div>
          <div className={`location-btn ${showCart ? 'show-cart flex flex-col gap-2' : "hidden"} w-[75vw] absolute top-10 right-0  border border-black rounded-sm p-2 bg-[#f9f9f5]`}>
              {selectCartItems ? (<button onClick={() => removeSelectCartItemsFn()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-xl ' >
                  cancel
              </button>) : (<button onClick={() => setSelectCartItemsFn()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-xl ' >
                chechout specific items
              </button>)}
              <div className={`border border-black bg-[#f9f9f5] text-red flex flex-col gap-2 ${selectCartItems ? "p-2" : " "}`}>
                  <CartItemCheckout selectCartItems={selectCartItems} id={1} />
                  <CartItemCheckout selectCartItems={selectCartItems} id={2} />
                  <CartItemCheckout selectCartItems={selectCartItems} id={3} />
                  <CartItemCheckout selectCartItems={selectCartItems} id={4} />
              </div>
              <button onClick={() => handleCheckAll()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md' >
                  chechout All items
              </button>
          </div>
      </div>
  )
}

export default Cart