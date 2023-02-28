const MY_CART = '/MY_CART'
const ADD_ITEM = '/ADD_ITEM'
const REMOVE_ITEM = '/REMOVE_ITEM'
const UPDATE_QUANTITY = '/UPDATE_QUANTITY'

const myCart = (cart) => ({
	type: MY_CART,
	cart,
});

const addCart = (item) => ({
	type: ADD_ITEM,
	item
})

const removeItem = (id) => ({
	type: REMOVE_ITEM,
	id,
})

const updateItem = (item) => ({
	type: UPDATE_QUANTITY,
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

export const thunkDeleteItem = (id) => async (dispatch) => {
	const response = await fetch(`/api/cart/delete/${id}/`, {
		method: 'DELETE',
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		console.log(data, '!!just came from backend')
		dispatch(removeItem(id));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}
export const thunkEditItem = (form, id) => async (dispatch) => {
	console.log("form", form)
	const response = await fetch(`/api/cart/update/${id}/`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		console.log(data, '!!just came from backend')
		dispatch(addCart(data));
		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

const initialState = {order: {}, items: {}}
export default function cartReducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case MY_CART:
			let cart = action.cart
			let items = cart.cart_items
			newState.order = cart.order
			items.forEach(item => {
				newState.items[item.id] = item
			});
			return newState;
		case ADD_ITEM:
			let item = action.item
			newState.items[item.id] = item
			return newState;
		case REMOVE_ITEM:
			delete newState.items[action.id]
			return newState
        default:
            return state;
    }
}
