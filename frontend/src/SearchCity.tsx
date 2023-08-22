import {Button, Grid, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";

type Props = {
    setCity: (newCity: string) => void
};

export default function SearchCity(props: Props) {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        props.setCity(inputValue);
    };

    return (
        <Grid container={true}
        flexDirection={'row'}>
            <TextField
                id="outlined-basic"
                label={"Name der Stadt"}
                variant="outlined"
                value={inputValue}
                size={'small'}
                InputProps={{style: {background: 'white'}}}
                onChange={handleInputChange}
            /><Button
            onClick={handleClick}
            variant={"contained"}
            color={'info'}
        >ok</Button>
        </Grid>
    );
}