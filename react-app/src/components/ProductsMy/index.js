import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkMyproducts, resetProd } from '../../store/product';
import ProductCard from '../ProductCard';



export default function MyProducts() {
    const dispatch = useDispatch()
    const myProducts = useSelector(state => state.products.myProducts)
    // const allProducts = useSelector(state => state.products)

    useEffect(() => {
        dispatch(resetProd())
        dispatch(thunkMyproducts());
    }, [dispatch]);
    // const productList = Object.values(allProducts)
    // if oneProduct is in state, remove it from product list
    // if(oneProduct) productList.pop()

    return (
        <div id='page'>
            <div className='card-gallery'>
                {myProducts?.length ? myProducts.map(product =>
                    <div className='card-outer'>
                    <div className='card-container'>
                            <ProductCard product={product} />
                    </div>
                    </div>
                ) :
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                        <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>No Products Listed!</h1>
                    </div>
                }
            </div>
        </div>
    )
}
