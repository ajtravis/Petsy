import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkAllproducts } from '../../store/product';



export default function ManyProducts(){
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)
    useEffect(() => {
        dispatch(thunkAllproducts());
    }, [dispatch]);

return allProducts && (
    <div>

    </div>
)
}
