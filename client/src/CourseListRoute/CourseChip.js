import React from 'react'
import Chip from '@material-ui/core/Chip'
import Delete from '@material-ui/icons/CloseRounded'
import Add from '@material-ui/icons/AddRounded'

export function DeletableCourseChip(props) {
    
    
    return (
        <Chip
            label={props.course.courseType+' '+props.course.courseValue}
            onDelete={() => {alert('You clicked the delete icon.')}}
            onClick={props.handleClick}
            deleteIcon={<Delete />}
            variant="outlined"
            clickable={true}
        />
    )
}

export function AddableCourseChip(props) {
    
    
    return (
        <Chip
            label={props.course.courseType+' '+props.course.courseValue}
            onDelete={() => {alert('You clicked the add icon.')}}
            onClick={props.handleClick}
            deleteIcon={<Add />}
            variant="outlined"
            clickable={true}

        />
    )
}