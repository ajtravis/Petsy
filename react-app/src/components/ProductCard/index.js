import { thunkDeleteProduct, thunkMyproducts, thunkAllproducts, thunkOneProduct } from "../../store/product"
import ProductEditFormPage from "../ProductEditForm"
import OpenModalButton from "../OpenModalButton"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import '../../CSS/productCard.css'

export default function ProductCard({product, location}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id))
        dispatch(thunkMyproducts())
        dispatch(thunkAllproducts())
    }

    const handleEdit = () => {
        dispatch(thunkOneProduct(product.id))
        history.push(`products/${product.id}/edit`)
    }

    const handleClick = () => {
        history.push(`products/${product.id}`)
    }
return(
    <>
        <div className="card" onClick={handleClick}>
            <img src={product?.image} />
        </div>
        <div>{product?.name}</div>
        <div>${product.price}</div>
        <div>{(product?.seller_id == user.id) && location !== 'home-page'? (
        <div>
            <div onClick={handleDelete}>delete</div>
            <div>
                <OpenModalButton
                buttonText="Edit"
                modalComponent={<ProductEditFormPage product={product} />}
                />
            </div>
        </div>
        ): null}</div>
    </>
)
}
