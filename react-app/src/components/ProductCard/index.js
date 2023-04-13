import { thunkDeleteProduct, thunkMyproducts, thunkAllproducts, thunkOneProduct, resetProd } from "../../store/product"
import { thunkMyCart, thunkDeleteItem } from "../../store/cart"
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
    // const cart_items = useSelector(state => state.cart?.items)
    // const cartList = Object.values(cart_items)
    // let item = null
    // cartList?.forEach(i => {
    //     if(i.product_id === product.id){
    //         item = i
    //     }
    // })

    const handleDelete = () => {
        dispatch(thunkDeleteProduct(product.id))
            .then(() => dispatch(thunkAllproducts()))
            .then(() => dispatch(thunkMyproducts()))
            // .then(() => item ? dispatch(thunkDeleteItem(item.id)) : null)
            .then(() => dispatch(thunkMyCart()))
        // window.alert("Product has been removed!")
    }

    const handleEdit = () => {
        dispatch(thunkOneProduct(product.id))
        history.push(`products/${product.id}/edit`)
    }

    const handleClick = async () => {
        await dispatch(resetProd())
        await history.push(`products/${product.id}`)
    }
    return (
        <>
            <div className="card" onClick={handleClick}>
                <div className='card-image' >
                    <img src={product?.image} />
                </div>
                <div className="card-header">
                    <div className="prod-head">{product?.name}</div>
                    <div className="prod-head">${product?.price}</div>
                </div>
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

        </>
    )
}
