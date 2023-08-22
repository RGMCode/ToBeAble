import axios from "axios";
import 'reactjs-popup/dist/index.css';
import {useState} from "react";
import {
        Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
        FormGroup, FormControlLabel, FormLabel, Checkbox, TextField
        } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {Activity} from "../HomePage.tsx";

type SetDayActivity = {
    setDayActivity: (newActivities: Activity[]) => void,
}

export default function AddActivity(props: SetDayActivity) {

    const [possibleWhenWarm, setPossibleWhenWarm] = useState(false)
    const [possibleWhenMiddle, setPossibleWhenMiddle] = useState(false)
    const [possibleWhenCold, setPossibleWhenCold] = useState(false)
    const [possibleWhenRaining, setPossibleWhenRaining] = useState(false)
    const [possibleWithChildren, setPossibleWithChildren] = useState(false)
    const [insideActivity, setInsideActivity] = useState(false)
    const [outsideActivity, setOutsideActivity] = useState(false)
    const [activityName, setActivityName] = useState("")
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    function updatePossibleWhenWarm() {
        setPossibleWhenWarm(!possibleWhenWarm)
    }

    function updatePossibleWhenMiddle() {
        setPossibleWhenMiddle(!possibleWhenMiddle);
    }

    function updatePossibleWhenCold() {
        setPossibleWhenCold(!possibleWhenCold)
    }

    function updatePossibleWhenRaining() {
        setPossibleWhenRaining(!possibleWhenRaining)
    }

    // function updatePossibleWithChildren() {
    //     setPossibleWithChildren(!possibleWithChildren)
    // }
    //
    // function updateInsideActivity() {
    //     setInsideActivity(!insideActivity)
    // }
    //
    // function updateOutsideActivity() {
    //     setOutsideActivity(!outsideActivity)
    // }

    function resetAllFields() {
        setActivityName("Name der Aktivität");
        setOutsideActivity(false);
        setInsideActivity(false);
        setPossibleWithChildren(false);
        setPossibleWhenRaining(false);
        setPossibleWhenCold(false);
        setPossibleWhenMiddle(false);
        setPossibleWhenWarm(false);
    }

        const navigate = useNavigate()

        function submit() {
        setOpenDialog(false);
        axios({
            method: 'post',
            url: '/api',
            data: {
                activityName,
                possibleWhenWarm,
                possibleWhenMiddle,
                possibleWhenCold,
                possibleWhenRaining,
                possibleWithChildren,
                insideActivity,
                outsideActivity
            }
        }).then(() => {
                resetAllFields();
                axios.get('/api').then((data) => props.setDayActivity(data.data))
                navigate('/home')
            }
            );
        }



    return <>
        <Button size={"small"}
                color={"info"}
                variant={'contained'}
                onClick={() => setOpenDialog(true)}
        >Aktivität hinzufügen</Button>

        <Dialog open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby={'dialog-title'}
                aria-describedby={'dialog-description'}>
            <DialogTitle sx={{textAlign: 'center'}} id={'dialog-title'}>Aktivität hinzufügen</DialogTitle>
            <DialogContent>
                <DialogContentText id={'dialog-description'}>
                    <FormGroup>
                        <TextField id="outlined-basic" label={"Name der Aktivität"} variant="outlined"
                                   onChange={e => setActivityName(e.target.value)}/>
                        <br/>
                        <FormLabel>Bei welchen Wettersituationen ist die Aktivität möglich ?</FormLabel>

                        <FormControlLabel control={<Checkbox/>} label="Warm (25°C)"
                                          checked={possibleWhenWarm}
                                          onChange={updatePossibleWhenWarm}/>

                        <FormControlLabel control={<Checkbox/>} label="Mittel (15°C - 24°C)"
                                          checked={possibleWhenMiddle}
                                          onChange={() => updatePossibleWhenMiddle()}/>

                        <FormControlLabel control={<Checkbox/>} label="Kalt (<10 °C)"
                                          checked={possibleWhenCold}
                                          onChange={() => updatePossibleWhenCold()}/>

                        <FormControlLabel control={<Checkbox/>} label="Regen"
                                          checked={possibleWhenRaining}
                                          onChange={() => updatePossibleWhenRaining()}/>
                        {/*<br/>*/}
                        {/*<FormLabel>Wo und mit wem ist die Aktivität möglich ?</FormLabel>*/}

                        {/*<FormControlLabel control={<Checkbox/>} label="drinnen"*/}
                        {/*                  checked={insideActivity}*/}
                        {/*                  onChange={() => updateInsideActivity()}/>*/}

                        {/*<FormControlLabel control={<Checkbox/>} label="draußen"*/}
                        {/*                  checked={outsideActivity}*/}
                        {/*                  onChange={() => updateOutsideActivity()}/>*/}

                        {/*<FormControlLabel control={<Checkbox/>} label="mit Kindern"*/}
                        {/*                  checked={possibleWithChildren}*/}
                        {/*                  onChange={() => updatePossibleWithChildren()}/>*/}
                    </FormGroup>
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{justifyContent: "space-between"}}>
                <Button size={'large'}
                        onClick={() => {
                            resetAllFields();
                            setOpenDialog(false)
                        }}
                        color={'error'}>Abbrechen
                </Button>
                <Button
                    size={'large'}
                    onClick={() => {
                        submit()
                    }}>Speichern
                </Button>
            </DialogActions>
        </Dialog>
    </>
}
