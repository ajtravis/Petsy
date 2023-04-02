import { useSelector, useDispatch } from "react-redux";
import { thunkProductReviews, thunkDeleteReview } from '../../store/review';
import EditReviewForm from '../ReviewEdit';
import OpenModalButton from "../OpenModalButton";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import './ReviewCard.css'

export default function ReviewCard({ review }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.session.user)
    const time = review?.created_at
    const split = time.split(" ")
    split.splice(split.length - 2, 2)
    const date = split.join(" ")

    const deleteReview = (revId) => {
        dispatch(thunkDeleteReview(revId))
        .then(() => dispatch(thunkProductReviews(id)))
    }

    return(
        <div className="reviewCard">
            <div className="post-info">
                <div className="username">{review?.author.first_name} {review?.author.last_name}</div>
                <div className="date">{date}</div>
            </div>
             <ReactStars
                value={review.rating}
                size={25}
                edit={false}
                color1={"white"}
                color2={"black"}
            />
            <div className="review">{review.review}</div>

            <div>
                {user.id == review.user_id ?
                    <div className="user-tools">
                        <OpenModalButton
                            location="editReview"
                            buttonText="Edit"
                            modalComponent={<EditReviewForm myReview={review} />}
                        />
                        <div className="deleteReview" onClick={() => deleteReview(review.id)}>Delete</div>
                    </div> : null}
            </div>
        </div>
    )
}
