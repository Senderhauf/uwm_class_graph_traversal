import React from 'react'
import PrereqTableOrGroup from './PrereqTableOrGroup.js'

export default class AddOrGroupPrereq extends React.Component {
    constructor(props){
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.state = {
            availablePrereqCourses: [], 
            currentOrGroupPrereqs: []
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
                    console.log("Total count of courses: ", data._metadata.total_count);
                    this.setState({availablePrereqCourses: data.records.filter(course => 
                        !(
                            course.courseType === this.props.course.courseType &&
                            course.courseValue === this.props.course.courseValue
                        ) 
                    )})
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

					this.setState({currentOrGroupPrereqs: data.records.filter(x => x.or != null)})
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
     *  handle the addition of or group prerequisite - insert prerequisite with unique id as well
     *  use uniqid to create  prereqID 
     */
    handleAdd(prereqToAdd){
        console.log(`handleadd called: ${JSON.stringify(prereqToAdd)}`)
        
        //console.log(`Add ${JSON.stringify(prereqToAdd)} \nTo ${JSON.stringify(this.props.course)}`)

        // fetch(`/api/courses/addpreq/type/${this.props.course.courseType}/value/${this.props.course.courseValue}/`, {
        //     method: 'POST', 
        //     headers: {'Content-Type': 'application/json'}, 
        //     body: JSON.stringify(prereqToAdd)
        // }).then(response => {
        //     if(response.ok){
        //         let newCurrentPrereqs = this.state.currentOrGroupPrereqs+prereqToAdd
        //         console.log(`UPDATED STATE PREREQS: ${JSON.stringify(newCurrentPrereqs)}`)
        //         console.log(`UPDATED STATE PREREQS.LENGTH: ${newCurrentPrereqs.length}`)
        //         this.setState({currentOrGroupPrereqs: newCurrentPrereqs})
        //     }
        // }).catch(error => {
        //     console.log(`Error in handleAdd: ${error.message}`)
        // })
    }

    render(){
        return(
            <div>
                <PrereqTableOrGroup currentCourse={this.props.course} allCourses={this.state.availablePrereqCourses} currentOrGroupPrereqs={this.state.currentOrGroupPrereqs} handleAdd={this.handleAdd}/>
            </div>
        )
    }
}