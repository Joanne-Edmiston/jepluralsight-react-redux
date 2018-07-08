import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.course.id != nextProps.course.id){ // check is required because props may not have changed

            // necessary to populate form when existing course is loaded dierctly
            this.setState({ course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event){
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;

        return this.setState({course: Object.assign({}, course)});
    }

    saveCourse(event){
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render(){
        return(
            <CourseForm 
                allAuthors= {this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors} />
        );
    }
}

function getCourseByID(courses, courseID){
    const matchingCourses = courses.filter((course) => course.id === courseID);

    if(matchingCourses) return matchingCourses[0];
    return null;
}

function mapStateToProps(state, ownProps){

    const courseID = ownProps.params.id;

    let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseID && state.courses.length > 0){
        course = getCourseByID(state.courses, courseID);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}


function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

ManageCoursePage.propTypes = {
    authors: PropTypes.array,
    course: PropTypes.object.isRequired,
    errors: PropTypes.string,
    actions: PropTypes.object.isRequired
};

//Pull in the react router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);