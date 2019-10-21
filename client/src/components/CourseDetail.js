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
            .then( (data) => {
                this.setState({ courseDetail: data })
                this.setState({ userDetail: data.User })
            })
            .catch( (error) => {
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path);
            });
    }

    render() {
        let {id} = this.props.match.params;
        const {title,description,estimatedTime,materialsNeeded} = this.state.courseDetail;
        const {firstName, lastName} = this.state.userDetail;
        const {context} = this.props;

        //react markdown to format materials needed and description text
        const ReactMarkdown = require('react-markdown/with-html');

        return (
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
                             <ReactMarkdown source={description} />
                        </div>
                    </div>

                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3> {estimatedTime} </h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            <ReactMarkdown source={materialsNeeded} />
                                        </ul>
                                    </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CourseDetail;
