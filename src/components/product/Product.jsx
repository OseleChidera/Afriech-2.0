'use client'
import Image from "next/image";
import React, {useState} from "react";
import phone from "../../../public/images/samsung-galaxy-s21-ultra-5g-4.jpg";
import addIcon from '../../../public/icons/add.svg'
import favourite from '../../../public/icons/favourite.svg'
import favouriteClicked from '../../../public/icons/favouriteChecked.svg'
import trashIcon from '../../../public/icons/trashIcon.svg'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { formatNumberWithCommas } from  '../../utils/helperFunctions'


const Product = ({ name ,price,id}) => {
  const pathName = usePathname();
  const [isClicked, setIsClicked] = useState(false)
  //When a product is added to the car, some properties are removed from the product object and some properties are added like isCkecked
  const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/main/favourite`))

  function addtoFavourites(){
    setIsClicked(!isClicked)
  }
  return (
    <Link href="/product/[id]" as={`/product/${id}` }>
      <div className="product  relative rounded-xl  bg-white overflow-hidden ">
        <div className=" w-fit  max-h-fit rounded-xl  shadow-2xl bg-whie border border-black overflow-hidden">
          <Image src={phone} className="aspect-auto object-cover " width={180} />
        </div>
        <div className="info p-2">
          <h2 className="text-base font-semibold ">{name}</h2>
          <h3 className="text-sm">₦{formatNumberWithCommas(price)}</h3>
        </div>
        {!isPathNameActive ?
          (<div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]">
            <Image src={addIcon} width={20} />
          </div>)
          : (<div className="absolute bg-[#695acde4] bottom-0 right-0 rounded-t-xl rounded-b-xl rounded-bl-none runded rounded-tr-none p-[0.3rem]">
            <Image src={trashIcon} width={20} />
          </div>)}
        {!isPathNameActive && (<div onClick={() => addtoFavourites()} className={`absolute bg-[#695acde4] top-0 right-0 rounded-t-nne rounded-br-none rounded-bl-xl runded rounded-tr-xl p-[0.3rem]`}>
          <Image src={isClicked ? favouriteClicked : favourite} width={20} className={`${isClicked ? 'scaleLikeIcon' : ''}`} />
        </div>)}
      </div>
    </Link>
  );
};

export default Product;
