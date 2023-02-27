import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyCart, thunkDeleteItem } from '../../store/cart';
import CartCard from '../ShoppingCartCard';




export default function MyCart(){
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)
    const order = useSelector(state => state.cart.order)
    const cartItemsL= Object.values(cartItems)

    useEffect(() => {
        dispatch(thunkMyCart());
    }, [dispatch]);


return (
   <div>
    <h2>Your Cart:</h2>
    <div>Total: {Math.floor(order?.amount * 100) / 100}</div>
    {cartItemsL? cartItemsL?.map(item =>
        <div>
            <CartCard item={item} />
        </div>
        ) :
        <div>Your cart is empty.</div>}
   </div>
)
}
