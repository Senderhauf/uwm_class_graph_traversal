import React from 'react'
import CourseGroup from './CourseGroup.js'

function PrereqTable(props) {

    console.log(`currentPrereqs: ${JSON.stringify(props.currentPrereqs)}`)
    console.log(`allCourses: ${JSON.stringify(props.allCourses)}`)
    // filter out the 'OR' prerequisites
    let currentPrereqsArr = Array.from(props.currentPrereqs).filter(prereq => prereq.or == null)
    console.log(`currentPrereqsArr: ${currentPrereqsArr}`)
    //this.setState({availableCourses:Array.from(this.props.allCourses).filter(course => currentPrereqsArr.includes(course) === false) })

    return (
        <div>
            <CourseGroup prereqs={Array.from(props.allCourses).filter(course => currentPrereqsArr.includes(course) === false)} deletable={false}/>
        </div>
    ) 
}

export default class AddSinglePrereq extends React.Component {
    constructor(props){
        super(props)
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
    
    findAvailablePrereqs(){
        console.log(`currentPrereqs: ${JSON.stringify(this.state.currentPrereqs)}`)
        console.log(`allCourses: ${JSON.stringify(this.state.allCourses)}`)
        // filter out the 'OR' prerequisites
        let currentPrereqsArr = Array.from(this.state.currentPrereqs).filter(prereq => prereq.or == null)
        console.log(`currentPrereqsArr: ${currentPrereqsArr}`)
        this.setState({availableCourses:Array.from(this.state.allCourses).filter(course => currentPrereqsArr.includes(course) === false) })
    }

    render(){
        
        
        return(
            <div>
                <PrereqTable allCourses={this.state.allCourses} currentPrereqs={this.state.currentPrereqs}/>
            </div>
        )
    }
}