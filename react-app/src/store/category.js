const ALL_CATS = '/categories/ALL_CATS'
const SET_CAT = '/categories/SET_CAT'
const RESET_CAT = '/categories/RESET_CAT'

const allCategories = (categories) => ({
	type: ALL_CATS,
	categories,
});

export const setCat = (category) => ({
	type: SET_CAT,
	category,
});

export const resetCat = () => ({
	type: RESET_CAT
});


export const thunkAllCategories = () => async (dispatch) => {
	const response = await fetch('/api/categories/all', {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response)
	if (response.ok) {
		const data = await response.json();
		dispatch(allCategories(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

export const thunkSelectCategory = (id) => async (dispatch) => {
	const response = await fetch(`/api/categories/${id}`, {
		headers: { "Content-Type": "application/json" },
	})
	// console.log(response)
	if (response.ok) {
		const data = await response.json();
		dispatch(setCat(data));
		return response
	}
	else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) return data;
	}
	else return { errors: ["An error occurred. Please try again."] }
}

const initialState = {all: {}, selected: {}}
export default function categoryReducer(state = initialState, action) {
	let newState = { ...state }
	switch (action.type) {
		case ALL_CATS:
			let cats = action.categories.categories
			cats.forEach(c => {
				// newState.categories[c.id] = c
				newState.all[c.id] = c
			})
			return newState
        case SET_CAT:
            newState.selected = action.category.selected
            return newState
        case RESET_CAT:
            delete newState.selected
            return newState
        default:
            return state;
    }
}
