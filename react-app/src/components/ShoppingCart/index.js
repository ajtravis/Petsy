import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyCart } from '../../store/cart';




export default function MyCart(){
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items)
    console.log("cart items: ", cartItems)

    useEffect(() => {
        dispatch(thunkMyCart());
    }, [dispatch]);


return (
   <div>
    <h2>Your Cart:</h2>
    {cartItems? cartItems?.map(item =>
        <>
            <div>
                {item.product.name}
            </div>
        </>
        ) :
        <div>Your cart is empty.</div>}
   </div>
)
}
