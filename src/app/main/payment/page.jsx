'use client'
import Nav from '@/components/Nav'
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
        <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
          {
            userFinancingData?.map(item => <OrderPaymentComponent orderID={item.orderId} productsArray={item.orderProducts} financingTotal={item.financingTotal} leftToPay={item.leftToPay} />)
          }
        </div>
        <Nav />
      </div>
    </>
  )
}





