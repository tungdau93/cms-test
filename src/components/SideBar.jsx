import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from "antd"
import { connect } from "react-redux"

const { Sider } = Layout

class SideBar extends Component {
  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed} style={{ position: 'fixed' }}>
        <div className='sideBar-container'>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="file-text" theme="twoTone" />
              <span>Test</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="question-circle" theme="twoTone" />
              <span>Question</span>
            </Menu.Item>
          </Menu>
        </div>
        <Button type="primary">LOGOUT</Button>
      </Sider>
    )
  }
}

const mapStateToProps = (state) => ({
  collapsed: state.collapsed.collapsed
})

export default connect(mapStateToProps, null)(SideBar);