import { useState } from "react"

export default function ReviewForm() {
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(1)

    return(
        <div>
            <form>
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
            </form>
        </div>
    )
}
