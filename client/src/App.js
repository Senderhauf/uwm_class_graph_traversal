import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';

import CourseAdd from './CourseAddRoute/CourseAdd.js'
import CourseList from './CourseListRoute/CourseList'
import CourseMap from './CourseMapRoute/CourseMap'
import Home from './Home.js'

const NoMatch = () => <p>Page Not Found</p>

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/course-map" component={withRouter(CourseMap)}/>
            <Route path="/course-add" component={withRouter(CourseAdd)}/>
            <Route path="/courses" component={withRouter(CourseList)}/>
            <Route path="/" component={withRouter(Home)}/>
            <Route path="*" component={NoMatch}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

