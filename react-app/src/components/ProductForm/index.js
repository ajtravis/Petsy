import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateProduct, thunkMyproducts, thunkSetCategory } from "../../store/product";
import '../../CSS/ProductModal.css'


function ProductFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allCats = useSelector(state => state.categories.all)
  const catList = Object.values(allCats)
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.00);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [cat1, setCat1] = useState(null)
  const [cat2, setCat2] = useState(null)
  const [cat3, setCat3] = useState(null)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  // const [filteredCats1, setFilteredCats1] = useState([...catList])
  // const [filteredCats2, setFilteredCats2] = useState([...catList])
  // const [filteredCats3, setFilteredCats3] = useState([...catList])
  const [checked, setChecked] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(thunkCreateProduct({ name, price, description, image }));

    if (data.errors) {
      setErrors(data.errors)
    } else {
      if (cat1) dispatch(thunkSetCategory(data.id, cat1))
      if (cat2) dispatch(thunkSetCategory(data.id, cat2))
      if (cat3) dispatch(thunkSetCategory(data.id, cat3))
      dispatch(thunkMyproducts())
      closeModal();
    }
  };

  useEffect(() => {
    // const filtered1 = catList?.filter(cat => cat.id != cat2 && cat.id != cat3);
    // const filtered2 = catList?.filter(cat => cat.id != cat1 && cat.id != cat3);
    // const filtered3 = catList?.filter(cat => cat.id != cat2 && cat.id != cat1);

    // setFilteredCats1(filtered1)
    // setFilteredCats2(filtered2)
    // setFilteredCats3(filtered3)
    setChecked(false)
    let num= 0
    if (cat1 != null) num+=1
    if (cat2 != null) num+=1
    if (cat3 != null) num+=1
    if (num == 3) setChecked(true)

  }, [cat1, cat2, cat3]);

  return (
    <div>
      <form className="product-form" onSubmit={handleSubmit}>
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
            min="0.01"
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
            type="url"
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
                disabled = {checked && cat1 != cat.id && cat2 != cat.id && cat3 != cat.id}
                onChange={(e) => {
                  if(cat1 == cat.id) setCat1(null)
                  else if(cat2 == cat.id) setCat2(null)
                  else if(cat3 == cat.id) setCat3(null)
                  else if(cat1 == null) setCat1(e.target.value)
                  else if(cat2 == null) setCat2(e.target.value)
                  else if(cat3 == null) setCat3(e.target.value)
                  else (
                    e.preventDefault()
                  )
                }
                }
              />
            </label>))
        }</div>
        {/* <select
          value={cat1}
          onChange={(e) => setCat1(e.target.value)}
        >
          <option value={null}>
            none
          </option>
          {filteredCats1?.map(cat =>
            <option value={cat.id}>
              {cat.category}
            </option>)}
        </select>
        <select
          value={cat2}
          onChange={(e) => setCat2(e.target.value)}
        >
          <option value={null}>
            none
          </option>
          {filteredCats2?.map(cat =>
            <option value={cat.id}>
              {cat.category}
            </option>)}
        </select>
        <select
          value={cat3}
          onChange={(e) => setCat3(e.target.value)}
        >
          <option value={null}>
            none
          </option>
          {filteredCats3?.map(cat =>
            <option value={cat.id}>
              {cat.category}
            </option>)}
        </select> */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default ProductFormPage;
