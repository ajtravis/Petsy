import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditItem, thunkMyCart } from "../../store/cart";

function EditQuantity({item}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item?.quantity);
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("item", item)
    const data = await dispatch(thunkEditItem({quantity}, item?.id));
    dispatch(thunkMyCart())
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Quantity
        <select
            onChange={(e) => setQuantity(e.target.value)}
            required
        >
            <option
                value='1'
                selected={item.quantity == 1}>
                1
            </option>
            <option
                value='2'
                selected={item.quantity == 2}>
                2
            </option>
            <option
                value='3'
                selected={item.quantity == 3}>
                3
            </option>
            <option
                value='4'
                selected={item.quantity == 4}>
                4
            </option>
            <option
                value='5'
                selected={item.quantity == 5}>
                5
            </option>
            <option
                value='6'
                selected={item.quantity == 6}>
                6
            </option>
        </select>
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditQuantity;
