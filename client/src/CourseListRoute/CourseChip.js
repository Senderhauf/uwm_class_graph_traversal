import React from 'react'
import Chip from '@material-ui/core/Chip'
import Delete from '@material-ui/icons/CloseRounded'
import Add from '@material-ui/icons/AddRounded'
import CourseGroup from './CourseGroup.js'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { Typography, Card, CardContent, CardHeader, Avatar, IconButton } from '@material-ui/core';

export function DeletableCourseChip(props) {
    let orGroup = (props.course.or != null)
    
    if (orGroup) {
        let orCourses = props.course.or
        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar style={{backgroundColor:'orange'}}>
                            OR
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <DeleteIcon
                                onClick={() => props.onDelete(props.course)}
                            />
                        </IconButton>
                    }
                >
                </CardHeader>
                <CardContent>
                    <CourseGroup prereqs={orCourses} deletable={true}/>
                </CardContent>
            </Card>
        )
    } 
    else {
        return (
            <Chip
                label={props.course.courseType+' '+props.course.courseValue}
                onDelete={() => props.onDelete(props.course)}
                deleteIcon={<Delete />}
                variant="outlined"
            />
        )
    }
}

export function AddableCourseChip(props) {
    return (
        <Chip
            label={props.course.courseType+' '+props.course.courseValue}
            onDelete={() => props.onDelete(props.course)}
            deleteIcon={<Add />}
            variant="outlined"
        />
    )
}