import React, { Component } from 'react'
import './App.css'
import Route from './router/route'
import { Provider } from "react-redux"
import configureStore from "./redux/index"

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Route />
      </Provider>
    );
  }
}

export default App