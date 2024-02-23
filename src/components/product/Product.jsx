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
  removeItemFromCart,
  addItemsToFavourites,
  removeItemFromFavourites,
} from "../../utils/helperFunctions";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

const Product = ({ id, name, price, productID, favouriteItemID, image, productObj, collectionString }) => {
  const pathName = usePathname();
  const [isFavouriteClicked, setIsFavouriteClicked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [productFavouritedArray, setProductFavouritedArray] = useState(productObj?.
    userFavourited);
  const [productCartID, setProductCarTID] = useState("");
  const [productFavouriteID, setProductFavouriteID] = useState("");
  const data = useSelector((state) => state.user.data);
  //When a product is added to the car, some properties are removed from the product object and some properties are added like isCkecked
  const [isPathNameActive, setIsPathNameActive] = useState(
    pathName.includes(`/main/favourite`)
  );
  const userID = useSelector((state) => state.user.userID);
  const userFavourites = useSelector((state) => state.user.userFavourites);
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  // const userFavourites = useSelector((state) => state.user.userFavourites);

  function checkIfUserAddedToFavourite(userFavourites , id){
    console.log("userFavourites  , id", userFavourites, id)
    // let userFavourites = firebaseUserInfo?.favourites
    if (userFavourites) {
      let arrayItem = data?.favouritesArray?.find(product => product.productID == id)
      console.log("check ", arrayItem)
      if (!arrayItem) {
        return false
      }
      return true
    }
}
  checkIfUserAddedToFavourite(userFavourites, id)

  function addItemToCartFromProduct() {
    setIsInCart(!isInCart);
    
    addItemsToCart(id, 1, userID, setProductCarTID, collectionString);
    console.log("productCartIDDDDDDDDD" + productCartID);
  }

  function removeFromFavourites() {
    console.log("removeFromFavourites got called" );
    removeItemFromFavourites(id, userID, collectionString)
  }

  function addtoFavourites() {
    // setIsFavourited(!isFavourited);
    console.log("productID", id)
    addItemsToFavourites(id, userID, setProductFavouriteID, collectionString);
    console.log("ProductFavouriteID" + setProductFavouriteID);
  }

  function removeProductFromCart(productCartID) {
    if (productCartID == "") {
      return;
    }
    removeItemFromCart('Products' ,id, favouriteItemID, userID);
    setIsInCart(!isInCart);
  }


  console.log('favouritedArray ', productObj?.userFavourited)

  let isFavourited = productObj?.userFavourited.includes(userID);
  console.log("check if the user favourited the product", isFavourited)


  useEffect(()=>{
     
  },[])
  
  return (
    <div className="product  relative rounded-xl  bg-white overflow-hidden max-w-fit">
      <div className=" w-fit  max-h-fit rounded-xl  shadow-2xl bg-whie border-[0.2px] border-black overflow-hidden mx-auto">
        <Image src={image} className="object-cover aspect-square " width={180} height={180} />
      </div>
      {collectionString == "Products" ? (<Link href="/product/[id]" as={`/product/${id}`}>
        <div className="info p-2">
          <h2 className="text-base font-semibold ">{name}</h2>
          <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
        </div>
      </Link>) : (<Link href="/popularProduct/[id]" as={`/popularProduct/${id}`}>
        <div className="info p-2">
          <h2 className="text-base font-semibold ">{name}</h2>
          <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
        </div>
      </Link>)}

      
      {(firebaseUserInfo?.accountVerified) && (<div
        className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]"
        onClick={addItemToCartFromProduct}
      >
        <Image src={addIcon} width={20} />
      </div>)}
      
      {firebaseUserInfo?.accountVerified &&
        (isFavourited && checkIfUserAddedToFavourite(userFavourites, id) ? 
        (<div onClick={() => removeFromFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
          <Image src={favouriteClicked} width={20} className={`scaleLikeIcon`} />
        </div>)
        : 
        (<div onClick={() => addtoFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
          <Image src={favourite} width={20} className={``} />
        </div>))}
    </div>
  );
};

export default Product;








// {
//   !isPathNameActive && (!isFavourited ?
//     (<div onClick={() => addtoFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
//       <Image src={favourite} width={20} className={``} />
//     </div>)
//     :
//     (<div onClick={() => removeFromFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
//       <Image src={favouriteClicked} width={20} className={`scaleLikeIcon`} />
//     </div>)
//   )
// }