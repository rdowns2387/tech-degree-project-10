/******************************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: UpdateCourse <<<

Renders a form allowing a user to update one of their existing courses, an
"Update Course" button that when clicked sends a PUT request to the REST
API's /api/courses/:id route, and a "Cancel" button that returns the
user to the "Course Detail" screen.
********************************************************************************/

import React,{Component} from 'react';

class UpdateCourse extends Component {

    componentDidMount() {
        const { context } = this.props;
        const pathID = this.props.match.params.id;
        const authUserID = context.authenticatedUser.id;
        context.data.getCourse(pathID)
            .then( (data) => {
                if (authUserID !== data.User.id) // authenticated user doesn't own the course
                    this.props.history.push("/forbidden");
                else {  // authenticated user owns the course
                    const {id,title,description,estimatedTime,materialsNeeded} = data;
                    this.setState({ id,title,description,estimatedTime,materialsNeeded });
                }
            })
            .catch( (error) => {  // errors have been found
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path);
            });
    }

    state = {
        id:'',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    };

    // methods that respond to changes in the component state.
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    }
    handleEstimatedTimeChange = (e) => {
        this.setState({estimatedTime: e.target.value})
    }
    handleMaterialsNeededChange = (e) => {
        this.setState({materialsNeeded: e.target.value})
    }

    // this method respond to the "Update Course" button click event handler.
    handleSubmit = (e) => {
        e.preventDefault();
        const {id,title,description,estimatedTime,materialsNeeded} = this.state;
        const {context} = this.props;
        const {emailAddress} = context.authenticatedUser;
        const userId = context.authenticatedUser.id;
        const password = context.originalPassword;
        const body = {userId,title,description,estimatedTime,materialsNeeded}

        context.data.updateCourse(id, body, emailAddress, password)
            .then( (errors) => {
                if (errors.length)  // validation errors have been found.
                    this.setState({errors});
                else {    // the course has been successfully updated.
                    this.props.history.push("/");
                    console.log('Course has been successfully updated.');
                }
            })
            .catch( (error) => {  // errors which are not validation-related have been found.
                console.log(error);
                this.props.history.push('/error');
            });
    }

    // this method redirects back to the home page (list of courses)
    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/courses/${this.state.id}`);
    }

    render () {
        const { context } = this.props;
        const {firstName,lastName} = context.authenticatedUser;
        const {title,description,estimatedTime,materialsNeeded,errors} = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>

                {/* Validation errors will be showed only if exist. */}
                {errors.length > 0 &&
                    <div className="validation-errors">
                        <h2 className="validation--errors--label"> Validation Errors : </h2>
                        <ul>
                            {errors.map( (error,index) => {
                                return <li key={index}> {error} </li>
                            })}
                        </ul>
                    </div>
                }

                <form onSubmit={this.handleSubmit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="input-title course--title--input"
                                placeholder="Course title..."
                                value={title}
                                onChange={this.handleTitleChange}
                            />
                            <p>By {firstName} {lastName} </p>
                        </div>
                        <div className="course--description">
                            <textarea
                                id="description"
                                name="description"
                                className=""
                                placeholder="Course description..."
                                value={description}
                                onChange={this.handleDescriptionChange}
                            />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        className="course--time--input"
                                        placeholder="Hours"
                                        value={(estimatedTime) ? estimatedTime : ""}
                                        onChange={this.handleEstimatedTimeChange}
                                    />

                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        className=""
                                        placeholder="List materials..."
                                        value={(materialsNeeded) ? materialsNeeded : ""}
                                        onChange={this.handleMaterialsNeededChange}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel} >Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UpdateCourse;
