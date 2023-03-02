import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkDeleteItem, thunkMyCart } from "../../store/cart"
import EditQuantity from "../ShoppingCartUpdate"
import './ShoppingCartCard.css'

export default function CartCard({ item }) {
    const history = useHistory()
    const dispatch = useDispatch()


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
                    <div id="item-name">{item?.product.name}</div>
                    <div>{item?.product.description}</div>
                    <div>Quantity: {item?.quantity}</div>
                    <EditQuantity item={item} />
                    <div id="delete-button" onClick={handleDelete}>Remove</div>
                </div>
            </div>
        </>
    )
}
