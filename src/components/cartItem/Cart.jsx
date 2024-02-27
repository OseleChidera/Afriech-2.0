'use client';
import React, { useState , useEffect } from 'react';
import cartIcon from '../../../public/icons/shopping-cart-inactive.svg';
import Image from 'next/image';
import CartItemProductComponent from './CartItemProductComponent';
import CartItemCheckout from './CartItemCheckout';
import { getUserData, removeItemFromCartOnCheckout, calculateTotalPrice, formatNumberWithCommas } from '@/utils/helperFunctions';
import { useSelector } from 'react-redux';

const Cart = ({ setShowCart , showCartFn, showCart, userData, userIDString }) => {
    const [selectCartItems, setSelectCartItems] = useState(false);
    const [itemsToCheckout, setItemsToCheckout] = useState([]);
    const [basketTotalCost, setBasketTotalCost] = useState(null);
    const [newArray, setNeweArray] = useState(null);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const data = useSelector((state) => state.user.data);

    // Function to toggle selecting cart items
    function setSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems);
    }

    // Function to remove selected cart items
    function removeSelectCartItemsFn() {
        setSelectCartItems(!selectCartItems);
        // Uncheck all checkboxes
        Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    // Function to handle checkout of all selected items
    async function handleCheckAll(userIDString) {
        if (!itemsToCheckout || itemsToCheckout.length === 0) {
            return; // No items selected for checkout
        }

        const basket = userData.cart.filter(obj => itemsToCheckout.includes(obj.cartItemID));
        const basketTotalCost = calculateTotalPrice(basket);

        if (window.confirm(`Are you sure you want to checkout ${basket.length} items which costs ₦${formatNumberWithCommas(basketTotalCost)}?`)) {
            try {
                const existingCartItems = userData.cart.filter(obj => !itemsToCheckout.includes(obj.cartItemID));
                removeItemFromCartOnCheckout(existingCartItems, userIDString, setItemsToCheckout, basket);

                // Clear selected items and itemsToCheckout array
                setSelectCartItems(false);
                setItemsToCheckout([]);
                setShowCart(false)
            } catch (error) {
                console.error('Error handling checkout:', error);
            }
        } else {
            console.log('User rejected checkout');
            setSelectCartItems(false);
            setItemsToCheckout([]);
        }
    }
useEffect(()=>{
  const filteredArray = data?.cartArray?.filter((arrayItem)=> typeof arrayItem == "object")
  setNeweArray(filteredArray)
},[data?.cartArray])
    return (
        <div className="relative z-10">
            <div className="cart relative flex-end" onClick={() => showCartFn()}>
                <Image src={cartIcon} width={25} />
            </div>
            <div className={`location-btn ${showCart ? 'show-cart flex flex-col gap-2' : "hidden"} w-[75vw] absolute top-10 right-0 border border-black rounded-sm p-2 bg-[#f9f9f5]`}>
                {selectCartItems ? (
                    <button onClick={() => removeSelectCartItemsFn()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md'>
                        Cancel
                    </button>
                ) : (
                    <button onClick={() => setSelectCartItemsFn()} className='px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md'>
                        Checkout specific items
                    </button>
                )}
                <div className={`border border-black bg-[#f9f9f5]  flex flex-col gap-2 min-h-fit max-h-[15rem]  overflow-y-auto pt-2 pb-2`}>
                    {newArray ? (newArray?.map((cartItemData) => (
                        <CartItemCheckout key={cartItemData.cartItemID} selectCartItems={selectCartItems} id={cartItemData.cartItemID} cartItemData={cartItemData} itemsToCheckout={itemsToCheckout} cart={data.cartArray} collectionString={cartItemData.collectionString} />
                    ))) : 
                    <div className="border border-black w-full text-xl text-[#695acd] flex items-center justify-center">
                            <div className="h1">No Items To Display</div>
                        </div>
                    }
                </div>
                
                    <button onClick={() => handleCheckAll(userIDString)} className={`px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-md ${''}`}>
                        Checkout Items
                    </button>
                
            </div>
        </div>
    );
}

export default Cart;
