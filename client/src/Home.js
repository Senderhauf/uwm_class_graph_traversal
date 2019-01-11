import React from 'react'
import {Link} from 'react-router-dom'




export default class Home extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <tr>
                    <td><Link to={'/course-map'}>Course Map</Link></td>
                    <td><Link to={'/course-add'}>Add A Course</Link></td>
                    <td><Link to={'/courses'}>Courses</Link></td>
                </tr>
                <div>
                    About Placeholder   
                </div>
            </div>
        )
    }
}