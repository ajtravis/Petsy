const PRODUCT_REVIEWS = '/PRODUCT_REVIEWS'
const POST_REVIEW = '/POST_REVIEW'
const DELETE_REVIEW = '/DELETE_REVIEW'

const prodReviews = (reviews) => ({
	type: PRODUCT_REVIEWS,
	reviews,
});

const addReview = (review) => ({
	type: POST_REVIEW,
	review
})

const removeReview = (id) => ({
	type: DELETE_REVIEW,
	id
})

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

export const thunkCreateReview = (form, id) => async (dispatch) => {
	// console.log(form)
	const response = await fetch(`/api/products/${id}/reviews`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addReview(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkEditReview = (form, id) => async (dispatch) => {
	// console.log(form)
	const response = await fetch(`/api/reviews/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addReview(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkDeleteReview = (id) => async (dispatch) => {
	const response = await fetch(`/api/reviews/delete/${id}/`, {
		method: 'DELETE',
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		dispatch(removeReview(id));
		return null
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
			let reviews = action.reviews.reviews
			newState.productReviews = {}
			reviews.forEach(review => {
				newState.productReviews[review.id] = review
			});
			return newState;
		case POST_REVIEW:
			let review = action.review
			newState.productReviews[review.id] = review
			return newState
		case DELETE_REVIEW:
			delete newState.productReviews[action.id]
			return newState
        default:
            return state;
    }
}
