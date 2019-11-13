import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ListTest from "../pages/list/ListTest"
import ListQuestion from "../pages/list/ListQuestion"
import EditTest from "../pages/edit/EditTest"
import EditQuestion from "../pages/edit/EditQuestion"
import AddTest from "../pages/add/AddTest"
import AddQuestion from "../pages/add/AddQuestion"
import Login from '../pages/login/Login'
import NotFoundScreen from "../components/NotFoundScreen"
import { connect } from "react-redux"

class PageLayout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/test' component={ListTest} exact />
          <Route path='/question' component={ListQuestion} exact />
          <Route path='/test/edit/:testId' component={EditTest} exact />
          <Route path='/question/edit/:questionId' component={EditQuestion} exact />
          <Route path='/test/create' component={AddTest} exact />
          <Route path='/question/create' component={AddQuestion} exact />
          <Route component={NotFoundScreen} />
        </Switch>
      </BrowserRouter>
    )
  }
}



export default connect()(PageLayout)
