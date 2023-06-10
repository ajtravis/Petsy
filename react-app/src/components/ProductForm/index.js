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
  const [price, setPrice] = useState(0.01);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState('');
  const [cat1, setCat1] = useState(null)
  const [cat2, setCat2] = useState(null)
  const [cat3, setCat3] = useState(null)
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();
  // const [filteredCats1, setFilteredCats1] = useState([...catList])
  // const [filteredCats2, setFilteredCats2] = useState([...catList])
  // const [filteredCats3, setFilteredCats3] = useState([...catList])
  const [checked, setChecked] = useState(false)
  let c;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    let formData = new FormData();

    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    for (let key of formData.entries()) {
      console.log(key[0] + '----->' + key[1]);
    }


    // const data = await dispatch(thunkCreateProduct({ name, price, description, image }));
    const data = await dispatch(thunkCreateProduct(formData));
    console.log("data", data)

    setName('')
    setImage('')
    setDescription('')
    setPrice('')
    setErrors([])
    setHasSubmitted(false)

    if (cat1) await dispatch(thunkSetCategory(data?.id, cat1));
    if (cat2) await dispatch(thunkSetCategory(data?.id, cat2));
    if (cat3) await dispatch(thunkSetCategory(data?.id, cat3));
    dispatch(thunkMyproducts())
    closeModal();

    // if (data?.errors) {
    //   console.log(data)
    //   setErrors(data?.errors)
    // } else {
    //   if (cat1) dispatch(thunkSetCategory(data.id, cat1))
    //   if (cat2) dispatch(thunkSetCategory(data.id, cat2))
    //   if (cat3) dispatch(thunkSetCategory(data.id, cat3))
    //   dispatch(thunkMyproducts())
    //   closeModal();
    // }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log(image)
  }

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

  useEffect(() => {
    const errs = [];
    // Only adding to the validation errors for fields that are nullable=False in the Song model
    if (!name) errs.push('Please enter a name!')
    if (!price) errs.push('Please enter a price!')
    if (!image) errs.push('Please provide an image file!')
    if (!description) errs.push('Please add a description!')
    setErrors(errs)
}, [name, description, price, image])

  return (
    <div>
      <form className="product-form" onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <ul>
          {errors ? errors.map((error, idx) => (
            <li className="err" key={idx}>{error}</li>
          )) : null}
        </ul>
        <label>
          Product Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          // required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            min={0.01}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          // required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          // required
          />
        </label>
        <label>
          Image
          <input
            // type="url"
            // value={image}
            // onChange={(e) => setImage(e.target.value)}
            type="file"
            accept="image/*"
            onChange={updateImage}
            onInput={updateImage}
          />
        </label>

        <div id="cat-head">select up to 3 categories</div>
        <div className="checkbox-container">
          {

            catList?.map(cat => {
              if (cat.id == cat1 || cat.id == cat2 || cat.id == cat3) return (
                <label
                  className={`cat-label chosen`}
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
                </label>)
              return (
                <label
                  className={`cat-label`}
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
                </label>)
            })
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
