import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect, withRouter} from 'react-router-dom';

import CourseList from './CourseList.js'

const NoMatch = () => <p>Page Not Found</p>

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/courses" component={withRouter(CourseList)}/>
            <Redirect from="/" to="/courses"></Redirect>
            <Route path="*" component={NoMatch}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

