import { thunkDeleteProduct, thunkMyproducts, thunkAllproducts } from "../../store/product"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
export default function ProductCard({product}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const handleClick = () => {
        dispatch(thunkDeleteProduct(product.id))
        dispatch(thunkMyproducts())
        dispatch(thunkAllproducts())
    }
return(
    <>
        <div>{product?.name}</div>
        <div>
            <img src={product?.image} />
        </div>
        <div>{product?.seller_id == user.id? (<div onClick={handleClick}>delete</div>): null}</div>
    </>
)
}
