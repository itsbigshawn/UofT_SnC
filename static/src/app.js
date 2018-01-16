//https://webpack.github.io/docs/usage.html
// https://medium.com/@learnreact/container-components-c0e67432e005
// http://andrewhfarmer.com/react-ajax-best-practices/
// http://www.adeveloperdiary.com/react-js/integrate-react-and-d3/
// import cats from './cats'
// https://github.com/vai0/alarmclock
import React from 'react';
import { Component } from 'react';
import './app.css'
import GraphContainer from './graphcontainer'

class App extends Component {
  render() {
    return (
      <div className="main">
      	<GraphContainer/>
      	
      </div>    
   )
  }
};

export default App;
// console.log(cats[0])

