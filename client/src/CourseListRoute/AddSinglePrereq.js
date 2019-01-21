import React from 'react'
import CourseGroup from './CourseGroup.js'

function PrereqTable(props) {
    let allCourses = props.allCourses.filter(course => 
        !(
            course.courseType === props.currentCourse.courseType &&
            course.courseValue === props.currentCourse.courseValue
        )
    )
    // filter out the 'OR' prerequisites
    let currentPrereqsArr = Array.from(props.currentPrereqs).filter(prereq => prereq.or == null)
    
    return (
        <div>
            <CourseGroup 
                prereqs={Array.from(allCourses).filter(course => currentPrereqsArr.includes(course) === false && course !== props.currentCourse)} 
                deletable={false} 
                handleClick={props.handleClick}/>
        </div>
    ) 
}

export default class AddSinglePrereq extends React.Component {
    constructor(props){
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.state = {
            availableCourses: [],
            allCourses: [], 
            currentPrereqs: []
        }
    }

    componentDidMount(){
		this.loadData();
	}

	loadData(){
        // get all courses
		fetch(`/api/courses/`).then(response => {
			if(response.ok){
				response.json().then(data => {
                    console.log("Total count of records: ", data._metadata.total_count);
                    this.setState({allCourses: data.records})
				});
			} else {
				response.json().then(error => {
					alert("Failed to fetch courses:" + error.message)
				});
			}
		}).catch(err => {
			alert("Error in fetching data from server:", err);
        });
        
        // get current prereqs
        fetch(`/api/courses/type/${this.props.course.courseType}/value/${this.props.course.courseValue}`).then(response => {
            if(response.ok){
				response.json().then(data => {
                    console.log("Total count of records: ", data._metadata.total_count);
					this.setState({currentPrereqs: data.records})
				});
			} else {
				response.json().then(error => {
					alert("Failed to fetch courses:" + error.message)
				});
			}
		}).catch(err => {
			alert("Error in fetching data from server:", err);
        });
    }

    /**
     *  handle the addition of single prerequisite - insert prerequisite with unique id as well
     *  use uniqid to create  prereqID 
     */
    handleAdd(prereqToAdd){
        alert('handleAdd called')
        console.log(`Add ${JSON.stringify(prereqToAdd)} \nTo ${JSON.stringify(this.props.course)}`)
    }

    render(){
        return(
            <div>
                <PrereqTable currentCourse={this.props.course} allCourses={this.state.allCourses} currentPrereqs={this.state.currentPrereqs} handleClick={this.handleAdd}/>
            </div>
        )
    }
}