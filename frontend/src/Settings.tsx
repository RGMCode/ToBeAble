import AddActivity from "./Menubar/AddActivity.tsx";
import {Box, Button, Grid, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {Activity} from "./HomePage.tsx";

type Props = {
    setDayActivity: (newActivities: Activity[]) => void,
    setCity: (newCity: string) => void
}

export default function Settings(props: Props) {

    // Local state to hold the current value of the input
    const [inputValue, setInputValue] = useState('');

    // Handler function for the TextField's onChange event
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Handler function for the button's onClick event
    const handleClick = () => {
        props.setCity(inputValue);
    };


    return <>
        <Grid container={true}
              justifyContent={'center'}
              marginBottom={'2%'}
        >
            <Box position={'absolute'}
                 width={'500px'}
                 sx={{
                     borderTop: 65, borderTopColor: "#3866B2FF",
                     borderLeft: 100, borderLeftColor: 'transparent',
                     borderRight: 100, borderRightColor: 'transparent'
                 }}></Box>
            <Grid container={true}
                  p={'10px'}
                  width={'fit-content'}
                  gap={'10px'}
                  wrap={'wrap'}
            >
                <AddActivity setDayActivity={props.setDayActivity}/>
                {/*<SearchCity setCity={props.setCity}/>*/}
                <TextField
                    variant={'outlined'}
                    value={inputValue}
                    size={'small'}
                    placeholder={'Name der Stadt'}
                    InputProps={{style: {background: 'white'}}}
                    onChange={handleInputChange}
                /><Button
                onClick={handleClick}
                variant={"contained"}
                color={'info'}
            >ok</Button>
            </Grid>
        </Grid>
    </>
}