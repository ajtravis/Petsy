const ALL_PRODUCTS = '/products/ALL_PRODUCTS'

const allProducts = (products) => ({
	type: ALL_PRODUCTS,
	products,
});

export const thunkAllproducts = () => async (dispatch) => {
	const response = await fetch('/api/products/all', {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response)
	if (response.ok) {
		const data = await response.json();
		dispatch(allProducts(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

const initialState = {}
export default function productsReducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case ALL_PRODUCTS:
			let all = action.products
			// console.log(all)
			for (let p of all.products) newState[p.id] = p
			return newState;
        default:
            return state;
    }
}
