import './App.css';

import {Weather, Activity} from "./HomePage.tsx";
import {Box, Grid, Typography} from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";

type WeatherProps = {
    weather: Weather | undefined;
    dayActivities: Activity[];
}

type ActivityDataProps = {
    dayActivity: Activity
}

export default function DayView(props: WeatherProps) {

    function ActivityCard(props: ActivityDataProps) {
        return (
            <div className={"activityOutput"}>
                <h4>{props.dayActivity.activityName}</h4>
            </div>
        )
    }

    function getForecastByDate(date: string) {
        return props.weather?.forecast?.forecastday?.find(day => day.date === date);
    }

    const tomorrowWeather = getForecastByDate(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);
    const dayAfterTomorrowWeather = getForecastByDate(new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]);

    function isWarmToday() {
        if (props.weather != undefined) {
            if (props.weather.current.temp_c >= 25) {
                return true;
            }
        }
    }

    function isWarmTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[1].day.maxtemp_c >= 25) {
                return true;
            }
        }
    }

    function isWarmDayAfterTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[2].day.maxtemp_c >= 25) {
                return true;
            }
        }
    }

    function isMiddleToday() {
        if (props.weather != undefined) {
            if (props.weather.current.temp_c >= 10 && props.weather.current.temp_c <= 24) {
                return true;
            }
        }
    }
    function isMiddleTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[1].day.maxtemp_c >= 10 && props.weather.forecast.forecastday[1].day.maxtemp_c <= 24) {
                return true;
            }
        }
    }

    function isMiddleDayAfterTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[2].day.maxtemp_c >= 10 && props.weather.forecast.forecastday[2].day.maxtemp_c <= 24) {
                return true;
            }
        }
    }

    function isColdToday() {
        if (props.weather != undefined) {
            if (props.weather.current.temp_c < 10) {
                return true;
            }
        }
    }


    function isColdTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[1].day.maxtemp_c < 10) {
                return true;
            }
        }
    }

    function isColdDayAfterTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[2].day.maxtemp_c < 10) {
                return true;
            }
        }
    }

    function isRainingToday() {
        if (props.weather != undefined) {
            if (props.weather.current.precip_mm > 0) {
                return true;
            }
        }
    }
    function isRainingTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[1].day.daily_chance_of_rain > 0) {
                return true;
            }
        }
    }

    function isRainingDayAfterTomorrow() {
        if (props.weather != undefined) {
            if (props.weather.forecast.forecastday[2].day.daily_chance_of_rain > 0) {
                return true;
            }
        }
    }

    const filterAcitivitiesToday = props.dayActivities.filter(activity =>
        (activity.possibleWhenRaining || !isRainingToday()) &&
        (activity.possibleWhenWarm || !isWarmToday()) &&
        (activity.possibleWhenMiddle || !isMiddleToday()) &&
        (activity.possibleWhenCold || !isColdToday())
    );

    const filterAcitivitiesTomorrow = props.dayActivities.filter(activity =>
        (activity.possibleWhenRaining || !isRainingTomorrow()) &&
        (activity.possibleWhenWarm || !isWarmTomorrow()) &&
        (activity.possibleWhenMiddle || !isMiddleTomorrow()) &&
        (activity.possibleWhenCold || !isColdTomorrow())
    );

    const filterAcitivitiesDayAfterTomorrow = props.dayActivities.filter(activity =>
        (activity.possibleWhenRaining || !isRainingDayAfterTomorrow()) &&
        (activity.possibleWhenWarm || !isWarmDayAfterTomorrow()) &&
        (activity.possibleWhenMiddle || !isMiddleDayAfterTomorrow()) &&
        (activity.possibleWhenCold || !isColdDayAfterTomorrow())
    );

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

    return props.weather === undefined ? <div>loading...</div> : (
        <div className={"flex-container"}>
            <div className={"currentDay"}>
                {props.dayActivities.length === 0 ? <p>loading...</p> : (
                    <Box height={'64px'} display={'flex'}>
                        <Grid container
                              direction="row"
                              justifyContent="center"
                              alignItems={'center'}
                        >
                            <Typography variant={"h4"}>Heute</Typography>
                        </Grid>
                    </Box>
                )}
                <div className={"activityBox"}>
                    {filterAcitivitiesToday.map(daily =>
                        <ActivityCard key={daily.id} dayActivity={daily} />
                    )}
                </div>
            </div>
            <div className={"tomorrow"}>
                {tomorrowWeather ? (
                    <>
                        {/*<h2>{tomorrowWeather.date}</h2>*/}
                        <Box>
                            <Grid container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  gap={2}>
                                <Grid item>
                                    <Typography variant={"h4"}>Morgen</Typography>
                                </Grid>
                                <Grid item>
                                    <Box style={styles.boxItem}>
                                        <img src={props.weather?.forecast.forecastday[1].day.condition.icon} alt={"WeatherIcon"}/>
                                    </Box>
                                </Grid>
                                <Grid item style={styles.gridItem}>
                                    <Box style={styles.boxItem}>
                                        <ThermostatIcon color={"primary"}/>
                                        <Typography>{props.weather?.forecast.forecastday[1].day.maxtemp_c} °C</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <div className={"activityBox"}>
                            {filterAcitivitiesTomorrow.map(daily =>
                                <ActivityCard key={daily.id} dayActivity={daily} />
                            )}
                        </div>
                    </>
                ) : <p>No forecast for tomorrow available</p>}
            </div>
            <div className={"theDayAftertTomorrow"}>
                {dayAfterTomorrowWeather ? (
                    <>
                        {/*<h2>{dayAfterTomorrowWeather.date}</h2>*/}
                        <Box>
                            <Grid container
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  gap={2}>
                                <Grid item>
                                    <Typography variant={"h4"}>Übermorgen</Typography>
                                </Grid>
                                <Grid item>
                                    <Box style={styles.boxItem}>
                                        <img src={props.weather?.forecast.forecastday[2].day.condition.icon} alt={"WeatherIcon"}/>
                                    </Box>
                                </Grid>
                                <Grid item style={styles.gridItem}>
                                    <Box style={styles.boxItem}>
                                        <ThermostatIcon color={"primary"}/>
                                        <Typography>{props.weather?.forecast.forecastday[2].day.maxtemp_c} °C</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <div className={"activityBox"}>
                            {filterAcitivitiesDayAfterTomorrow.map(daily =>
                                <ActivityCard key={daily.id} dayActivity={daily} />
                            )}
                        </div>
                    </>
                ) : <p>keine Daten verfügbar</p>}
            </div>
        </div>
    );
}
