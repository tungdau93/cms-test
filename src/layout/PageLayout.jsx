import React, { Component } from 'react'
import HeaderComp from "../components/HeaderComp"
import SideBar from "../components/SideBar"
import FooterComp from "../components/FooterComp"
import { Table, Layout } from 'antd'
import 'antd/dist/antd.css'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ListTest from "../pages/list/ListTest"
import ListQuestion from "../pages/list/ListQuestion"
import EditTest from "../pages/edit/EditTest"
import EditQuestion from "../pages/edit/EditQuestion"
import AddTest from "../pages/add/AddTest"
import AddQuestion from "../pages/add/AddQuestion"
import NotFoundScreen from "../components/NotFoundScreen"
import PostTypes from "../redux/sideBar-redux"
import { connect } from "react-redux"

const { Content } = Layout

class PageLayout extends Component {
  render() {
    return (
      <Layout>
        <SideBar></SideBar>
        <Layout
          style={
            this.props.collapsed ? { marginLeft: '100px', transition: 'all 0.4s' } : { marginLeft: '200px', transition: 'all 0.4s' }
          }
        >
          <HeaderComp />
          <Content style={{height: '100vh'}}>
            <BrowserRouter>
              <Switch>
                <Route path='/tests' component={ListTest} exact />
                <Route path='/questions' component={ListQuestion} exact />
                <Route path='/edit/test/:testId' component={EditTest} exact />
                <Route path='/edit/question/:questionId' component={EditQuestion} exact />
                <Route path='/create/test' component={AddTest} exact />
                <Route path='/create/question' component={AddQuestion} exact />
                <Route component={NotFoundScreen} exact />
              </Switch>
            </BrowserRouter>
          </Content>
          <FooterComp />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  collapsed: state.collapsed.collapsed
})

export default connect(mapStateToProps, null)(PageLayout);