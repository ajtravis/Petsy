import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkMyproducts, thunkSetCategory } from "../../store/product";


export default function AddCategory(props) {
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const [product, setProduct] = useState(props.product)
    const allCats = useSelector(state => state.categories.all)
    const catList = Object.values(allCats)
    const selection = catList?.filter(cat => !product.category_ids.includes(cat.id))
    const [cat, setCat] = useState(null)
    const { closeModal } = useModal();



    const handleClick = async (e) => {
            e.preventDefault()
            // if(cat === null) throw new Error("You must select a category first")
            const data = await dispatch(thunkSetCategory(product?.id, cat))
            dispatch(thunkMyproducts())

      };



      return catList && (
        <form>
            <select
                    defaultValue={null}
                    onChange={(e) => setCat(e.target.value)}
                    required
            >
                <option value={null}>
                    none
                </option>
                {selection?.map(cat =>
                    <option value={cat.id}>
                        {cat.category}
                    </option>)}
            </select>
            <button onClick={handleClick} >add</button>
        </form>
    )
}
