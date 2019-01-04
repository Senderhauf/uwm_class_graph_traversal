import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import  CourseAdd from './CourseAdd.js'

const CourseRow = (props) => (
	<tr>
		<td><Link to={`/courses/${props.course._id}`}>{props.course._id.substr(-4)}</Link></td>
		<td>{props.course.name}</td>
		<td>{props.course.credits}</td>
		<td>{props.course.prerequisites}</td>
		<td>{props.course.difficulty}</td>
	</tr>
);

function CourseTable(props) {

		//const borderedStyle = {border: "1px solid silver", padding:6};
		const courseRows = props.courses.map(course => <CourseRow key={course._id} course={course}/>);

		return ( 
			<table className="bordered-table"/*style={{borderCollapse: "collapse"}}*/>
				<thead>
					<tr>
						<th>Course Name</th>
						<th>Credits</th>
						<th>Prerequisites</th>
						<th>Difficulty</th>
					</tr>
				</thead>
				<tbody>
					{courseRows}
				</tbody>
			</table>
		);
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

	// componentDidUpdate(prevProps){
	// 	const oldQuery = prevProps.location.query;
	// 	const newQuery = this.props.location.query;

	// 	if(oldQuery.status === newQuery.status){
	// 		return;
	// 	}

	// 	this.loadData();
	// }

	loadData(){
		
		fetch(`/api/courses`).then(response => {
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
		fetch('/api/courses', {
			method: 'POST', 
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newCourse)
		}).then(response => {
			if(response.ok){
                response.json()
				.then(updatedCourse => {
					const newCourses = this.state.courses.concat(updatedCourse);
					this.setState({courses: newCourses});
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
				<h1>Course Mapper</h1>
				<CourseTable courses={this.state.courses}/>
				<hr/>
				<CourseAdd createCourse={this.createCourse}/>
			</div>
		);
	}
}

CourseList.propTypes = {
	name: PropTypes.object.isRequired, 
	credits: PropTypes.object.isRequired, 
	router: PropTypes.object
}
