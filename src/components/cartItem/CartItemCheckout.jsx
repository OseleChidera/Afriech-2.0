import React, { useState , useEffect } from 'react';
import Image from 'next/image';
import CartItemProductComponent from './CartItemProductComponent';
import { getUserData } from '@/utils/helperFunctions';
import { usePathname } from "next/navigation";
import { formatNumberWithCommas, removeItemFromCart } from '@/utils/helperFunctions';
import trashIcons from '../../../public/icons/trashIcon.svg'
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg";
import Link from 'next/link';
import { useSelector } from 'react-redux'
import { collection, addDoc, doc, setDoc, updateDoc, onSnapshot, getDoc, runTransaction } from 'firebase/firestore';
import { database } from '../../../firebaseConfig'; // Import your Firebase configuration
import { toast } from "react-toastify";


const CartItemCheckout = ({ id, selectCartItems, cartItemData, itemsToCheckout, cart, collectionString }) => {
    const [isSelected, setIsSelected] = useState(false);
    const pathName = usePathname();
    const userID = useSelector((state) => state.user.userID);
    const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/main/payment`))

    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
        // Call a function here to handle the ID retrieval when the radio button is selected
        if (!isSelected) {
            handleSelectedId(id);
        } else {
            handleSelectedId(null);
        }
    };

    async function  handleSelectedId(selectedId){
        // Implement logic to handle the selected ID
        console.log('Selected ID:', selectedId);
        // let selectedItem = cart.find(item => item.cartItemID == selectedId ? item : null)
        
        itemsToCheckout.push(selectedId)
       
        // console.log("basket: ",  itemsToCheckout)
    };

    function deleteItemFromCart(){
        removeItemFromCart(collectionString,cartItemData.productID, cartItemData.cartItemID, userID)
    }
 
    const price = formatNumberWithCommas(cartItemData?.price) 
    return (
        <div id="CartItemProductComponent" className={`flex gap-4 flex-1  rounded-md`}>
            {selectCartItems && (
                <input
                    type="checkbox"
                    id={id}
                    onChange={handleCheckboxChange}
                    checked={isSelected}
                    className='hidden'
                />
            )}
            <label htmlFor={id} className='flex-auto rounded-md h-fit'>
                <div className=" cart-item rounded-md relative  flex flex-1 gap-2 bg-white overflow-hidden p-2">
                   {cartItemData?.imageGalleryImages && ( <div className=" w-fit  h-fit rounded-xl  shadow-2xl bg-whie overflow-hidden cart-item-image">
                        <Image src={cartItemData?.imageGalleryImages[0]?.imageURL} className="aspect-auto object-cover " width={70} height={70}/>
                    </div>)}
                    <div className="info p-2 text-black">
                        <h2 className="text-xs font-semibold">
                            {selectCartItems ? (<h2 >{cartItemData?.name}</h2>) : (collectionString == "product" ? <Link href={`/product/${cartItemData?.productID}`}>{cartItemData?.name}</Link> : <Link href={`/popularProduct/${cartItemData?.productID}`}>{cartItemData?.name}</Link>)}
                        </h2>
                        {/* <h2 className="text-xs font-semibold">efssdfserwedwqed</h2> */}
                        {/* <h3 className="text-xs ">$10000000</h3> */}
                        <h3 className="text-xs ">₦{price}</h3>
                    </div>
                    <div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-md rounded-b-md rounded-bl-none  rounded-tr-none p-[0.3rem]" onClick={() => deleteItemFromCart()}>
                        <Image src={trashIcons} width={20} height={20}/>
                    </div>

                </div>
                
            </label>
        </div>
    );
};

export default CartItemCheckout;
