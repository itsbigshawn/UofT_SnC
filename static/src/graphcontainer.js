import React from 'react';
import { Component } from 'react';
import Graph from './graph';
import { Dropdown } from 'semantic-ui-react'
import './graphcontainer.css'
// https://github.com/Semantic-Org/Semantic-UI-React/issues/2029
import 'semantic-ui-css/components/dropdown.min.css'
import 'semantic-ui-css/components/transition.min.css'
import 'semantic-ui-css/components/reset.min.css'

const data1 = [
  {date: '2017-03-01', rep0:'100', rep1: '222' , rep2: '250'}, 
  {date: '2017-04-15', rep0:'156', rep1: '175' , rep2: '100'} 
];

// var parseDate = d3.time.format("%y-%b-%d").parse;

class GraphContainer extends Component {
	constructor() {
	    super();
	    this.state = {
	      graphs: Array(4).fill(null),
	      data: [data1, data1, data1, data1],
	      namesList: [],
	      exerciseList: [],
	 
	      name: Array(4).fill("Select Athlete"),
	      exercise: Array(4).fill("Select Exercise"),
	    };
	    this.getNames = this.getNames.bind(this);
	    this.getExercises= this.getExercises.bind(this);
	    this.handleName = this.handleName.bind(this);
  	};

  	getExercises(){
  		console.log("getting exercises")
		fetch('/exerciseList')
  		.then((response) => response.json())
  		.then((responseJson)=>{
  			var myExercises = responseJson;
  			// console.log(myNames[0],myNames[1], myNames[2]);
  			this.setState({
  				exerciseList: myExercises,
  			});
  			
  		})
  		.catch((error) => {
        	console.error(error)
      	});
  	};
  	getNames(){
  		console.log("getting names")
		fetch('/namesList')
  		.then((response) => response.json())
  		.then((responseJson)=>{
  			var myNames = responseJson;
  			 // console.log(myNames[0].value);
  			this.setState({
  				namesList: myNames,
  			});
  			
  		})
  		.catch((error) => {
        	console.error(error)
      	});
  	};
// need to do on the willmount instead of didmount because of server side rendering
  	componentWillMount(){
  		// console.log('will mounting')
  		this.getNames();
  		this.getExercises();
  	}
  	

  	renderGraph(i){
  		return (

	  		<div>
	  			<Graph value={this.state.graphs[i]}
	  		 	data={this.state.data[i]} 
	  		 	onClick={() => this.handleClick(i)}
	  		 	//>
	  		 	/>
	  	 <Dropdown placeholder='Select Athlete'   value = {this.state.name[i]} search selection options={this.state.namesList}  onChange={(e) => this.handleName(e,i)}/>/
	  	 <Dropdown placeholder='Select Exercise'    value = {this.state.exercise[i]} search selection options={this.state.exerciseList} onChange={(e) => this.handleExercise(e,i)}/>
	  		 
	  		 </div>
  		 );
  	}

  	
	
  	handleName(e, i){
  		console.log(this.state.name)
  		const names = this.state.name.slice();
  		names[i] = e.target.children[0].textContent;
  		this.setState({
  			name: names
  		})
  		console.log('in handleName')	
  		console.log('Event:', e.target.children[0].textContent, i)
  		
  	};

  	handleExercise(e, i){
  		console.log(this.state.exercise)
  		const exercises = this.state.exercise.slice();
  		exercises[i] = e.target.children[0].textContent;
  		this.setState({
  			exercise: exercises
  		})
  		// console.log("in handlexercise")
  		// console.log('Event:', e.target.children[0].textContent, i)
		// console.log(this.state.name)
  	};

  	handleClick(i){

  		// athlete = this.state.name[i];
  		// workout = this.state.exercise[i];
  		// console.log(this.state.data[i])
  		// console.log("updated values",this.state.exercise[i])
  		// data = {"athlete": this.state.name[i], "workout": this.state.exercise[i]}

/////////////FOR UPLOADING A FILE REFERNCE
/////////////https://stackoverflow.com/questions/43542820/upload-json-file-in-reactclient-side-and-send-it-to-nodeserver-side 
  		fetch('/data/' + this.state.name[i]+'/'+ this.state.exercise[i])
  		.then((response) => response.json())
  		.then((responseJson)=>{
  			const graphs = this.state.graphs.slice();
  			const data = this.state.data.slice();
  			var myData = responseJson;
  			data[i] = myData;

  			console.log("MYDATA: ",myData)
  			this.setState({
  				graphs: graphs,
  				data: data
  			});
  			
  		})
  		.catch((error) => {
        	console.error(error)
      	});

  	};


	render(){
		return(
			<div>
				<div className='graphs-row'>
					{this.renderGraph(0)}
					{this.renderGraph(1)}
				</div>
				<div className='graphs-row'>
					{this.renderGraph(2)}
					{this.renderGraph(3)}
				</div>		
			</div>
		)

	}
};

export default GraphContainer;