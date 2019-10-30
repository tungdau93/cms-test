import React, { Component } from 'react'
import './App.css'
import PageLayout from "./layout/PageLayout"
import { Provider } from "react-redux"
import configureStore from "./redux/index"

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <PageLayout />
      </Provider>
    );
  }
}

export default App