import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditItem, thunkMyCart } from "../../store/cart";

function EditQuantity({item}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item?.quantity);
  const [errors, setErrors] = useState([]);


  const handleSubmit = async (e) => {
    // e.preventDefault();
    const data = await dispatch(thunkEditItem({quantity}, item?.id));
    dispatch(thunkMyCart())
    if (data) {
      setErrors(data);
    }
  };

  useEffect(() => {
    return handleSubmit();
}, [quantity]);

  return (
    <>
      <form id="edit-form" onSubmit={handleSubmit}>
        <select
            className="select-quant"
            onChange={(e) =>
                {
                setQuantity(e.target.value)

            }
            }
            required
        >
            <option
                value='1'
                selected={item.quantity == 1}
                >
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
            <option
                value='7'
                selected={item.quantity == 7}>
                7
            </option>
            <option
                value='8'
                selected={item.quantity == 8}>
                8
            </option>
            <option
                value='9'
                selected={item.quantity == 9}>
                9
            </option>
            <option
                value='10'
                selected={item.quantity == 10}>
                10
            </option>
            <option
                value='11'
                selected={item.quantity == 11}>
                11
            </option>
            <option
                value='12'
                selected={item.quantity == 12}>
                12
            </option>
        </select>
        {/* <button className="update-button" type="submit">Update</button> */}
      </form>
    </>
  );
}

export default EditQuantity;
