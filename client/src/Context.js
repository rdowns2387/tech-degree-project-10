import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {

  state = {
      authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
      originalPassword : Cookies.get('originalPassword') || '',
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser,originalPassword} = this.state;

    const value = {
        authenticatedUser,
        originalPassword,
        data: this.data,
        actions: {
            signIn: this.signIn,
            signOut: this.signOut
        }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  // signs in user
  signIn = async (emailAddress, password) => {
    this.setState({originalPassword: password});
    const userData = await this.data.getUser(emailAddress,password);  // get user details
    if (userData !== null) {  // user has been found.
        this.setState( () => {
            return {
                authenticatedUser: userData,
                originalPassword: password
            };
        });
        Cookies.set('authenticatedUser',JSON.stringify(userData), { expires: 1 });
        Cookies.set('originalPassword',password,{expires: 1});
    }
    return userData;
  }

  // signs out the user
  signOut = () => {
    this.setState({
      authenticatedUser: null,
      originalPassword: '',
    });
    Cookies.remove('authenticatedUser');
    Cookies.remove('originalPassword');
  }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
