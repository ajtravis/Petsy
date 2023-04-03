import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkEditProduct, thunkOneProduct, thunkSetCategory } from "../../store/product";
import '../../CSS/ProductModal.css'


function ProductEditFormPage({ product }) {
  const dispatch = useDispatch();
  const { id } = useParams()
  const { closeModal } = useModal()
  const allCats = useSelector(state => state.categories.all)
  const catList = Object.values(allCats)
  // const product = useSelector(state => state.products.oneProduct)
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [image, setImage] = useState(product?.image);
  const [errors, setErrors] = useState([]);
  const [cat1, setCat1] = useState(null)
  const [cat2, setCat2] = useState(null)
  const [cat3, setCat3] = useState(null)
  const [checked, setChecked] = useState(false)
  const history = useHistory()
  const prod_cats = product.category_ids
  

  useEffect(() => {
    dispatch(thunkOneProduct(id))
  }, [id, dispatch]);

  useEffect(() => {
    setChecked(false)
    let num= 0
    if (cat1 != null) num+=1
    if (cat2 != null) num+=1
    if (cat3 != null) num+=1
    if (num == 3) setChecked(true)

  }, [cat1, cat2, cat3]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(thunkEditProduct({ name, price, description, image }, product?.id));
    if (data.errors) {
      setErrors(data.errors)
    } else {
      if (cat1) dispatch(thunkSetCategory(data.id, cat1))
      if (cat2) dispatch(thunkSetCategory(data.id, cat2))
      if (cat3) dispatch(thunkSetCategory(data.id, cat3))
      dispatch(thunkOneProduct(product?.id))
      history.push(`/products/${product?.id}`)
      closeModal()
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
        <div>select up to 3 categories</div>
        <div className="checkbox-container">
          {
            catList?.map(cat =>
            (<label

            >
              {cat.category}
              <input
                className="checkCat"
                type="checkbox"
                value={cat.id}
                disabled={checked && cat1 != cat.id && cat2 != cat.id && cat3 != cat.id}
                onChange={(e) => {
                  if (cat1 == cat.id) setCat1(null)
                  else if (cat2 == cat.id) setCat2(null)
                  else if (cat3 == cat.id) setCat3(null)
                  else if (cat1 == null) setCat1(e.target.value)
                  else if (cat2 == null) setCat2(e.target.value)
                  else if (cat3 == null) setCat3(e.target.value)
                  else (
                    e.preventDefault()
                  )
                }
                }
              />
            </label>))
          }</div>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
}

export default ProductEditFormPage;
