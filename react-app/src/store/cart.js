const MY_CART = '/MY_CART'
const ADD_PRODUCT = '/ADD_PRODUCT'

const myCart = (cart) => ({
	type: MY_CART,
	cart,
});

const addCart = (item) => ({
	type: ADD_PRODUCT,
	item
})

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

export const thunkAddCart = (id) => async (dispatch) => {
	const response = await fetch(`/api/cart/add/${id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(id)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addCart(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
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
		case ADD_PRODUCT:
			let item = action.item
			let l = newState.items.length
			newState.items.push(item)
			return newState;
        default:
            return state;
    }
}
