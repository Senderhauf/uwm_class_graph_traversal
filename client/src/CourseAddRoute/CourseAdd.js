import React from 'react';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { TextField, InputLabel, Select, Input, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
			courseValue:'', 
			prereqs:[]
		}
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.createCourse(this.state)

		this.setState({
			courseType:'',
			creditAmount:'',
			courseValue:'', 
		})

	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	render() {
		const {classes} = this.props
		return(
			<div>
				<h1>Course Add</h1>
				<form name="courseAdd" className={classes.root} autoComplete="off">
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="course-type-helper">Course Type</InputLabel>
						<Select 
							value={this.state.courseType}
							onChange={this.handleChange}
							input={<Input name="courseType" id="course-type"/>}
						>
							<MenuItem value={'COMPSCI'}>COMPSCI</MenuItem>
							<MenuItem value={'MATH'}>MATH</MenuItem>
							<MenuItem value={'ELECENG'}>ELECENG</MenuItem>
							<MenuItem value={'BIOSCI'}>BIOSCI</MenuItem>
							<MenuItem value={'PHYSICS'}>PHYSICS</MenuItem>
							<MenuItem value={'CHEM'}>CHEM</MenuItem>
							<MenuItem value={'GER'}>GER</MenuItem>
							<MenuItem value={'EAS'}>EAS</MenuItem>
						</Select>
					</FormControl>
					<TextField
						id="course-number"
						label="Course Value"
						className={classes.formControl}
						name="courseValue"
						value={this.state.courseValue}
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
						className={classes.formControl}
					>
						Add Course
					</Button>
				</form>
			</div>
		)

	}
}

export default withStyles(styles)(CourseAdd)