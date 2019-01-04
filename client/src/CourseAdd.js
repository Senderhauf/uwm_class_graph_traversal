import React from 'react';

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