import React, { Children } from 'react'
import Chip from '@material-ui/core/Chip'
import Fab from '@material-ui/core/Fab'


class ChipOrGroup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isSelected: false
        }
    }

    handleChipClickColor(course){
        this.props.onClick(course)
        this.setState({isSelected: !this.state.isSelected})
    }

    render() {
        
        return(
            <Chip
                color={this.state.isSelected ? 'secondary': 'primary'}
                style={{margin: '10px'}}
                label={this.props.course.courseType+' '+this.props.course.courseValue}
                onClick={() => this.handleChipClickColor(this.props.course)}
                variant="outlined"
                key={this.props.key}
            />  
        )
    }
}

export default class PrereqTableOrGroup extends React.Component {
    // <PrereqTableOrGroup currentCourse={this.props.course} allCourses={this.state.allCourses} currentOrGroupPrereqs={this.state.currentOrGroupPrereqs} handleClick={this.handleAdd}/>
    constructor(props){
        super(props)
        this.handleChipClick = this.handleChipClick.bind(this)
        this.state = {
            selectedCourses: []
        }
    }
    
    handleChipClick(course){
        //console.log(`SELECTED OR GROUP COURSES: ${JSON.stringify(this.state.selectedCourses)}`)
        let updatedSelectedCourses = this.state.selectedCourses

        if (this.state.selectedCourses.filter(x => x.courseValue == course.courseValue && x.courseType == course.courseType).length > 0 ){
            updatedSelectedCourses = this.state.selectedCourses.filter(x => x.courseValue != course.courseValue && x.courseType != course.courseType)
        }
        else {
            updatedSelectedCourses.push(course)
        }
        this.setState({selectedCourses: updatedSelectedCourses})
    }

    render(){
        return (
            <div>
                <div>
                    <Fab color='secondary' aria-label='Add Selected' variant='extended' style={{margin: '10px'}} onClick={() => this.props.handleAdd(this.state.selectedCourses)}>Add Selected As Group</Fab>
                </div>
                <div>
                    {this.props.allCourses.map((course,i) => 
                        {
                            let isSelected = false
                            if (this.state.selectedCourses.filter(x => x.courseValue == course.courseValue && x.courseType == course.courseType).length > 0 ) {
                                isSelected = true
                            }
                            
                            return <ChipOrGroup key={i} course={course} onClick={this.handleChipClick} isSelected={false}/>
                        }
                    )}
                </div>
            </div>
        )
    }
}

