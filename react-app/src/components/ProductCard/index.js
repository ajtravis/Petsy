import { thunkDeleteProduct, thunkMyproducts, thunkAllproducts, thunkOneProduct } from "../../store/product"
import ProductEditFormPage from "../ProductEditForm"
import OpenModalButton from "../OpenModalButton"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import '../../CSS/productCard.css'

export default function ProductCard({ product, location }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id))
        dispatch(thunkMyproducts())
        dispatch(thunkAllproducts())
        window.alert("Product has been removed!")
    }

    const handleEdit = () => {
        dispatch(thunkOneProduct(product.id))
        history.push(`products/${product.id}/edit`)
    }

    const handleClick = () => {
        history.push(`products/${product.id}`)
    }
    return (
        <>
            <div className="card" onClick={handleClick}>
                <img src={product?.image} />

            <div className="card-header">
                <div className="prod-head">{product?.name}</div>
                <div className="prod-head">${product?.price}</div>
            </div>
            <div>{(product?.seller_id == user?.id) && location !== 'home-page' ? (
                <div className="owner-buttons">
                    <div className="delete-button" onClick={handleDelete}>delete</div>
                    <div>
                        <OpenModalButton
                            buttonText="edit"
                            modalComponent={<ProductEditFormPage product={product} />}
                        />
                    </div>
                </div>
            ) : null}</div>
            </div>
        </>
    )
}
