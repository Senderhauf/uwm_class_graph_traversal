import React from 'react'
import {Chip} from '@material-ui/core'


const CourseChip = (props)  => {

    return (
        <Chip
            label={props.course.courseType+' '+props.course.courseValue}
        >
        </Chip>
    )
}



export default class CourseGroup extends React.Component {
    constructor(props) {
        super(props)
    }

    /**
     * Delete chip from prequisites if in prerequisite group
     */
    handleDelete() {

    }

    /**
     * Add clicked chip to prerequisite group if not already added
     */
    handleClick() {
        
    }

    render() {
        let courseChips 

        if (this.props.prereqs == null){
            courseChips = <p>No Current Prerequisites Added</p>
        }
        else {
            courseChips = this.props.prereqs.map(course => <CourseChip key={course._id} course={course}/>)
        }
        return(
            <div>
                {courseChips}
            </div>
        )
    }
}