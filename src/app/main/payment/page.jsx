'use client'
import Nav from '@/components/Nav'
import UnauthorizedAccess from '@/components/UnauthorizedAccess/UnauthorizedAccess';
import OrderPaymentComponent from '@/components/payment/OrderPaymentComponent';
import React , {useState} from 'react'
import { usePaystackPayment } from 'react-paystack';
import { useSelector, useDispatch } from "react-redux";



export default function page() {
  const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
  const userFinancingData = useSelector((state) => state.user.userFinancingData);


  return (
    <>
      <div>
        {firebaseUserInfo?.accountVerified ? (<div className="p-[20px] flex flex-col gap-4 pb-[120px]">
          {
            userFinancingData?.map(item => <OrderPaymentComponent orderID={item.orderId} productsArray={item.orderProducts} financingTotal={item.financingTotal} leftToPay={item.leftToPay} />)
          }
        </div>) : <UnauthorizedAccess/>}
        {firebaseUserInfo?.accountVerified && (<Nav />)}
      </div>
    </>
  )
}





