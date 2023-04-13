import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkAllproducts, resetProd } from '../../store/product';
import { thunkAllCategories, thunkSelectCategory, resetCat } from '../../store/category';
import ProductCard from '../ProductCard';
import CatDropdown from '../CategoryDropdown';
import '../../CSS/allProducts.css'


export default function ManyProducts(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allProducts = useSelector(state => state.products)
    const oneProduct = useSelector(state => state.products.oneProduct)
    const myProducts = useSelector(state => state.products.myProducts)
    const selected = useSelector(state => state.selected)
    const catObj = useSelector(state => state.categories?.all)
    const catProducts = useSelector(state => state.categories.selected?.products)
    const catList = Object.values(catObj)
    const productList = Object.values(allProducts)
    let prods = productList
    const [currentCatId, setCurrentCatId] = useState(null)

    // const [prods, setProds] = useState(productList)

    const catClick = (catId) => {
        dispatch(thunkSelectCategory(catId))
        setCurrentCatId(catId)
    }

    const allClick = () => {
        dispatch(resetCat())
        setCurrentCatId(null)
        prods = productList
    }

    const handleClick = (prod) => {
        history.push(`products/${prod.id}`)
    }

    useEffect(() => {
        dispatch(resetProd())
        dispatch(thunkAllproducts());
        dispatch(thunkAllCategories())

    }, [dispatch]);

    useEffect(() => {
        dispatch(thunkAllproducts())
        if(!catProducts) setCurrentCatId(null)
    }, [catProducts])




    // if oneProduct is in state, remove it from product listb
    if(oneProduct) productList.pop()
    if(myProducts) productList.pop()



    catProducts?.length? prods = catProducts : prods = productList;

    if(selected && (catProducts?.length === 0)){
        return(
        <h3>no products in this category</h3>
    )}

    return (prods?.length && catList?.length && (
    <>
    <div className='filter'>
        {
        currentCatId?
        <span className='category-button' onClick={() => allClick()}><div>all</div></span>:
        <span className='category-button current' onClick={() => allClick()}><div>all</div></span>

        }
        {
            catList?.map(cat => {
                if(currentCatId == cat.id)
                    return <span className='category-button current' onClick={() => catClick(cat.id)}><div>{cat.category}</div></span>
                return <span className='category-button' onClick={() => catClick(cat.id)}><div>{cat.category}</div></span>

            })}
    </div>
    <div id='page'>
    <div className='card-gallery'>
        {prods.length ? prods.map(product =>
            <div className='card-outer'>
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
