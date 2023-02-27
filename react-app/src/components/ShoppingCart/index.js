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
    let total = order?.amount

    if (total < 0 || total == 0.01) total = 0;

    useEffect(() => {
        dispatch(thunkMyCart());
    }, [dispatch]);


return (
   <div>
    <h2>Your Cart:</h2>
    <div>Total: ${total}</div>
    {cartItemsL? cartItemsL?.map(item =>
        <div>
            <CartCard item={item} />
        </div>
        ) :
        <div>Your cart is empty.</div>}
   </div>
)
}
