import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkEditProduct, thunkOneProduct } from "../../store/product";
import '../../CSS/ProductModal.css'


function ProductEditFormPage({product}) {
  const dispatch = useDispatch();
  const { id } = useParams()
  // const product = useSelector(state => state.products.oneProduct)
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [image, setImage] = useState(product?.image);
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  useEffect(() => {
    dispatch(thunkOneProduct(id))
}, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
        const data = await dispatch(thunkEditProduct({name, price, description, image}, product?.id));
        if (data) {
          setErrors(data)
        } else {
            dispatch(thunkOneProduct(product?.id))
            history.push(`/products/${product?.id}`)
        }

  };

  return (
    <div>
      <form className='product-form' onSubmit={handleSubmit}>
        <label>
          Product Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            min="0"
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image url
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
}

export default ProductEditFormPage;
