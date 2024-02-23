import React from 'react';
import OrderPaymentComponentSkeleton from '../loading skeleton/OrderPaymentComponentSkeleton';
import PaymentCompleteComponent from './PaymentCompleteComponent';
import UnauthorizedAccess from '../UnauthorizedAccess/UnauthorizedAccess';
import { useSelector } from "react-redux";

export default function PendingPayment() {
    const data = useSelector((state) => state.user.data);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);

    return (
        <div>
            {data?.paymentArray ? (
                firebaseUserInfo?.accountVerified ? (
                    data?.paymentArray.length !== 0 ? (
                        <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                            {data?.paymentCompleteArray?.map(item => (
                                <PaymentCompleteComponent
                                    key={item.orderId}
                                    orderID={item.orderId}
                                    productsArray={item.orderProducts}
                                    financingTotal={item.financingTotal}
                                    leftToPay={item.leftToPay}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-black h-[50vh] w-full text-xl text-[#695acd] flex items-center justify-center">
                            <div className="h1">No Items To Display</div>
                        </div>
                    )
                ) : (
                    <UnauthorizedAccess />
                )
            ) : (
                <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                    {[...new Array(5)].map((item, index) => (
                        <OrderPaymentComponentSkeleton key={index} />
                    ))}
                </div>
            )}
        </div>
    );
}
