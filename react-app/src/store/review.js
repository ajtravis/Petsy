const PRODUCT_REVIEWS = '/PRODUCT_REVIEWS'

const prodReviews = (reviews) => ({
	type: PRODUCT_REVIEWS,
	reviews,
});

export const thunkProductReviews = (id) => async (dispatch) => {
	const response = await fetch(`/api/products/${id}/reviews`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(prodReviews(data));
		return null
		// return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

const initialState = {productReviews: {}}
export default function reviewReducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case PRODUCT_REVIEWS:
			let reviews = action.reviews
			reviews.forEach(review => {
				newState.productReviews[review.id] = review
			});
			return newState;
        default:
            return state;
    }
}
