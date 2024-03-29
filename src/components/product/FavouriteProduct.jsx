"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg";
import addIcon from "../../../public/icons/add.svg";
import favourite from "../../../public/icons/favourite.svg";
import favouriteClicked from "../../../public/icons/favouriteChecked.svg";
import trashIcon from "../../../public/icons/trashIcon.svg";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    formatNumberWithCommas,
    addItemsToCart,
    addItemsToFavourites,
    removeItemFromFavourites
} from "../../utils/helperFunctions";
import { useSelector } from "react-redux";


const Product = ({ id, name, price, productID, favouriteItemID, image, productObj, collectionString }) => {
    const pathName = usePathname();
    const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [productFavouritedArray, setProductFavouritedArray] = useState(productObj?.
        userFavourited);
    const [productCartID, setProductCarTID] = useState("");
    const [productFavouriteID, setProductFavouriteID] = useState("");
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    //When a product is added to the car, some properties are removed from the product object and some properties are added like isCkecked
    const [isPathNameActive, setIsPathNameActive] = useState(
        pathName.includes(`/main/favourite`)
    );
    const userID = useSelector((state) => state.user.userID);
  

    function removeFromFavourites() {
        console.log("removeFromFavourites got called");
        removeItemFromFavourites(id, userID, collectionString)
    }

    function addItemToCartFromProduct() {
        // setIsInCart(!isInCart);

        addItemsToCart(id, 1, userID, setProductCarTID, collectionString);
        // console.log("productCartIDDDDDDDDD" + productCartID);
    }
    useEffect(() => {

    }, [])

    return (
        <div className="product  relative rounded-xl  bg-white overflow-hidden max-w-fit">
            <div className="w-fit  max-h-fit rounded-xl  shadow-2xl bg-whie border border-black overflow-hidden mx-auto">
                <Image src={image} className="object-cover aspect-square" width={180} height={180} />
            </div>
            <Link href="/product/[id]" as={`/product/${id}`}>
                <div className="info p-2">
                    <h2 className="text-base font-semibold ">{name}</h2>
                    <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
                </div>
            </Link>
            {firebaseUserInfo?.accountVerified && (<div
                className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
                onClick={addItemToCartFromProduct}
            >
                <Image src={addIcon} width={20} />
            </div>)}
            <div
                className="absolute bg-[#695acde4] top-0 right-0 rounded-tr-xl rounded-br-none rounded-bl-xl runded rounded-tl-none p-[0.3rem]"
                onClick={() => removeFromFavourites()}
            >
                <Image src={trashIcon} width={20} />
            </div>
        </div>
    );
};

export default Product;







