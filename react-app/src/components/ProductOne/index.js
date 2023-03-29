import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkOneProduct } from '../../store/product';
import { thunkAddCart, thunkMyCart } from '../../store/cart';
import reviewReducer, { thunkProductReviews } from '../../store/review';
import ReviewForm from '../ReviewForm';
import OpenModalButton from "../OpenModalButton";
import '../../CSS/oneProduct.css'



export default function OneProduct(){
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

    const addToCart = () => {
        if(!user){
            window.alert("Please log in first")
        }
        else{
        dispatch(thunkMyCart())
        dispatch(thunkAddCart(oneProduct?.id))
        dispatch(thunkMyCart())
        window.alert(`${oneProduct.name} was added to your cart!`)
        }
    }

return (
    <div>
        { oneProduct?
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
            {reviews?.map(review =>
                <div>{review.review}</div>)
            }
             <OpenModalButton
              buttonText="Write a Review"
              modalComponent={<ReviewForm />}
            />
        </div>
             :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Oops! Something Went Wrong!</h1>
                </div>
            }
    </div>
)
}
