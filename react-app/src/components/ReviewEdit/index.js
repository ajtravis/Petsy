import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditReview, thunkProductReviews } from "../../store/review";



export default function EditReviewForm({ myReview }) {
    const [review, setReview] = useState(myReview?.review)
    const [rating, setRating] = useState(myReview?.rating)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.oneProduct)
    const { closeModal } = useModal();




    const handleSubmit = async (e) => {
        e.preventDefault();
            const data = await dispatch(thunkEditReview({review, rating}, myReview?.id));
            if (data) {
              setErrors(data)
            } else {
                dispatch(thunkProductReviews(product?.id))
                closeModal();
            }

      };

    return(
        <div>
            <form id="editReviewForm" onSubmit={handleSubmit}>
                <label>
                    Rating
                    <input
                        type="number"
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Review
                    <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
