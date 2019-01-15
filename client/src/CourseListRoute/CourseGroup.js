import React from 'react'
import {DeletableCourseChip, AddableCourseChip } from './CourseChip.js'

export default class CourseGroup extends React.Component {
    constructor(props) {
        super(props)
    }

    handleDelete() {
        alert('You clicked the delete icon.')
    }

    handleAdd() {
        alert('You clicked the add icon')
    }

    /**
     * Add clicked chip to prerequisite group if not already added
     */
    handleClick() {
        alert('You clicked the chip.')
    }

    render() {
        let courseChips, deletable 
        

        if (this.props.prereqs == null){
            courseChips = <p>No Courses Available</p>
        }
        else {
            if(this.props.deletable){
                courseChips = this.props.prereqs.map(course => <DeletableCourseChip key={course._id} course={course} onDelete={this.handleDelete}/>)
            }
            else {
                courseChips = this.props.prereqs.map(course => <AddableCourseChip key={course._id} course={course} onDelete={this.handleDelete}/>)
            }
        }
        return(
            <div>
                {courseChips}
            </div>
        )
    }
}
