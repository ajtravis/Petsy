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
    const myProducts = useSelector(state => state.products.myProducts)
    useEffect(() => {
        dispatch(thunkAllproducts());
    }, [dispatch]);
    const productList = Object.values(allProducts)
    // if oneProduct is in state, remove it from product list
    if(oneProduct) productList.pop()
    if(myProducts) productList.pop()
return productList && (
    <div id='page'>
    <div className='card-gallery'>
        {productList.length ? productList.map(product =>
            <div>
                <div className='card-container'>
                    <ProductCard product={product} location={'home-page'}/>
                </div>
            </div>
            ) :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Oops! Something Went Wrong!</h1>
                </div>
            }
    </div>
    </div>
)
}
