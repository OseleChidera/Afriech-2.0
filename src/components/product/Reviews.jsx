import React, { useState } from 'react'
import { generateRandomUserId, getCurrentDateTime , addReview } from '../../utils/helperFunctions'
import { useSelector, useDispatch } from "react-redux";
import Review from './Review';

export default function Reviews({ reviews, productId, collectionString }) {
  const [review, setReview] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const userID = useSelector((state) => state.user.userID);

  // console.log(userID)

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
      addReview(userID, productId, review, setReview, collectionString)
    }




  return (
    <div className=" flex flex-col items-center gap-6 mb-[120px]">
      <div className=" w-[90%]">
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
              
              maxLength={100}
              className="p-2  border border-black rounded-xl w-full text-sm"
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
      <div id="existingReviews" className='border  border-black flex flex-col gap-4 w-full'>
        {
          reviews?.map((review) => <Review date={review?.date} review={review?.review} userID={review?.userId} reviewID={review?.reviewId} productId={productId} collectionString={collectionString}/> )
        }
      </div>
      {(reviews?.length == 0 && reviews[0] == "" | " ") ? (<h2 className='text-sm  text-center'>No reviews for this product fo far</h2>) : (<h2 className='text-sm  text-center'>{reviews?.length} reviews of this product fo far</h2>)}
    </div>
  );
}
