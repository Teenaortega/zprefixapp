import React from 'react';
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

    const [itemList] = useContext(UserContext);
    const [itemData, setItemData] = useState(itemList);
    
    useEffect(() => {
        const getData = async (id) => {
          const options = new Headers({
            'Content-type': 'application/json',
          });
          const res = await fetch(`http://localhost:8081/items/${id}`, options);
          const data = await res.json();
          console.log('getData call', data);
          setItemData(data[0]);
        }
        getData(id)
          .catch(console.error);
      }, [id]);




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

  return (
    <Box sx={{ flexGrow: 1, color: '#fff' }}>
      <div style={{color:"black"}}>Add a New Item</div>
      <form onSubmit={props.onSubmit}>
        <Backdrop sx={{ opacity: .8 }}>
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
              <Button sx={{}} variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Backdrop>
      </form>
    </Box >
  );
}

export default FormGrid;