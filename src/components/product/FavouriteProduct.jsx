"use client";
import Image from "next/image"; // Importing Image component from Next.js
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg"; // Importing phone image
import addIcon from "../../../public/icons/add.svg"; // Importing add icon image
import favourite from "../../../public/icons/favourite.svg"; // Importing favourite icon image
import favouriteClicked from "../../../public/icons/favouriteChecked.svg"; // Importing clicked favourite icon image
import trashIcon from "../../../public/icons/trashIcon.svg"; // Importing trash icon image
import { usePathname } from "next/navigation"; // Importing usePathname hook from Next.js
import Link from "next/link"; // Importing Link component from Next.js
import {
    formatNumberWithCommas,
    addItemsToCart,
    addItemsToFavourites,
    removeItemFromFavourites
} from "../../utils/helperFunctions"; // Importing utility functions
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux

// Product component to display individual product information
const Product = ({ id, name, price, productID, favouriteItemID, image, productObj, collectionString }) => {
    const pathName = usePathname(); // Get current pathname using usePathname hook
    const [isFavouriteClicked, setIsFavouriteClicked] = useState(false); // State to track if favourite button is clicked
    const [isInCart, setIsInCart] = useState(false); // State to track if product is in cart
    const [productFavouritedArray, setProductFavouritedArray] = useState(productObj?.userFavourited); // State to manage array of favourited products
    const [productCartID, setProductCarTID] = useState(""); // State to manage product cart ID
    const [productFavouriteID, setProductFavouriteID] = useState(""); // State to manage product favourite ID
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo); // Get user information from Redux store
    const [isPathNameActive, setIsPathNameActive] = useState(
        pathName.includes(`/main/favourite`)
    ); // State to track if current pathname is active
    const userID = useSelector((state) => state.user.userID); // Get user ID from Redux store

    // Function to remove product from favourites
    function removeFromFavourites() {
        removeItemFromFavourites(id, userID, collectionString);
    }

    // Function to add item to cart from product
    function addItemToCartFromProduct() {
        addItemsToCart(id, 1, userID, setProductCarTID, collectionString);
    }

    useEffect(() => {

    }, []);

    return (
        <div className="product  relative rounded-xl  bg-white overflow-hidden max-w-fit">
            {/* Product image */}
            <div className="w-fit  max-h-fit rounded-xl  shadow-2xl bg-whie border border-black overflow-hidden mx-auto">
                <Image src={image} className="object-cover aspect-square" width={180} height={180} alt="favourite product image"/>
            </div>
            {/* Product information */}
            <Link href="/product/[id]" as={`/product/${id}`}>
                <div className="info p-2">
                    <h2 className="text-base font-semibold ">{name}</h2>
                    <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
                </div>
            </Link>
            {/* Add to cart button */}
            {firebaseUserInfo?.accountVerified && (
                <div
                    className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
                    onClick={addItemToCartFromProduct}
                >
                    <Image src={addIcon} width={20} alt="favourite add icon"/>
                </div>
            )}
            {/* Remove from favourites button */}
            <div
                className="absolute bg-[#695acde4] top-0 right-0 rounded-tr-xl rounded-br-none rounded-bl-xl runded rounded-tl-none p-[0.3rem]"
                onClick={() => removeFromFavourites()}
            >
                <Image src={trashIcon} width={20} alt="favourite minus icon"/>
            </div>
        </div>
    );
};

export default Product;
