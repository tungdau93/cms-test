import React, { Component } from 'react'
import { Layout, Menu, Button } from "antd"
import { connect } from "react-redux"
import testImage from "../pages/images/test.png"
import questionImage from "../pages/images/question.png"
import { withRouter } from "react-router"
import LoginTypes from '../redux/login-redux'

const { Sider } = Layout

class SideBar extends Component {
  handleLogOut = () => {
    window.localStorage.removeItem('token')
    this.props.logout()
    this.props.history.push('/')
  }
  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed} style={{ position: 'fixed' }}>
        <div className='sideBar-container'>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[`/${this.props.location.pathname.split('/')[1]}`]} >
            <Menu.Item
              key='/test'
              onClick={() => {
                this.props.history.push('/test')
              }}
            >
              <img src={testImage} alt="aaa" />
              <span>Test</span>
            </Menu.Item>
            <Menu.Item
              key='/question'
              onClick={() => {
                this.props.history.push('/question')
              }}
            >
              <img src={questionImage} alt="aaa" />
              <span>Question</span>
            </Menu.Item>
          </Menu>
        </div>
        <Button type="danger" onClick={this.handleLogOut}>LOGOUT</Button>
      </Sider>
    )
  }
}

const mapStateToProps = (state) => ({
  collapsed: state.sideBar.collapsed
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(LoginTypes.logout())
    }
  }
}

SideBar = withRouter(SideBar)

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
