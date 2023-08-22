import './App.css'

import './DayView.css'
import {Route, Routes} from 'react-router-dom'
import LoginPage from "./LoginPage/LoginPage.tsx";
import RegisterPage from "./Register/Register.tsx";
import HomePage from "./HomePage.tsx";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute.tsx";
import {useState} from "react";

function App() {

    const [user, setUser] = useState("")


    return (
      <>
        <Routes>
            <Route path={"/"} element={<LoginPage setUser={setUser}/>}/>
            <Route path={"/register"} element={<RegisterPage/>}/>

            <Route element={<ProtectedRoute user={user}/>}>
                <Route path={"/home"} element={<HomePage/>}/>
            </Route>
        </Routes>
    </>
    )
}

export default App

