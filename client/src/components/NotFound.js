import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {


    render() {
      return(
        <div className="bounds">
            <div className="grid-100 pad-bottom">
                <h1>OOPS...</h1>
                <h2>The requested page can't be found!</h2>
            </div>

            <div className="grid-100 pad-bottom">
                <Link activeClassName="button" to="/"> Home </Link>
            </div>
        </div>
      )

    }
}

export default NotFound;
