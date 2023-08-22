import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button} from "@mui/material";


export default function LogoutButton() {
    const nav = useNavigate();

    function logout() {
        axios.post("/api/user/logout")
            .then((response) => console.log(response.data))
            .then(() => nav("/"))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Button
                size={"medium"}
                variant={'contained'}
                color={"error"}
                onClick={() => logout()}
            >logout</Button>
        </>
    );
}