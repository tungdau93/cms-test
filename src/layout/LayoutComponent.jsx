import React, { Component, Fragment } from 'react'
import HeaderComp from "../components/HeaderComp"
import SideBar from "../components/SideBar"
import FooterComp from "../components/FooterComp"
import { Layout } from 'antd'
import { connect } from "react-redux"
import 'antd/dist/antd.css'
import { Redirect } from 'react-router-dom'

const { Content } = Layout
class LayoutComponent extends Component {
  render() {
    const token = window.localStorage.getItem('token')
    return (
      token ? (
        <Layout>
          <SideBar></SideBar>
          <Layout
            style={
              this.props.collapsed ? { marginLeft: '100px', transition: 'all 0.4s' } : { marginLeft: '200px', transition: 'all 0.4s' }
            }
          >
            <HeaderComp />
            <Content style={{ height: '100vh' }}>
              {this.props.children}
            </Content>
            <FooterComp />
          </Layout>
        </Layout>
      ) : (
        <Redirect to='/' />
      )
    )
  }
}

const mapStateToProps = (state) => ({
  collapsed: state.sideBar.collapsed
})

export default connect(mapStateToProps, null)(LayoutComponent)
