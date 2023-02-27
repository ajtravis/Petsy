const MY_CART = '/MY_CART'

const myCart = (cart) => ({
	type: MY_CART,
	cart,
});

export const thunkMyCart = () => async (dispatch) => {
	const response = await fetch('/api/cart/', {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response)
	if (response.ok) {
		const data = await response.json();
		dispatch(myCart(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

const initialState = {}
export default function cartReducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case MY_CART:
			let cart = action.cart
			// console.log(all)
			newState["order"] = cart.order
            newState["items"] = cart.cart_items
			return newState;
        default:
            return state;
    }
}
