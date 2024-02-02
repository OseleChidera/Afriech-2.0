import React, { useState } from 'react'
import { generateRandomUserId, getCurrentDateTime , addReview } from '../../utils/helperFunctions'
import { useSelector, useDispatch } from "react-redux";

export default function Reviews({reviews , productId}) {
  const [review, setReview] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const userID = useSelector((state) => state.user.userID);

  console.log(userID)

  const handleTextareaFocus = () => {
    setIsFocused(true);
  };

  const handleTextareaBlur = () => {
    setIsFocused(false);
  };

    function checkReview(review){
      if (!review || isFocused){
      return;
    }
      addReview(userID, productId, review, setReview)
    }




  return (
    <div className="border border-black">
      <div className="border border-black">
        <h1 className="capitalize font-bold text-2xl text-center mb-4">
          Product reviews
        </h1>
        <div id="review-input" className="flex flex-col gap-3">
          <div className="flex flex-col">
            <textarea
              name="product review"
              id=""
              cols="30"
              rows="4"
              maxLength={200}
              className="p-2 border border-black rounded-xl w-full text-sm"
              placeholder="Enter your review of this product"
              value={review}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            {isFocused && (<span className="text-red-600 text-xs hidden">
              Review cannot be empty
            </span>)}
          </div>
          <button
            onClick={() => checkReview(review)}
            className="font-bold bg-[#695acd] text-white rounded-xl text-xl capitalize px-4 py-[0.55rem] relative"
          >
            Upload review
          </button>
        </div>
      </div>
      <div id="existingReviews" className='border  border-black'>
        {
          reviews?.map((review) => <span>review</span>)
        }
      </div>
      <span className='text-xs'>{reviews?.length} reviews of this product fo far</span>
    </div>
  );
}