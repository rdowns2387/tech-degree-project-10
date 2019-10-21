import React from 'react';
import {Redirect} from 'react-router-dom';


// signs the user out and takes them back to the home page / courses screen
const UserSignOut = ({context}) => {
    context.actions.signOut();
    return(
        <Redirect to="/" />
    );
}

export default UserSignOut;
