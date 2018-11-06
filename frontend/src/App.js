import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Content from './components/Content'
import Navigation from './components/Navigation'
import './App.css';

class App extends Component {
  static propTypes = {
   children: PropTypes.object.isRequired
 }

  render() {
    const options = {
      timeout: 5000,
      position: "bottom center"
    };
    const { children } = this.props;
    return (
        <div>
          <Navigation name = {window.sessionStorage.getItem("user")}/>
          <Content body = {children} />
        </div>
    );
  }
}

export default App;
