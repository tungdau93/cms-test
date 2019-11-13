import React, { Component } from 'react'
import '../pages/css/not-found.css'
import { withRouter } from 'react-router'

class NotFoundScreen extends Component {

  handleClick = () => {
    this.props.history.push('/test')
  }

  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>4<span></span>4</h1>
          </div>
          <h2>Oops! Page Not Be Found</h2>
          <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
          <button className='notfound-button' onClick={this.handleClick} >Back to homepage</button>
        </div>
      </div>

    )
  }
}

export default withRouter(NotFoundScreen)
