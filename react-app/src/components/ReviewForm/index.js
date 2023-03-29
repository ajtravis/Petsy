import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview, thunkProductReviews } from "../../store/review";
import { useParams } from "react-router-dom";


export default function ReviewForm() {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(1)
    const [errors, setErrors] = useState("")
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.oneProduct)
    const { closeModal } = useModal();



    const handleSubmit = async (e) => {
        e.preventDefault();
            const data = await dispatch(thunkCreateReview({review, rating}, product?.id));
            if (data) {
              setErrors(data)
            } else {
                dispatch(thunkProductReviews(product?.id))
                closeModal();
            }

      };

    return(
        <div>
            <form onSubmit={handleSubmit}>
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
