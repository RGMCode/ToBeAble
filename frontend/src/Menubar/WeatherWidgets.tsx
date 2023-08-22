import LocationCityIcon from '@mui/icons-material/LocationCity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {Grid, Box, Typography} from "@mui/material";
import {Weather} from "../HomePage.tsx";

type WeatherProps = {
    weather: Weather | undefined;
    city: string;
}

const styles = {
    gridItem: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
    },
    boxItem: {
        display:'flex'
    }
};

export default function WeatherWidgets(props:WeatherProps) {

    return props.weather === undefined ? <p>Loading...</p> : (
        <Box>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={2}>
                <Grid item>
                    <Box style={styles.boxItem}>
                        <img src={props.weather?.current.condition.icon} alt={"WeatherIcon"}/>
                    </Box>
                </Grid>
                <Grid item style={styles.gridItem}>
                    <Box style={styles.boxItem}>
                        <ThermostatIcon color={"primary"}/>
                        <Typography>{props.weather?.current.temp_c} °C</Typography>
                    </Box>
                </Grid>

                <Grid item style={styles.gridItem}>
                    <Box style={styles.boxItem}>
                        <WbSunnyIcon color={"primary"}/>
                        <Typography>UV: {props.weather?.current.uv}</Typography>
                    </Box>
                </Grid>

                <Grid item style={styles.gridItem}>
                    <Box style={styles.boxItem}>
                        <LocationCityIcon color={"primary"}/>
                        <Typography>{props.weather?.location.name}</Typography>
                    </Box>
                </Grid>

                <Grid item style={styles.gridItem}>
                    <Box style={styles.boxItem}>
                        <WaterDropIcon color={"primary"}/>
                        <Typography>{props.weather?.current.precip_mm} mm</Typography>
                    </Box>
                </Grid>

                <Grid item style={styles.gridItem}>
                    <Box style={styles.boxItem}>
                        <LocalFloristIcon fontSize={"small"} color={"primary"}/>
                        <Typography>{Math.round(props.weather?.forecast.forecastday[0].day.air_quality.pm2_5).toString()}</Typography>
                    </Box>
                </Grid>


                <Grid item style={styles.gridItem}>
                    <Box style={styles.boxItem}>
                        <LocalFloristIcon color={"primary"}/>
                        <Typography>{Math.round(props.weather?.forecast.forecastday[0].day.air_quality.pm10).toString()}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}