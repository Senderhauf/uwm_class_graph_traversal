import React from 'react';
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

/*
export default class CourseAdd extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		var form = document.forms.courseAdd;
		this.props.createCourse({
			name: form.name.value, 
			credits: form.credits.value,
			prerequisites: form.prerequisites.value, 
			difficulty: form.difficulty.value
		});
		
		// clear the form for the next input
		form.name.value = ""; form.credits.value = ""; form.prerequisites.value = ""; form.difficulty.value = "";
	}

	render () {
		return (
			<div>
				<form name='courseAdd' onSubmit={this.handleSubmit}>
					<input type='text' name='name' placeholder='Course Name'/>
					<input type='text' name='credits' placeholder='Credits'/>
					<input type='text' name='prerequisites' placeholder='Prerequisites'/>
					<input type='text' name='difficulty' placeholder='Difficulty'/>
					<button>Add</button>
				</form>
			</div>
		)
	}
}
*/

export default class CourseAdd extends React.Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.state = {anchorE1: null}
	}

	handleSubmit(event) {
		event.preventDefault()
		
	}

	handleClick = event => {
		this.setState({anchorE1: event.currentTarget})
	}

	handleClose = () => {
		this.setState({ anchorE1: null})
	}

	render() {
		const {anchorE1} = this.state
		return(
			<div>
				<div>
					<Button 
						id="open-course-type"
						onClick={this.handleClick}
					>
						Course Type
					</Button>
					<Menu
						id="course-type"
						anchorEl={anchorE1}
						open={Boolean(anchorE1)}
						onClose={this.handleClose}
					>
						<MenuItem onClick={this.handleClose}>COMPSCI</MenuItem>
						<MenuItem onClick={this.handleClose}>MATH</MenuItem>
						<MenuItem onClick={this.handleClose}>GER</MenuItem>
					</Menu>
				</div>
			</div>
		)

	}
}
