import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditReview, thunkProductReviews } from "../../store/review";
import ReactStars from 'react-stars'
import { thunkOneProduct } from "../../store/product";



export default function EditReviewForm({ myReview }) {
    const [review, setReview] = useState(myReview?.review)
    const [rating, setRating] = useState(myReview?.rating)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.oneProduct)
    const { closeModal } = useModal();

    const changeStars = (val) => {
        setRating(val)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
            const data = await dispatch(thunkEditReview({review, rating}, myReview?.id));
            if (data) {
              setErrors(data)
            } else {
                dispatch(thunkProductReviews(product?.id))
                dispatch(thunkOneProduct(product?.id))
                closeModal();
            }

      };

    return(
        <div>
            <form id="editReviewForm" className="revForm" onSubmit={handleSubmit}>
            <h4>edit review</h4>
                    <ReactStars
                    size={30}
                    count={5}
                    value={rating}
                    half={false}
                    onChange={(newValue) => changeStars(newValue)}
                    required
                    />
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
