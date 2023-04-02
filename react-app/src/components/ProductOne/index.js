import { useEffect } from 'react';
import ReactStars from 'react-stars';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkOneProduct } from '../../store/product';
import { thunkAddCart, thunkMyCart } from '../../store/cart';
import { thunkProductReviews, thunkDeleteReview } from '../../store/review';
import ReviewForm from '../ReviewForm';
import EditReviewForm from '../ReviewEdit';
import OpenModalButton from "../OpenModalButton";
import ReviewCard from '../ReviewCard';
import '../../CSS/oneProduct.css'



export default function OneProduct() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkOneProduct(id));
        dispatch(thunkProductReviews(id))
    }, [dispatch]);

    const oneProduct = useSelector(state => state.products.oneProduct)
    const reviewsObject = useSelector(state => state.reviews.productReviews)
    const reviews = Object.values(reviewsObject)
    const avg = Math.round(oneProduct?.avg * 100)/100
    const starAvg = Math.round(oneProduct?.avg * 2)/2

    const addToCart = () => {
        if (!user) {
            window.alert("Please log in first")
        }
        else {
            dispatch(thunkMyCart())
            dispatch(thunkAddCart(oneProduct?.id))
            dispatch(thunkMyCart())
            window.alert(`${oneProduct.name} was added to your cart!`)
        }
    }

    // const deleteReview = (revId) => {
    //     dispatch(thunkDeleteReview(revId))
    //     .then(() => dispatch(thunkProductReviews(id)))
    // }

    return (
        <div>
            {oneProduct ?
                <div>
                    <div className='product-page'>
                        <div className='column-left'>
                            <img id='image' src={oneProduct.image} />
                        </div>
                        <div className='column-right'>
                            <div id='price'>${oneProduct.price}</div>
                            <div id='desc'>{oneProduct.description}</div>
                            {/* <div className='bu'>Buy it now</div> */}
                            <div className='bu cart' onClick={addToCart}>Add to cart</div>
                        </div>
                    </div>
                    <div className='reviews-container'>
                        <div className='review-top'>
                        <div className='review-header'>{reviews?.length} reviews </div>
                        <div className='review-info'>
                            <div className='avg-rating'>{'('}{avg}{')'}</div>
                            <ReactStars
                            value={starAvg}
                            size={25}
                            edit={false}
                            color1={"white"}
                            color2={"black"}
                            />
                        </div>
                        <OpenModalButton
                            location="review-button"
                            buttonText="write a review"
                            modalComponent={<ReviewForm />}
                        />
                        </div>

                        {reviews?.map(review =>
                            <>
                                <ReviewCard review={review} />
                            </>
                        )
                        }
                        
                    </div>
                </div>
                :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Oops! Something Went Wrong!</h1>
                </div>
            }
        </div>
    )
}
