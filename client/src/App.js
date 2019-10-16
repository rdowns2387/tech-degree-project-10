import './styles/global.css';

import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';

//Context!
import withContext from './Context';

//Private Routes
import PrivateRoute from './PrivateRoute';






// allow components to consume API Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
// const DeleteCourseWithContext = withContext(DeleteCourse);
const SignUpWithContext = withContext(SignUp);
const SignInWithContext = withContext(SignIn);
const SignOutWithContext = withContext(SignOut);

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div id="root">
        <div>
          <HeaderWithContext />
          <Switch>
            <Route exact path='/' component={ CoursesWithContext }/>
            <Route path='/courses/:id' component={CourseDetailWithContext} />
            <Route path='/courses/create' component={CreateCourseWithContext} />
            <Route path='/signup' component={SignUpWithContext} />
            <Route path='/signin' component={SignInWithContext} />
            <Route path='/signout' component={SignOutWithContext} />
            <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
            <Route path='/notfound' component={NotFound}/>
            <Redirect to ='/notfound'/>
          </Switch>
        </div>
      </div>
      </BrowserRouter>
  );
  }
}

export default App;
