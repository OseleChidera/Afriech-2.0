import React , {useState , useEffect} from 'react';
import OrderPaymentComponentSkeleton from '../loading skeleton/OrderPaymentComponentSkeleton';
import OrderPaymentComponent from './OrderPaymentComponent';
import UnauthorizedAccess from '../UnauthorizedAccess/UnauthorizedAccess';
import { useSelector } from "react-redux";

export default function PendingPayment() {
    const data = useSelector((state) => state.user.data);
    const firebaseUserInfo = useSelector((state) => state.user.firebaseUserInfo);
    const [arrayWithoutEmptyStrings, setArrayWithoutEmptyStrings] = useState([]);

    useEffect(()=>{
        setArrayWithoutEmptyStrings(data?.userData?.financing?.filter(arrayItem => typeof arrayItem == "object" && arrayItem !== null))
    }, [data?.userData?.financing])
    return (
        <div>
            
            <div className="">
                {firebaseUserInfo?.accountVerified ? (
                        arrayWithoutEmptyStrings?.length !== 0 ? (
                        <div className="p-[20px] flex flex-col gap-4 pb-[120px]">
                            {arrayWithoutEmptyStrings?.map(item => (
                                <OrderPaymentComponent
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
                        <div className="absolute top-0 left-0 w-full h-screen">
                            <UnauthorizedAccess />
                        </div>
                )
            }
            </div>
        </div>
    );
}
