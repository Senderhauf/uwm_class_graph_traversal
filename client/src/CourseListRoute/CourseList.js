import React from 'react';
import {fetch} from 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import  CourseAdd from '../CourseAddRoute/CourseAdd.js'

const styles = theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	courseRow: {
	  margin: theme.spacing.unit,
	  minWidth: 200,
	}
  });

const CourseRow = (props) => (
	<tr>
		<td><Link to={`/courses/${props.course._id}`}>{props.course.courseType} {props.course.courseValue}</Link></td>
		<td className={styles.courseRow}>{props.course.creditAmount}</td>
		<td>{props.course.prerequisites}</td>
	</tr>
);

function CourseTable(props) {

		//const borderedStyle = {border: "1px solid silver", padding:6};
		const courseRows = props.courses.map(course => <CourseRow key={course._id} course={course} />);

		return ( 
			
			<table>
				<thead>
					<tr>
						<th>Course</th>
						<th>Credits</th>
						<th>Prerequisites</th>
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
				<CourseTable courses={this.state.courses}/>				
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
