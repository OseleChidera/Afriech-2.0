'use client'
export const dynamicParams = false;
import React, { useState, useEffect} from 'react';
import Image from 'next/image';
import GalleryImage from '@/components/marketplace/GalleryImage';
import Link from 'next/link';
import { database } from '../../../../firebaseConfig';
import { collection, getDocs,setDoc ,getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";
import { fetchProductDataById, formatNumberWithCommas } from '../../../utils/helperFunctions'
import Location from '@/components/Location';
import addICON  from '../../../../public/icons/add-01.svg'
import minus from "../../../../public/icons/minus-sign.svg"
import AddToCartBtn from '@/components/product/AddToCartBtn';
import Reviews from '@/components/product/Reviews';
import { useSelector, useDispatch } from "react-redux";


export default function Page({ params }) {
    const productID = params.id
    const [product, setProduct] = useState({})
  const [productId, setProductId] = useState(productID)
    const [mainImage, setMainImage] = useState('')
    
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const selectGalleryImage = (index) => {
        setSelectedImageIndex(index);
        setMainImageFn(product.imageGalleryImages[index].imageURL);
    };

    const setMainImageFn = (imageUrl) => {
        // Set the main image based on selected index
        setMainImage(imageUrl);
    };


    useEffect(()=>{
        fetchProductDataById(productID, setProduct, setMainImage, "Products")
    },[])
   

  console.log('main image', mainImage)
  console.log('product', product)
    return (
      <>
        {firebaseUserInfo && (<Location />)}
        <div className="w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto p-6">
          <div className="flex flex-col gap-4 mb-[150px] ">
            <div
              id="product-image-tag"
                        className="w-full h-[20%] border border-black shadow-2xl overflow-hidden rounded-md p-2 product-hero-image"
            >
              {mainImage && (
                <Image
                  src={mainImage}
                  alt="product-image"
                  className="object-contain w-full h-full"
                  width={300}
                  height={300}
                />
              )}
            </div>
            <div id="product-details">
              <div className="flex justify-between mb-4">
                <div className="flex flex-col">
                  <h1 className="capitalize font-bold text-2xl">
                    {product?.name}
                  </h1>
                  <h2 className="capitalize font-semibold text-lg">
                    ₦{formatNumberWithCommas(product?.price)}
                  </h2>
                </div>
                <div className="flex items-center relative bottom-0 ">
                  <Link href="/main/home">
                    <button className="font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative float-right self">
                      Home
                    </button>
                  </Link>
                </div>
              </div>
              <div id="item-gallery" className="flex flex-col gap-1 mb-3">
                <h1 className="text-lg capitalize font-bold">gallery</h1>
                <div className="flex gap-4 overflow-x-auto p-1 items-center hide-scrollbar">
                  {product?.imageGalleryImages?.map((image, index) => (
                    <GalleryImage
                      imageUrl={image.imageURL}
                      index={index}
                      selectGalleryImage={selectGalleryImage}
                      selected={index === selectedImageIndex}
                    />
                  ))}


                </div>
              </div>
              <p className="text-gray-700 text-lg indent-12  margin-0 ">
                {product?.description}
              </p>
            </div>
            
            <div>
                <Link href={`${product?.link}`} className=' capitalize font-semibold text-xl underline underline-offset-1' >
                            <button className='font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative '>find out more </button>
                </Link>
            </div>
            {firebaseUserInfo?.accountVerified && (<Reviews productId={productId} reviews={product?.reviews} collectionString ={'Products'}/>)}
          </div>
          {product?.qty !== 0 || firebaseUserInfo?.accountVerified && (<AddToCartBtn productID={productId} qty={product?.qty} price={product?.price} collectionString={"Products"} />)}
        </div>
      </>
    );
}




