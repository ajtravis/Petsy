const ALL_PRODUCTS = '/products/ALL_PRODUCTS'
const ONE_PRODUCT = '/products/ONE_PRODUCT'
const RESET_ONE = '/products/RESET_ONE'
const MY_PRODUCTS = '/products/MY_PRODUCTS'
const ADD_PRODUCT = '/products/ADD_PRODUCT'
const REMOVE_PRODUCT = '/products/REMOVE_PRODUCT'
const SET_CAT = '/products/CAT_PRODUCTS'
const REMOVE_CAT = '/products/CAT_PRODUCTS'

const allProducts = (products) => ({
	type: ALL_PRODUCTS,
	products,
});

const setCat = (product) => ({
	type: SET_CAT,
	product,
});

const oneProduct = (product) => ({
	type: ONE_PRODUCT,
	product,
});

export const resetProd = () => ({
	type: RESET_ONE
})

const myProducts = (products) => ({
	type: MY_PRODUCTS,
	products,
});

const addProduct = (product) => ({
	type: ADD_PRODUCT,
	product,
})

const removeProduct = (id) => ({
	type: REMOVE_PRODUCT,
	id,
})

const removeCat = (product) => ({
	type: REMOVE_CAT,
	product
})

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


export const thunkOneProduct = (id) => async (dispatch) => {
	const response = await fetch(`/api/products/${id}`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(oneProduct(data));
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

export const thunkMyproducts = () => async (dispatch) => {
	const response = await fetch('/api/products/my_products', {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response)
	if (response.ok) {
		const data = await response.json();
		dispatch(myProducts(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkCreateProduct = (form) => async (dispatch) => {
	console.log("store data", form)
	const response = await fetch('/api/products/new', {
		method: "POST",
		// headers: { "Content-Type": "application/json" },
		// headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
		// body: JSON.stringify(form)
		body: form

	})
	console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addProduct(data));
		return data
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkDeleteProduct = (id) => async (dispatch) => {
	const response = await fetch(`/api/products/${id}/`, {
		method: 'DELETE',
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		// console.log('%$%!$#%!$#%!$#%!$#%!$#%!$#%', data)
		dispatch(removeProduct(id));

		return null
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkEditProduct = (form, id) => async (dispatch) => {
	// console.log(form)
	const response = await fetch(`/api/products/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(form)
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(addProduct(data));
		return data
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data, 'ERROR STUFF')
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkSetCategory = (id, catId) => async (dispatch) => {
	const response = await fetch(`/api/products/${id}/categories/${catId}`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(setCat(data));
		return data
		// return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkRemoveCategory = (id, catId) => async (dispatch) => {
	const response = await fetch(`/api/products/${id}/categories/${catId}/remove`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response, 'this is respond from backend')
	if (response.ok) {
		const data = await response.json();
		// console.log(data, '!!just came from backend')
		dispatch(removeCat(data));
		return data
		// return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		// console.log(data)
		if (data.errors) return data.errors;
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
		case ONE_PRODUCT:
			let one = action.product
			// console.log(one, 'this is the reducer')
			newState.oneProduct = one
			return newState
		case MY_PRODUCTS:
			let my = action.products.my_products
			// console.log(all)
			newState["myProducts"] = my
			return newState;
		case ADD_PRODUCT:
			let add = action.product
			// console.log(add, 'this is the reducer')
			newState[add.id] = add
		case REMOVE_PRODUCT:
			delete newState[action.id]
			// delete newState.myProducts
			return newState
		case RESET_ONE:
			delete newState.oneProduct
			return newState
		case REMOVE_CAT:
			const prod = action.product
			newState[prod.id] = prod
			if(newState.myProducts) {newState.myProducts[prod.id] = prod}
			return newState
		case SET_CAT:
			const p = action.product
			newState[p.id] = p
			if(newState.myProducts) {newState.myProducts[p.id] = p}
			return newState
        default:
            return state;
    }
}
