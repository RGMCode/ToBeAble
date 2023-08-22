import WeatherWidgets from "./WeatherWidgets.tsx";
import {Grid, Typography} from '@mui/material';
import LogoutButton from "./LogoutButton.tsx";
import {Weather} from "../HomePage.tsx";

type WeatherProps = {
    weather: Weather | undefined;
    city: string;
}

export default function MenuBar(props: WeatherProps) {
    return props.weather === undefined ? <div>loading</div> :
    <Grid container
                 direction="row"
                 justifyContent="space-around"
                 alignItems="center"
                 gap={2}
                 bgcolor={"#3866B2FF"}>
        <Typography
            variant={"h4"}
            color={"white"}
        fontFamily={"Copperplate, Papyrus, fantasy"}>To Be Able
        </Typography>
        <WeatherWidgets weather={props.weather} city={props.city}/>
        <LogoutButton/>
    </Grid>
}