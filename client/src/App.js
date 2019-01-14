import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, withRouter, Link} from 'react-router-dom';

import CourseAdd from './CourseAddRoute/CourseAdd.js'
import CourseList from './CourseListRoute/CourseList.js'
import CourseMap from './CourseMapRoute/CourseMap.js'
import CourseGraph from './CourseGraphRoute/CourseGraph.js'


const NoMatch = () => <p>Page Not Found</p>

const Seperator = () => {return(<p>   |   </p>)}

const Home = () => (
  <div>
    <h1>Home</h1>
    {/* <tr>
        <td><Link to={'/course-map'}>Course Map</Link></td>
        <Seperator/>
        <td><Link to={'/course-add'}>Add A Course</Link></td>
        <Seperator/>
        <td><Link to={'/courses'}>Courses</Link></td>
    </tr> */}
    <div>
        About Placeholder   
    </div>
    <hr/>
    <CourseMap/>
    <hr/>
    <CourseGraph width={window.innerWidth} height={window.innerHeight/2}/>
    <hr/>
    <CourseList/>
  </div>  
)

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
              <Route path="/course-map" component={withRouter(CourseMap)}/>
              <Route path="/course-add" component={withRouter(CourseAdd)}/>
              <Route path="/courses" component={withRouter(CourseList)}/>
              <Route path="/" component={withRouter(Home)}/>
              <Route path="*" component={NoMatch}/>
          </Switch>
        </BrowserRouter>

      </div>


    );
  }
}

