import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditItem } from "../../store/cart";

function EditQuantity({item}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item?.quantity);
  const [errors, setErrors] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    item.quantity = quantity
    const data = await dispatch(thunkEditItem({item}, item?.id));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
            Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </>
  );
}

export default EditQuantity;
