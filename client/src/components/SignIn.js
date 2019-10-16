import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SignIn extends Component {

    state = {
        emailAddress: '',
        password: '',
        errors: []
    };

    // methods that respond to changes in the component state.
    handleEmailAddressChange = (e) => {
        this.setState({emailAddress: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    // this method respond to the "Sign In" button click event handler.
    handleSubmit = (e) => {
        e.preventDefault();
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress,password)
            .then( (userData) => {
                if (userData === null) {  // user hasn't been authenticated.
                    this.setState( () => {
                        return {errors: [ 'Sign-in was unsuccessful' ]};
                    });
                }
                else {  // user has been authenticated.
                    this.props.history.push(from);   // go back to the last page visited befor sign-in
                    console.log(`SUCCESS! ${userData.emailAddress} is now signed in!`);
                }
            })
            .catch( (err) => {  // unexpected error has been found.
                console.log(err);
                this.props.history.push('/error');
            })

    }

    // this method redirects back to the home page (list of courses)
    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    render() {
        const {emailAddress,password,errors} = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>

                    {/* Validation errors will be showed only if exist. */}
                    {errors.length > 0 &&
                        <div className="validation-errors">
                            <div>
                                <h2 className="validation--errors--label"> Validation Errors : </h2>
                                <ul>
                                    {errors.map( (error,index) => {
                                        return <li key={index}> {error} </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    }

                    <React.Fragment>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    className=""
                                    placeholder="Email Address"
                                    value={emailAddress}
                                    onChange={this.handleEmailAddressChange}
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className=""
                                    placeholder="Password"
                                    value={password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.handleCancel} > Cancel</button>
                            </div>
                        </form>
                    </React.Fragment>
                <p>&nbsp;</p>
                <p>
                    Don't have a user account?
                    <Link to="/signup"> Click here</Link> to sign up!
                </p>
                </div>
            </div>
        );
    }
}

export default SignIn;
