import React, { useState } from 'react';
import CartItemProductComponent from './CartItemProductComponent';

const CartItemCheckout = ({ id, selectCartItems }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleRadioChange = () => {
        setIsSelected(!isSelected);
        // Call a function here to handle the ID retrieval when the radio button is selected
        if (!isSelected) {
            handleSelectedId(id);
        } else {
            handleSelectedId(null);
        }
    };

    const handleSelectedId = (selectedId) => {
        // Implement logic to handle the selected ID
        console.log('Selected ID:', selectedId);
    };

    return (
        <div className={`flex gap-4 flex-1 border border-black `}>
            {selectCartItems && (
                <input
                    type="checkbox"
                    id={id}
                    onChange={handleRadioChange}
                    checked={isSelected}
                />
            )}
            <label htmlFor={id} className='flex-auto'>
                <CartItemProductComponent />
            </label>
        </div>
    );
};

export default CartItemCheckout;
