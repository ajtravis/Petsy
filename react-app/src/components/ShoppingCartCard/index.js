import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkDeleteItem, thunkMyCart } from "../../store/cart"


export default function CartCard({item}) {
    const history = useHistory()
    const dispatch = useDispatch()


    const handleDelete = () => {
        dispatch(thunkDeleteItem(item?.id))
        .then(() => dispatch(thunkMyCart()))
    }


    // const handleClick = () => {
    //     history.push(`products/${product.id}`)
    // }
return(
    <>
        <div className="cart-card">
            <img src={item?.product.image} />
        </div>
        <div>{item?.product.name}</div>
        <div onClick={handleDelete}>Remove from cart</div>
    </>
)
}
