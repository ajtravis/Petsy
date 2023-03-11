import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkDeleteItem, thunkMyCart } from "../../store/cart"
import EditQuantity from "../ShoppingCartUpdate"
import './ShoppingCartCard.css'

export default function CartCard({ item }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const itemTotal = Math.round(item?.product.price * item?.quantity * 100) / 100

    const handleDelete = () => {
        dispatch(thunkDeleteItem(item?.id))
            .then(() => dispatch(thunkMyCart()))
    }


    // const handleClick = () => {
    //     history.push(`products/${product.id}`)
    // }
    return (
        <>
            <div className="cart-card">
                <img src={item?.product.image} />

                <div className="item-details">
                    <div id="item-name">{item?.product.name} x {item?.quantity}</div>
                    <div className="descrip">{item?.product.description}</div>
                    <EditQuantity item={item} />
                    <div id="delete-button" onClick={handleDelete}>Remove</div>
                </div>
                <div className="card-right">
                    <div >${itemTotal}</div>
                </div>


            </div>
        </>
    )
}
