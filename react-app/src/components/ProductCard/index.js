import { thunkDeleteProduct, thunkMyproducts, thunkAllproducts, thunkEditProduct } from "../../store/product"
import ProductEditFormPage from "../ProductEditForm"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

export default function ProductCard({product}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id))
        dispatch(thunkMyproducts())
        dispatch(thunkAllproducts())
    }

return(
    <>
        <div>{product?.name}</div>
        <div>
            <img src={product?.image} />
        </div>
        <div>{product?.seller_id == user.id? (
        <div>
            <div onClick={handleDelete}>delete</div>
            <Link to={`products/${product.id}/edit`}>Edit</Link>
        </div>
        ): null}</div>
    </>
)
}
