import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { thunkCatProducts } from "../../store/product";
import { thunkSelectCategory, resetCat } from "../../store/category";

export default function CatDropdown({categories}){
    const [catId, setCatId] = useState(null)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const allCats = useSelector(state => state.categories.all)
    const catList = Object.values(allCats)

    const handleSubmit = async (e) => {
        // e.preventDefault();
        const data = await dispatch(thunkSelectCategory(catId));
        if (data) {
          setErrors(data);
        }
      };

      useEffect(() => {
        if (catId === null){
            dispatch(resetCat())
        } else return handleSubmit();
    }, [catId]);

     return catList && (
        <form onSubmit={handleSubmit}>
            <select
                    defaultValue={null}
                    onChange={(e) => setCatId(e.target.value)}
                    required
            >
                <option value={null}>
                    all
                </option>
                {categories?.map(cat =>
                    (cat.products.length ?
                    <option value={cat.id}>
                        {cat.category}
                    </option> : null))}

            </select>
        </form>
    )
}
