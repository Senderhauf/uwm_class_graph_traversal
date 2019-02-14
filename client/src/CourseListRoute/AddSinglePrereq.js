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

    let passedPrereqs = allCourses.filter(course => {
        if ( currentPrereqsArr.filter(x => x.courseType === course.courseType && x.courseValue === course.courseValue).length == 0){
            return true
        }
        else {
            return false
        }
        
    })
    
    return (
        <div>
            <CourseGroup 
                prereqs={passedPrereqs} 
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
            allCourses: [], 
            currentPrereqs: []
        }
    }

    componentDidMount(){
		this.loadData();
	}

    // componentDidUpdate(prevProps, prevState){
    //     //console.log(`RERENDER PRECONDITIONAL: ${this.state.currentPrereqs.length} !== ${prevState.currentPrereqs.length}`)
    //     if(this.state.currentPrereqs.length !== prevState.currentPrereqs.length){
    //         //console.log('RERENDERING')
    //         this.loadData();
    //     }
    // }

	loadData(){
        // get all courses
		fetch(`/api/courses/`).then(response => {
			if(response.ok){
				response.json().then(data => {
                    console.log("Total count of courses: ", data._metadata.total_count);
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
                    console.log("Total count of prereqs: ", data._metadata.total_count);
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
        console.log(`Add ${JSON.stringify(prereqToAdd)} \nTo ${JSON.stringify(this.props.course)}`)

        fetch(`/api/courses/addpreq/type/${this.props.course.courseType}/value/${this.props.course.courseValue}/`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(prereqToAdd)
        }).then(response => {
            if(response.ok){
                let newCurrentPrereqs = this.state.currentPrereqs+prereqToAdd
                console.log(`UPDATED STATE PREREQS: ${JSON.stringify(newCurrentPrereqs)}`)
                console.log(`UPDATED STATE PREREQS.LENGTH: ${newCurrentPrereqs.length}`)
                this.setState({currentPrereqs: newCurrentPrereqs})
            }
        }).catch(error => {
            console.log(`Error in handleAdd: ${error.message}`)
        })
    }

    render(){
        return(
            <div>
                <PrereqTable currentCourse={this.props.course} allCourses={this.state.allCourses} currentPrereqs={this.state.currentPrereqs} handleClick={this.handleAdd}/>
            </div>
        )
    }
}