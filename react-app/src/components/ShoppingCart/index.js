import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyCart, thunkDeleteItem, thunkCheckout } from '../../store/cart';
import CartCard from '../ShoppingCartCard';
import './ShoppingCart.css'



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
   <div className='cart-page'>
    {cartItemsL?.length === 1 ?  <div className='cart-head'>{cartItemsL?.length} item in your cart</div>
    : <div className='cart-head'>{cartItemsL?.length} items in your cart</div>}
    <div>Total: ${total}</div>
    {cartItemsL.length? cartItemsL?.map(item =>
        <div className='card-div'>
            <CartCard item={item} />
        </div>
        ) :
        <div>Your cart is empty.</div>}
    {cartItemsL.length?
    <div id='checkout-button' onClick={handleCheckout}>Checkout</div> : null}
   </div>

)
}
