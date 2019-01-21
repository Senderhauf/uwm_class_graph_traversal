import React from 'react'
import {DeletableCourseChip, AddableCourseChip } from './CourseChip.js'

export default class CourseGroup extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let courseChips
        

        if (this.props.prereqs == null){
            courseChips = <p>No Courses Available</p>
        }
        else {
            if(this.props.deletable){
                courseChips = this.props.prereqs.map((course,i) => <DeletableCourseChip key={i} course={course} onDelete={this.props.handleClick}/>)
            }
            else {
                courseChips = this.props.prereqs.map((course,i) => <AddableCourseChip key={i} course={course} onDelete={this.props.handleClick}/>)
            }
        }
        return(
            <div>
                {courseChips}
            </div>
        )
    }
}
