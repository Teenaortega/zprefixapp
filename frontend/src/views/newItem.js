import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";
import Muitable from '../components/MUItable';

const AddItem = (props) => {
  const [item_name, setitem_name] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [message, setMessage] = useState("");



  const itemNav = useNavigate();

  let handleSubmit = async (id) => {
    // e.preventDefault();
    try {
      const body = {
        item_name: id.target[0].value,
        description: id.target[1].value,
        quantity: id.target[2].value,
      }
      console.log("body", body)
      let res = await fetch("http://localhost:8081/items", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        item_name: id.target[0].value,
        description: id.target[1].value,
        quantity: id.target[2].value,
        user_id: id.target[3].value,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setitem_name("");
        setdescription("");
        setquantity("");
        setMessage("Item created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
    itemNav(`/items/`);
    console.log(id)
  };


  return(
    <>
      <Muitable onSubmit={handleSubmit} />
    </>
  );
}

export default AddItem;