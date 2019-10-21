import React,{Component} from 'react';

class DeleteCourse extends Component {

    componentDidMount() {
        const { context } = this.props;
        const pathID = this.props.match.params.id;
        const authUserID = context.authenticatedUser.id;
        context.data.getCourse(pathID)
            .then( (data) => {
                if (authUserID !== data.User.id)
                    this.props.history.push("/forbidden");
                else
                    this.setState({courseTitle: data.title});

            })
            .catch( (error) => {
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path);
            });
    }

    state = {
        courseTitle: '',
        confirmTitle: '',
        error: ''
    };

    handleConfirmTitleChange = (e) => {
        this.setState({confirmTitle: e.target.value})
    }

    // Deletes the course based on authentication
    handleSubmit = (e) => {
        e.preventDefault();
        const courseID = this.props.match.params.id;
        const { context } = this.props;
        const {emailAddress} = context.authenticatedUser;
        const password = context.originalPassword;
        const {confirmTitle,courseTitle} = this.state;

        //confirmation to delete
        if (confirmTitle === courseTitle) {
            context.data.deleteCourse(courseID, emailAddress, password)
            .then( () => {
                console.log('Course has been successfully deleted.');
                this.setState({ error: '' });
                this.props.history.push("/");
            })
            .catch( (error) => {
                const path = (error.name === 'notFound') ? "/notfound" : "/error";
                this.props.history.push(path);
            });
        }
        else {
            const message = `Course title in the confirmation box doesn't match the target course's title.`;
            this.setState({error: message });
        }
    }

    // Cancel button goes back to course details page
    handleCancel = (e) => {
        e.preventDefault();
        const pathID = this.props.match.params.id;
        this.props.history.push(`/courses/${pathID}`);
    }

    render () {
        const {confirmTitle,courseTitle,error} = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Warning!</h1>
                <p>
                    This action will delete the <b> '{courseTitle}' </b> course.
                    Once it is deleted, it <b> CANNOT </b> be recovered.
                </p>
                <p>
                    Please type the course title below to confirm the deletion:
                </p>

                
                { (error !== '') && (courseTitle !== confirmTitle) &&
                    <div className="validation-errors">
                        <h3> {error} </h3>
                    </div>
                }

                <form onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <div className="course--title">
                            <input
                                id="title"
                                name="title"
                                className="input-title course--title--input"
                                placeholder="Confirm title..."
                                value={confirmTitle}
                                onChange={this.handleConfirmTitleChange}
                            />
                        </div>
                    </div>

                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit"> Delete Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel} >Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default DeleteCourse;
