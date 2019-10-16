/************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: CourseDetails <<<

Retrieves the detail for a course from the REST API,
renders the course details, an "Update Course" button for navigating to
the "Update Course" screen, and a "Delete Course" button for navigating to
the "Delete Course" screen.
************************************************************************/

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CourseDetail extends Component {

    state = {
        courseDetail: {},
        userDetail: {}
    };

    componentDidMount() {
        const { context } = this.props;
        context.data.getCourse(this.props.match.params.id)
            .then( (data) => {   // a course has been successfully fetched.
                this.setState({ courseDetail: data })
                this.setState({ userDetail: data.User })
            })
            .catch( (error) => {  // an error has been occoured.
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path);
            });
    }

    render() {
        let {id} = this.props.match.params;
        const {title,description,estimatedTime,materialsNeeded} = this.state.courseDetail;
        const {firstName, lastName} = this.state.userDetail;
        const {context} = this.props;

        return (
            //display update and delete buttons if a user is logged in
            <React.Fragment>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            { (context.authenticatedUser)
                                && (context.authenticatedUser.id === this.state.userDetail.id)
                                    &&  <React.Fragment>
                                            <Link
                                                className="button"
                                                to={{
                                                    pathname: `/courses/${id}/update`,
                                                    state: {id,title,description,estimatedTime,materialsNeeded}
                                                }}> Update Course
                                            </Link>
                                            <Link
                                                className="button"
                                                to={{
                                                    pathname: `/courses/${id}/delete`,
                                                    state: {id,title,description,estimatedTime,materialsNeeded}
                                                }}> Delete Course
                                            </Link>
                                        </React.Fragment>
                                }

                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>

                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{title}</h3>
                            <p>By {firstName} {lastName} </p>
                        </div>

                        <div className="course--description">
                             <p> {description} </p>
                        </div>
                    </div>

                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">

                                {/* Estimated time of the course will be shown only if it exists */}
                                { estimatedTime !== null && estimatedTime !== '' &&
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3> {estimatedTime} </h3>
                                    </li>
                                }

                                {/* Materials needed for the course will be shown only if they exist */}
                                { materialsNeeded !== null && materialsNeeded !== '' &&
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            <li>{materialsNeeded} </li>
                                        </ul>
                                    </li>
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CourseDetail;
