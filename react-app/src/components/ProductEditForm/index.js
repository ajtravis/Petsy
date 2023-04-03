import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkEditProduct, thunkOneProduct, thunkSetCategory, thunkRemoveCategory, thunkMyproducts } from "../../store/product";
import '../../CSS/ProductModal.css'
import AddCategory from "../AddCategoriesModal";
import OpenModalButton from "../OpenModalButton";

function ProductEditFormPage(props) {
  const dispatch = useDispatch();
  const { id } = useParams()
  const { closeModal } = useModal()
  const allCats = useSelector(state => state.categories.all)
  const catList = Object.values(allCats)
  const [product, setProduct] = useState(props.product)
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [image, setImage] = useState(product?.image);
  const [errors, setErrors] = useState([]);
  const [cat1, setCat1] = useState(null)
  const [cat2, setCat2] = useState(null)
  const [cat3, setCat3] = useState(null)
  const [newCatId, setNewCatId] = useState(null)
  const [checked, setChecked] = useState(false)
  const history = useHistory()
  const state_prod = useSelector(state => state.products.myProducts[product.id])

  const selection = catList?.filter(cat => !product.category_ids.includes(cat.id))
  let prodCats = catList?.filter(cat => product.category_ids.includes(cat.id))



  useEffect(() => {
    dispatch(thunkMyproducts())
    prodCats = []
    prodCats = catList?.filter(cat => product.category_ids.includes(cat.id))
  }, [product.category_ids.length, product, dispatch]);

  useEffect(() => {
    // const filtered1 = catList?.filter(cat => cat.id != cat2 && cat.id != cat3);
    // const filtered2 = catList?.filter(cat => cat.id != cat1 && cat.id != cat3);
    // const filtered3 = catList?.filter(cat => cat.id != cat2 && cat.id != cat1);

    // setFilteredCats1(filtered1)
    // setFilteredCats2(filtered2)
    // setFilteredCats3(filtered3)
    setChecked(false)
    let num = 0
    if (cat1 != null) num += 1
    if (cat2 != null) num += 1
    if (cat3 != null) num += 1
    if (num == 3) setChecked(true)

  }, [cat1, cat2, cat3]);

  const handleClick = async (prodId, catId) => {
    // e.preventDefault()
    // if(cat === null) throw new Error("You must select a category first")
    const data = await dispatch(thunkSetCategory(prodId, catId))
    setProduct(data)
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(thunkEditProduct({ name, price, description, image }, product?.id));
    if (data.errors) {
      setErrors(data.errors)
    } else {
      // if (cat1) dispatch(thunkSetCategory(data.id, cat1))
      // if (cat2) dispatch(thunkSetCategory(data.id, cat2))
      // if (cat3) dispatch(thunkSetCategory(data.id, cat3))
      dispatch(thunkOneProduct(product?.id))
      history.push(`/products/${product?.id}`)
      closeModal()
    }
  };

  const removeCategory = async (prodId, catId) => {
    const newProd = await dispatch(thunkRemoveCategory(prodId, catId))
    setProduct(newProd)
  }

  return (
    <div>
      <form className='product-form' onSubmit={handleSubmit}>
        <h2>edit product details</h2>
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
        {/* <div>select up to 3 categories</div>
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
          }</div> */}

        <h3 id="procat-header" >categories:</h3>
        <div className="cat-container">
          {prodCats.length ? prodCats.map(cat =>
            <div className="cat-tools">
              <div className="cat-name">{cat.category}</div>
              <div className="remove-cat" onClick={() => removeCategory(product.id, cat.id)}>
                <i class="fa-sharp fa-solid fa-circle-xmark fa-xs"></i>
              </div>
            </div>
          ) : null}
          {/* <AddCategory product={product}/> */}
          <form>
            <select
              defaultValue={null}
              onChange={(e) => {setNewCatId(e.target.value)}}
              required
            >
              <option value={null}>
                none
              </option>
              {selection?.map(cat =>
                <option value={cat.id}>
                  {cat.category}
                </option>)}
            </select>
            <div onClick={() => handleClick(product?.id, newCatId)}>add</div>
          </form>
        </div>
        <button type="submit">Update Info</button>
      </form>
    </div>
  );
}

export default ProductEditFormPage;
