import React, { useState } from "react";
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview, thunkProductReviews } from "../../store/review";
import { thunkOneProduct } from "../../store/product";


export default function ReviewForm() {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(1)
    const [errors, setErrors] = useState([])
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
                dispatch(thunkOneProduct(product?.id))
                closeModal();
            }
      };

    const changeStars = (val) => {
        setRating(val)
    }

    return(
        <div>

            <form className="revForm" onSubmit={handleSubmit}>
                <h4>write a review</h4>
                <ReactStars
                    count={5}
                    size={30}
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

                <button type="submit">Create Review</button>
            </form>
        </div>
    )
}
