
import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    const context = props.context;
    const authUser = context.authenticatedUser;

    //persistent header that shows signout button if a user is already authenticated; otherwise shows Sign Up / Sign In buttons
    return(
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    {   authUser
                    ?
                        <React.Fragment>
                            <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                            <Link className="signout" to="/signout">Sign Out</Link>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </React.Fragment>
                    }
                </nav>
            </div>
        </div>
    );
}



export default Header;
