import { authService, dbService } from "fbInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default ({userObj, refreshUser}) => {
    const history = useNavigate();
    const onLogOutClick = () => {authService.signOut();history("/");}
    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets").where("creatorId", "==", userObj.uid).get();
        
    }
    const [newDisplayName, setNewDisplayName] = useState(userObj.displaName);

    useEffect(() => {
        getMyNweets();
    }, [])

    const onSubmit = async(event) => {
        event.preventDefault();
        const {target: {value}} = event;
        if(userObj.displaName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }

    const onChange = (e) => {
        const {target: {value}}=e;
        setNewDisplayName(value);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}