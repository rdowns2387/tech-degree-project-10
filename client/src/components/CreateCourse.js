/**************************************************************
Treehouse FSJS Techdegree:
Project 10 - Full Stack App with React and a REST API
Name: Snir Holland
Date: 01/10/2019

>>> Component: CreateCourse <<<

Renders a form allowing a user to create a new course, a "Create Course"
button that when clicked sends a POST request to the REST API's
/api/courses route, and a "Cancel" button that returns the user
to the default route (i.e. the list of courses).
***************************************************************/

import React,{Component} from 'react';

class CreateCourse extends Component {

    state = {
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

    // this method respond to the "Create Course" button click event handler.
    handleSubmit = (e) => {
        e.preventDefault();
        const {title,description,estimatedTime,materialsNeeded} = this.state;
        const { context } = this.props;
        const {emailAddress} = context.authenticatedUser;
        const userId = context.authenticatedUser.id;
        const password = context.originalPassword;
        const body = {userId,title,description,estimatedTime,materialsNeeded};

        context.data.createCourse(body, emailAddress, password)
            .then( (errors) => {
                if (errors.length)   // validation errors have been found.
                    this.setState({errors});
                else {  // the new course has been created successfully.
                    this.props.history.push("/");
                    console.log('Course has been successfully created.');
                }
            })
            .catch( (error) => {  // errors which are not validation-related have been found.
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path);
            });
    }

    // this method redirects back to the home page (list of courses)
    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }

    render() {
        const {title,description,estimatedTime,materialsNeeded,errors} = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>

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
                            <p>By Joe Smith</p>
                        </div>
                        <div className="course--description">
                            <textarea
                                id="description"
                                name="description"
                                className=""
                                placeholder="Course description..."
                                value={description}
                                onChange={this.handleDescriptionChange}>
                            </textarea>
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
                                        value={estimatedTime}
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
                                        value={materialsNeeded}
                                        onChange={this.handleMaterialsNeededChange}>
                                    </textarea>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Create Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateCourse;
