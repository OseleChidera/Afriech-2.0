'use client'
import React from 'react'
import Nav from '@/components/Nav'
import Product from '@/components/product/Product'
import SearchBar from '@/components/searchbar/SearchBar'
import { useSelector, useDispatch } from "react-redux";
import BrandOptions from '@/components/brandOptions/BrandOptions'


const page = () => {
    const productsData = useSelector((state) => state.user.productsData);
    // console.table(productsData)
    return (
        <div className='w-full relative min-h-screen max-h-fit border border-red-600 overflow-y-auto'>
         <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
            <SearchBar />
            <BrandOptions/>
                <div className="grid-container ">
                    {
                        productsData?.map((product) => (<Product name={product.name} price={product.price} id={product.id} image={product?.imageGalleryImages[0].imageURL} collectionString={product.collectionString} productObj={product}/>)) 
                    }
                </div>
         </div>
            <Nav />
        </div>
    )
}

export default page

