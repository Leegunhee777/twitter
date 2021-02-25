import React from 'react';
import Myfirebase from '../Myfirebase';
import { useHistory } from "react-router-dom"

const Profile=  ()=> {
    const authService = Myfirebase.auth();
    const history = useHistory();

    const onLogOutClick = ()=> 
    {
        authService.signOut();
        history.push("/");
    }
    
    return(
        <>
            <button onClick = {onLogOutClick}> Log Out</button>
        </>
    )
}

export default Profile;