import React from 'react';
import {fetch} from 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Card, CardContent, CardActions} from '@material-ui/core'


import './CourseList.css'
import CourseAdd from '../CourseAddRoute/CourseAdd.js'
import PrereqsDialog from './PrereqsDialog.js'

const CourseCard = (props) => (
	<Card>
		<CardContent>
			<Link to={`/courses/${props.course._id}`}>{props.course.courseType} {props.course.courseValue}</Link>
			<p>{props.course.creditAmount}</p>
			<PrereqsDialog course={props.course}></PrereqsDialog>
		</CardContent>
	</Card>
);

function CourseTable(props) {
		const sortedCourses = Array.from(props.courses).sort(compare).sort((a, b) => {return a.courseValue - b.courseValue})
		const courseRows = sortedCourses.map(course => <div className="column"><CourseCard classname="card" key={course._id} course={course} /></div>);

		return ( 
			<div className="row">
				{courseRows}
			</div>
		);
}

function compare(a,b) {
	if (a.courseType < b.courseType)
    	return -1;
  	if (a.courseType > b.courseType)
    	return 1;
  	return 0;
}

export default class CourseList extends React.Component {
	constructor(){
		super();
		this.state = {courses: []};
		this.createCourse = this.createCourse.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}

	loadData(){
		
		fetch(`/api/courses/`).then(response => {
			if(response.ok){
				response.json().then(data => {
					console.log("Total count of records: ", data._metadata.total_count);
					this.setState({courses: data.records});
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

	createCourse(newCourse){
		console.log(`createCourse newCourse: ${JSON.stringify(newCourse)}`)
		fetch('/api/courses/', {
			method: 'POST', 
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newCourse)
		}).then(response => {
			
			if(response.ok){
				response.json().then(updatedCourse => {
					console.log(`createCourse newCourse: ${updatedCourse}`)
					const newCourses = this.state.courses.concat(updatedCourse);
					this.setState({courses: newCourses});
				}).catch(error => {
					alert(`json error CourseList.js: ${error}`)
				})
			}
			else{
				response.json().then(error =>{
					alert("Failed to add course: " + error.message);
				});
			}
		}).catch(err => {
			alert("Error sending data to server" + err.message);
		});
	}

	render() {
		return (
			<div>
				<CourseAdd createCourse={this.createCourse}/>
				<hr/>
				<h1>Course List</h1>
				<CourseTable courses={this.state.courses} loadData={this.loadData}/>				
			</div>
		);
	}
}

CourseList.propTypes = {
	courseType: PropTypes.object.isRequired, 
	courseValue: PropTypes.object.isRequired, 
	creditAmount: PropTypes.object.isRequired, 
	router: PropTypes.object
}
