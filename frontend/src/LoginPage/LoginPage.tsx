import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button, Grid, TextField, Typography} from "@mui/material";

type Props = {
    setUser: (user: string) => void
}

export default function LoginPage(loginPageProps: Props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate()

    function login() {
        axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => loginPageProps.setUser(response.data))
            .then(() => nav("/home"))
            .catch((error) => console.log(error));
    }

    return (
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
                        LOGIN
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
                    <Button onClick={() => {login()}}
                            variant={'outlined'}>
                        Einloggen
                    </Button>
                    <Button component={Link}
                            to={'/register'}
                            variant={'outlined'}>
                        Registrieren ?
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}