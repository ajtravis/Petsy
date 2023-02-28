import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyCart, thunkDeleteItem, thunkCheckout } from '../../store/cart';
import CartCard from '../ShoppingCartCard';




export default function MyCart(){
    const dispatch = useDispatch()
    const history = useHistory()
    const cartItems = useSelector(state => state.cart.items)
    const order = useSelector(state => state.cart.order)
    const cartItemsL= Object.values(cartItems)
    let total = Math.round(order?.amount * 100) / 100

    useEffect(() => {
        dispatch(thunkMyCart());
    }, [dispatch]);

    const handleCheckout = () => {
        dispatch(thunkCheckout())
        .then(() => history.push('/'))
        .then(() => window.alert("Thank you for shopping with us!"))
        .then(() => dispatch(thunkMyCart()))
    }

return (
   <div>
    <h2>Your Cart:</h2>
    <div>Total: ${total}</div>
    {cartItemsL.length? cartItemsL?.map(item =>
        <div>
            <CartCard item={item} />
        </div>
        ) :
        <div>Your cart is empty.</div>}
    {cartItemsL.length?
    <button onClick={handleCheckout}>Checkout</button> : null}
   </div>

)
}
