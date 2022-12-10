import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'


const FormGrid = (props) => {
  const [item_name, setitem_name] = useState("");
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState("");
  const [user_id, setuser_id] = useState("");
  const [message, setMessage] = useState("");

  const Backdrop = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1f2024',
    padding: theme.spacing(3),
    textAlign: 'center',
    color: '#1f2024',
  }));

  const WhiteLabels = styled(InputLabel)(({ theme }) => ({
    color: '#fff',
  }));

  const WhiteInput = styled(FilledInput)(({ theme }) => ({
    color: '#fff',
    backgroundColor: '#5a5968',
  }));

  const itemNav = useNavigate();

  let handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const body = {
        item_name: e.target[0].value,
        description: e.target[1].value,
        quantity: e.target[2].value,
      }
      console.log("body", body)
      let res = await fetch("http://localhost:8081/items", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        item_name: e.target[0].value,
        description: e.target[1].value,
        quantity: e.target[2].value,
        user_id: e.target[3].value,
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
    console.log(e)
  };


  return (
    <Box sx={{ flexGrow: 1, color: '#fff' }}>
      <div style={{color:"black"}}>Add a New Item</div>
      <form onSubmit={props.onSubmit}>
        <Backdrop sx={{ opacity: .8,  color: '#fff'}}>
          <Grid container spacing={5}>
            <Grid xs={6}>
              <FormControl fullwidth sx={{}} variant="filled">
                <WhiteLabels>Item</WhiteLabels>
                <WhiteInput
                  id="item_name"
                />
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl fullwidth sx={{}} variant="filled">
                <WhiteLabels>Quantity</WhiteLabels>
                <WhiteInput
                  id="quantity"
                  inputProps={{
                    'aria-label': 'quantity',
                  }}
                  
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl fullwidth sx={{}} variant="filled">
                <WhiteLabels>Description</WhiteLabels>
                <WhiteInput
                  id="description"
                  multiline
                  maxRows={4}
                />
              </FormControl>
            </Grid>
            <Grid xs={5} />
            <Grid xs={1}>
              <Button onSubmit={handleSubmit(props)} variant="contained" endIcon={<SendIcon />}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Backdrop>
      </form>
    </Box >
  );
}

export default FormGrid;