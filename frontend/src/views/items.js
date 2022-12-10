import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import IconButton from '@mui/material/IconButton';
import Grid from "../components/UserGrid";
import UserContext from '../components/UserContext';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Items = () => {
  const [itemList] = useContext(UserContext);
  const [itemData, setItemData] = useState(itemList);

  useEffect(() => {

    const getItemData = async () => {
      const options = new Headers({
        'Content-type': 'application/json',
      });
      const res = await fetch(`http://localhost:8081/items`, options);
      const data = await res.json();
      console.log(data);
      data?.forEach((element, index) => {
        element['id'] = index;
      });
      setItemData(data);
    }

    getItemData()
      .catch(console.error);
  }, []);

  const itemNav = useNavigate();
  const handleClick = (id) => {
    itemNav(`/items/${id}`);
  }

  const handleNewItemsClick = (id) => {
    itemNav(`/newitem`);
  }

  const columns = [
    { field: 'id', headerName: 'ID #', headerClassName: 'headers', hide: true },
    { field: 'item_name', headerName: 'Item', flex: 1, headerClassName: 'headers', },
    { field: 'quantity', headerName: 'Quantity', flex: 1, headerClassName: 'headers', },
    { field: 'description', headerName: 'Description', flex: 1, headerClassName: 'headers', },
    {
      field: 'Order',
      flex: .5,
      headerClassName: 'headers',
      renderCell: (cellValues) => {
        return (
          <IconButton
            onClick={() => handleClick(cellValues.id)}
          >
            <ElectricBoltIcon />
          </IconButton>
        )
      }
    },
  ];
  console.log('itemdata', itemData);

  return (
  <>
    <div style={{ height: '85vh', width: '75%', display: 'flex' }}>
      <Grid columns={columns} data={itemData} />
    </div>
    
    <Button style={{background: "grey", color:"black"}} onClick={() => handleNewItemsClick()}><AddCircleOutlineIcon/> Add Item</Button>
    </>
  );
};

export default Items;