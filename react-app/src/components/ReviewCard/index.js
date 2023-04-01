import { useSelector, useDispatch } from "react-redux";
import { thunkProductReviews, thunkDeleteReview } from '../../store/review';
import EditReviewForm from '../ReviewEdit';
import OpenModalButton from "../OpenModalButton";
import { useParams } from "react-router-dom";
import './ReviewCard.css'

export default function ReviewCard({ review }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)

    const deleteReview = (revId) => {
        dispatch(thunkDeleteReview(revId))
        .then(() => dispatch(thunkProductReviews(id)))
    }

    return(
        <div className="reviewCard">
            <div className="review">{review.review}</div>
            <div>
                {user.id == review.user_id ?
                    <div className="user-tools">
                        <OpenModalButton
                            buttonText="Edit"
                            modalComponent={<EditReviewForm myReview={review} />}
                        />
                        <div onClick={() => deleteReview(review.id)}>Delete</div>
                    </div> : null}
            </div>
        </div>
    )
}
