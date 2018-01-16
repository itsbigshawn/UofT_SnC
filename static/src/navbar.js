import React from 'react';
import { Component } from 'react';
import './navbar.css'

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-side">
			<div className="dropdown">
				<span>Exercises</span>
				<div className="dropdown-hidden"> 
					<p>Individual 1</p>
					<p>Individual 2</p>

				</div>	
			</div>
			<div className="dropdown">
				<span>Athlete</span>
				<div className="dropdown-hidden">
					<p>Daily</p>
				 </div>
			</div>
			<div>Download csv</div>			
	</div>     
   );
  }
}

export default Navbar;

