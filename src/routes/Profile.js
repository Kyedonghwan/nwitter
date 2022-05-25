import { authService } from "fbInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

export default () => {
    const history = useNavigate();
    const onLogOutClick = () => {authService.signOut();history("/");}
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}