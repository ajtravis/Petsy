import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkAllproducts } from '../../store/product';
import ProductCard from '../ProductCard';
import '../../CSS/allProducts.css'


export default function ManyProducts(){
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)
    const oneProduct = useSelector(state => state.products.oneProduct)
    useEffect(() => {
        dispatch(thunkAllproducts());
    }, [dispatch]);
    const productList = Object.values(allProducts)
    // if oneProduct is in state, remove it from product list
    if(oneProduct) productList.pop()

return productList && (
    <div className='card-gallery'>
        {productList.length ? productList.map(product =>
            <>
                <div>
                    <ProductCard product={product} />
                </div>
            </>
            ) :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Oops! Something Went Wrong!</h1>
                </div>
            }
    </div>
)
}
