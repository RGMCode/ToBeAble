import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Grid, TextField, Typography} from "@mui/material";


export default function RegisterPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const nav = useNavigate();

    function registrieren(){
        axios.post("/api/user/register", {username, password})
            .then(() => nav("/home"))
            .catch((error) => console.log(error));

    }

    return(
        <>
            <Grid container={true}
                  direction={"column"}
                  alignItems={"center"}
                  p={"2%"}
            >
                <Grid container={true}
                      maxWidth={'350px'}
                      direction={'column'}
                      alignItems={'center'}
                >
                    <Typography variant={"h2"}>
                        Registrieren
                    </Typography>
                    <br/>
                    <TextField id="username"
                               label={"Username"}
                               variant="outlined"
                               fullWidth={true}
                               onChange={e => setUsername(e.target.value)}
                    />
                    <br/>
                    <TextField id="password"
                               type={'password'}
                               label={"Passwort"}
                               variant="outlined"
                               fullWidth={true}
                               onChange={e => setPassword(e.target.value)}
                    />
                    <br/>
                </Grid>
                <Grid container={true}
                      justifyContent={"space-between"}
                      width={'350px'}
                >
                    <Button onClick={() => {registrieren()}}
                            variant={'outlined'}>
                        Registrieren
                    </Button>
                    <Button component={Link}
                            to={'/'}
                            variant={'outlined'}>
                        zum Login
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}