import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { thunkOneProduct } from '../../store/product';
import '../../CSS/oneProduct.css'



export default function OneProduct(){
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(thunkOneProduct(id));
    }, [dispatch]);

    const oneProduct = useSelector(state => state.products.oneProduct)

return (
    <div>
        { oneProduct?
        <>
        <div className='column'>
            <img src={oneProduct.image} />
        </div>
        <div className='column'>
        </div>
        </>
             :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'center', width: '100vw' }}>
                    <h1 style={{ paddingTop: '5vw', fontFamily: 'Bold' }}>Oops! Something Went Wrong!</h1>
                </div>
            }
    </div>
)
}
