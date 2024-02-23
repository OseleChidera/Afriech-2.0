import React,{Suspense, useState} from 'react'
import PopularProduct from '../product/PopularProduct'
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import ProductLoadingSleleton from '../loading skeleton/ProductLoadingSleleton';




const PopularItems = () => {
  const PopularProducts = useSelector((state) => state.user.PopularProducts);
  const data = useSelector((state) => state.user.data);
  const pathName = usePathname();
  const [isPathNameActive, setIsPathNameActive] = useState(pathName.includes(`/popularproduct/`))





  return (
    
      <div className="w-full p-4 shadow-md">
        <div className="flex w-full justify-between mb-2">
          <h2 className="capitalize text-[#695acde4] text-lg">shop items</h2>
        <Link href={`/main/marketplace`}><button className="capitalize border-none   bg-[#695acde4] text-white rounded-lg text - xl  px-3 py-1">see all</button></Link>
        </div>
      <div className="grid-container">
       
        {
          data?.popularProductsArray ? 
          ( data?.popularProductsArray?.map((product) => (
              <PopularProduct name={product.name} price={product.price} id={product.id} image={product?.imageGalleryImages[Math.floor(Math.random() * 6)].imageURL} collectionString={product.collectionString} productObj={product} />
          ))) 
          : 
          ([...new Array(10)].map((product) => (<ProductLoadingSleleton />)))
        }
        </div>
      </div>
  );
}
export default PopularItems