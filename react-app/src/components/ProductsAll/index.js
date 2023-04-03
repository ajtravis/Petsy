import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkAllproducts } from '../../store/product';
import { thunkAllCategories } from '../../store/category';
import ProductCard from '../ProductCard';
import CatDropdown from '../CategoryDropdown';
import '../../CSS/allProducts.css'


export default function ManyProducts(){
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)
    const oneProduct = useSelector(state => state.products.oneProduct)
    const myProducts = useSelector(state => state.products.myProducts)
    const catObj = useSelector(state => state.categories.all)
    const catProducts = useSelector(state => state.categories.selected?.products)
    const catList = Object.values(catObj)

    useEffect(() => {
        dispatch(thunkAllproducts());
        dispatch(thunkAllCategories())
    }, [dispatch]);

    useEffect(() => {
        dispatch(thunkAllproducts())
    }, [catProducts])

    const productList = Object.values(allProducts)
    // if oneProduct is in state, remove it from product listb
    if(oneProduct) productList.pop()
    if(myProducts) productList.pop()


    // console.log(response)
    let prods = productList
    catProducts?.length? prods = catProducts : prods = productList

    return (prods?.length && catList?.length && (
    <>
    <div className='filter'>
        <div>filter by category:</div>
        <CatDropdown categories={catList}/>
    </div>
    <div id='page'>
    <div className='card-gallery'>
        {prods.length ? prods.map(product =>
            <div>
                <div className='card-container'>
                    <ProductCard product={product} location={'home-page'}/>
                </div>
            </div>
            ) :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>No results found</h1>
                </div>
            }
    </div>
    </div>
    </>
    )) || (<h2>Loading...</h2>)

}
