import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
          <Navbar/>
  
    );
  }
}