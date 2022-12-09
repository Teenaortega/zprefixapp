import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MUItable from "../components/MUItable";


const Item = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [itemData, setItemData] = useState([]);
    const [message, setMessage] = useState("");
    const [item_name, setitem_name] = useState("");
    const [itemdescription, setitemdescription] = useState("");
    const [quantity, setquantity] = useState("");

    console.log(id)
    useEffect(() => {
        const getData = async (id) => {
            const res = await fetch(`http://localhost:8081/items/${id}`);
            const data = await res.json();
            console.log(data);
            setItemData(data[0]);
        }
        getData(id)
            .catch(console.error);
    }, []);


    const handleDeleteClick = async (id) => {
        const getData = async (id) => {
            console.log('inside handledelete', id)
        let res = await fetch(`http://localhost:8081/items/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        setItemData({});
        nav('/items');
        if (res.status === 201) {
            setMessage("Item Deleted");
        } else {
            setMessage("Some error occured");
        }
    }
    getData(id)
    .catch(console.error)
    }

    let handleSubmit = async (id) => {
        // e.preventDefault();
        try {
            const body = {
                item_name: id.target[0].value,
                description: id.target[1].value,
                quantity: id.target[2].value,
            }

            console.log("body", body)
            let res = await fetch(`http://localhost:8081/items${id}`, {
                method: "PATCH",
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
                setitemdescription("");
                setquantity("");
                setMessage("Item created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const actions = [
        { icon: <DeleteForeverIcon />, name: "Delete" },
    ];
    //RETURN
    console.log('itemdata', itemData);
    return (
        <> 
        <Box id="item-name" color='black'>{`${itemData.item_name?.toUpperCase()}`}</Box>
        <Box style={{ height: '85vh', display: 'flex', margin:'auto' }}>
            <div style={{background:'transparent'}}>
                <MUItable data={itemData} />

                </div>
        </Box>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 0, right: 0 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => {
                            handleDeleteClick(id);
                        }}
                    />
                ))}
            </SpeedDial>

        </>
    );
}

export default Item;