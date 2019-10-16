import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
  const context = props.context;
  const authUser = context.authenticatedUser;

  return(
    <div className='header'>
      <div className='bounds'>
        <h1 className="header--logo">Courses</h1>
        <nav>
          { authUser
            ? // the following code will run if a user is signed in
              <React.Fragment>
                <span>Welcome, {authUser.firstName} {authUser.lastName}</span>
                <Link className='signout' to="/signout">Sign Out</Link>
              </React.Fragment>
            : // or this code will run if no user is signed in
              <React.Fragment>
                  <Link className="signup" to="/signup">Sign Up</Link>
                  <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
          }
        </nav>
      </div>
    </div>
  )
}
export default Header;
