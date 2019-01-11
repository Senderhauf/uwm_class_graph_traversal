import React from 'react';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { TextField, InputLabel, Select, Input, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


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

const styles = theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	formControl: {
	  margin: theme.spacing.unit,
	  minWidth: 160,
	}
  });

class CourseAdd extends React.Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			courseType:'',
			creditAmount:'',
			courseValue:''
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		Object.keys(this.state).map(x => console.log(`${x}: ${this.state[x]}`))
		//TODO
		this.props.createCourse(this.state)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
		//console.log(`${event.target.name}: ${event.target.value}`)
	}

	render() {
		const {classes} = this.props

		return(
			<form name="courseAdd" className={classes.root} autoComplete="off">
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="course-type-helper">Course Type</InputLabel>
					<Select 
						value={this.state.courseType}
						onChange={this.handleChange}
						input={<Input name="courseType" id="course-type"/>}
					>
						<MenuItem value={'compsci'}>COMPSCI</MenuItem>
						<MenuItem value={'math'}>MATH</MenuItem>
						<MenuItem value={'ger'}>GER</MenuItem>
					</Select>
				</FormControl>
				<TextField
					id="course-number"
					label="Course Value"
					className={classes.formControl}
					name="courseValue"
					onChange={this.handleChange}
				/>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="credit-amount-helper">Credit Amount</InputLabel>
					<Select 
						value={this.state.creditAmount}
						onChange={this.handleChange}
						input={<Input name="creditAmount" id="credit-amount"/>}

					>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={6}>6</MenuItem>
					</Select>					
				</FormControl>
				<Button
					id="add-course"
					onClick={this.handleSubmit}
				>
					Add Course
				</Button>

			</form>
		)

	}
}

export default withStyles(styles)(CourseAdd)