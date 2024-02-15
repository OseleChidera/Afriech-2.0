'use client'
import React, { useState } from 'react'
import cartIcin from '../../../public/icons/shopping-cart-inactive.svg'
import Image from 'next/image'
import CartItemProductComponent from './CartItemProductComponent'
import CartItemCheckout from './CartItemCheckout'
import { getUserData, removeItemFromCartOnCheckout, calculateTotalPrice , formatNumberWithCommas } from '@/utils/helperFunctions'
import { useSelector } from 'react-redux'



const Cart = ({ showCartFn, showCart, userData, userIDString }) => {

    const [selectCartItems, setSelectCartItems] = useState(false)
    const [itemsToCheckout, setItemsToCheckout] = useState([])
    const [basketTotalCost, setBasketTotalCost] = useState(null)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    // const userID = useSelector((state) => state.user.userID);

    function setSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems)
    }
    function removeSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems)
        Array.from(checkboxes).map((checkbox) => ({
            ...checkbox,
            checked: false,
        }));

    }

   

    console.table("userData?.cart ", userData?.cart)

    async function handleCheckAll(userIDString) {
        console.log("itemsToCheckout ", itemsToCheckout);

        // Check if there are items to checkout
        if (!itemsToCheckout || itemsToCheckout.length === 0) {
            return;
        }
        const basket = userData.cart.filter(obj => itemsToCheckout.includes(obj.cartItemID));
        const basketTotalCost = calculateTotalPrice(basket)
        // console.log("calculateTotalPrice(basket) ", calculateTotalPrice(basket), m);
    
        if (window.confirm(`Are you really sure you want to checkout ${basket.length} items which costs ₦${formatNumberWithCommas(basketTotalCost)}?`)) {
           try {
                const existingCartItems = userData.cart.filter(obj => !itemsToCheckout.includes(obj.cartItemID));
                console.log("basket ", existingCartItems);

                removeItemFromCartOnCheckout(existingCartItems, userIDString, setItemsToCheckout, basket)

                // // Clear selected items and itemsToCheckout array
                setSelectCartItems(false);
                setItemsToCheckout([]);
            } catch (error) {
                console.error('Error handling checkout:', error);
            }
        }
        else {
            console.log('user rejected checkout')
            setSelectCartItems(false);
            setItemsToCheckout([]);
        }

    }

    return (
        <div className="relative z-10 ">
            <div className="cart relative flex-end " onClick={() => showCartFn()}>
                <Image src={cartIcin} width={25} />
            </div>
            <div className={`location-btn ${showCart ? 'show-cart flex flex-col gap-2' : "hidden"} w-[75vw] absolute top-10 right-0  border border-black rounded-sm p-2 bg-[#f9f9f5]`}>
                {selectCartItems ? (<button onClick={() => removeSelectCartItemsFn()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md ' >
                    cancel
                </button>) : (<button onClick={() => setSelectCartItemsFn()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md ' >
                    chechout specific items
                </button>)}
                <div className={`border border-black bg-[#f9f9f5]  flex flex-col gap-2 min-h-fit max-h-[15rem]  overflow-y-auto pt-2 pb-2 `}>
                    {
                        userData?.cart.map((cartItemData) => (<CartItemCheckout selectCartItems={selectCartItems} id={cartItemData.cartItemID} cartItemData={cartItemData} itemsToCheckout={itemsToCheckout} cart={userData.cart} collectionString={cartItemData.collectionString} />)) 
                    }
                   
                </div>
                {firebaseUserInfo?.accountVerified && (<button onClick={() => handleCheckAll(userIDString)} className={`px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md ${''}`} >
                    chechout All items
                </button>)}
            </div>
        </div>
    )
}

export default Cart