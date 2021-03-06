import React from 'react'
import CourseGroup from './CourseGroup.js'


export default class CurrentPrereqs extends React.Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
        this.state = {
            prereqs: []
        }
    }

    componentDidMount(){
		this.loadData();
	}

    loadData(){
		
		fetch(`/api/courses/type/${this.props.course.courseType}/value/${this.props.course.courseValue}`).then(response => {
            console.log(`/api/courses/type/${this.props.course.courseType}/value/${this.props.course.courseValue}`)
            if(response.ok){
				response.json().then(data => {
					console.log("Total count of records: ", data._metadata.total_count);
					this.setState({prereqs: data.records});
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

    handleDelete(prereqToDelete) {
        console.log(`Delete ${JSON.stringify(prereqToDelete)} \nFrom ${JSON.stringify(this.props.course)}`)
        alert('handleDelete called')
    }
    
    render() {
        return(
            <div>
                <CourseGroup prereqs={this.state.prereqs} deletable={true} handleClick={this.handleDelete}/>
            </div>
        )
    }
}