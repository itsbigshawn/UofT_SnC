import React from 'react';
import { Component } from 'react';
import {BarChart, XAxis, YAxis, Bar,CartesianGrid, Tooltip, Legend}   from 'recharts';
// import XAxis from 'recharts';
// import YAxis from 'recharts';
// import {BarGroupChart} from 'react-d3-basic'
// import { extent as d3Extent, max as d3Max } from 'd3-array';
// import { scaleLinear as d3ScaleLinear, scaleTime as d3ScaleTime} from 'd3-scale'; 
// import { format as d3Format } from 'd3-format';
import { timeParse, timeFormat} from 'd3-time-format';

const data = [
  {date: '2017-03-01', rep0:'100', rep1: '222' , rep2: '250'}, 
  {date: '2017-04-15', rep0:'156', rep1: '175' , rep2: '100'} 
];

const margin = {top: 20, right: 20, bottom: 30, left: 40};


class Graph extends Component {
	
	
	
	render(){
		
			return(
				<div>
					<BarChart 
	                 	height={500}
	                  	width = {400}
	                  	margin={margin}

	                  	data={this.props.data}                  	
	                >
	                <XAxis  label='Date' dataKey='date' />
	                <CartesianGrid strokeDasharray="3 3"/>
		      		<Tooltip/>
	                <YAxis/>
	                <Bar dataKey="rep0" fill="#8884d8" />
	                <Bar dataKey="rep1" fill="#8884d8" />
	                <Bar dataKey="rep2" fill="#8884d8" />
	                <Bar dataKey="rep3" fill="#8884d8" />
	                <Bar dataKey="rep4" fill="#8884d8" />
	                <Bar dataKey="rep5" fill="#8884d8" />

	                </BarChart>
	                 <button className='okClick' onClick={() => this.props.onClick()}>
	                 	Update
	                 </button>   
				</div>
				
			)
	}
};

export default Graph;