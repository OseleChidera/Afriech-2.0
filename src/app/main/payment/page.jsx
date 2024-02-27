'use client'
import Nav from '@/components/Nav'
import UnauthorizedAccess from '@/components/UnauthorizedAccess/UnauthorizedAccess';
import OrderPaymentComponent from '@/components/payment/OrderPaymentComponent';
import React , {useEffect, useState} from 'react'
import { usePaystackPayment } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";
import OrderPaymentComponentSkeleton from '@/components/loading skeleton/OrderPaymentComponentSkeleton';
import PendingPayment from '@/components/payment/PendingPayment';
import PaymentComplete from '@/components/payment/PaymentComplete';



export default function page() {
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const userFinancingData = useSelector((state) => state.user.userFinancingData);
  const data = useSelector((state) => state.user.data);
  const [buttonsState , setButtonsState] = useState(0);
  const [filteredArray , setFilteredArray] = useState([]);

  useEffect(()=>{
    // console.log("data?.userData" + JSON.stringify(data?.userData?.paymentCompleted,null , 2))
const filtered = data?.userData?.financing.filter((arrayItem)=> typeof arrayItem == "object");
setFilteredArray(filtered)
  }, [data?.userData])

  return (
    <>
      <div className="pt-8">
        <div className=" w-full flex flex-row justify-between p-[20px] gap-4 pb-0">
          <button
            className={`relative  w-full p-2 rounded-lg rounded-br-none rounded-bl-none  ${
              buttonsState == 0
                ? " text-[#695acd] bg-white border border-[#695acd] border-b-0"
                : " text-white bg-[#695acd] border-none"
            }`}
            onClick={() => setButtonsState(0)}
          >
            Pending Payment(s)
          </button>
          <button
            className={`relative  w-full p-2 rounded-lg rounded-br-none rounded-bl-none  ${
              buttonsState == 1
                ? " text-[#695acd] bg-white border border-[#695acd] border-b-0"
                : " text-white bg-[#695acd] border-none"
            }`}
            onClick={() => setButtonsState(1)}
          >
            Completed Payment(s)
          </button>
        </div>

        {(data?.userData?.financing || data?.userData?.paymentCompleted) ? 
        ((buttonsState == 0 ) ? (<PendingPayment />) : (<PaymentComplete />)) : 
        (<div className="p-[20px] flex flex-col gap-4 pb-[120px]">
            {[...new Array(5)].map((item, index) => (
              <OrderPaymentComponentSkeleton key={index} />
            ))}
          </div>
        )}
        {firebaseUserInfo?.accountVerified && <Nav />}
      </div>
    </>
  );
}











