import React , { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: '6deac09f00e74fdfb42b0570f472f5d8'
});

const options = {
	    "particles": {
	        "number": {
	            "value": 55
	        },
	        "size": {
	            "value": 3 
	        }
	    }
}

class App extends Component{
	constructor(){
		super();
		this.state = {
			input: '',
		}
	}
	
	onInputChange = (event) => {
		console.log(event.target.value);
	}

	onButtonSubmit = () => {
		console.log('click');
		app.models.predict(Clarifai.COLOR_MODEL, "https://samples.clarifai.com/face-det.jpg")
		.then(
   			 function(response) {
     				console.log(response); // do something with response
   			 },
   			 function(err) {
     				 // there was an error
   			 }
 		 );
	}
	
	render(){
		return(
			<div className="App">
				<Particles className = 'particle' params = {options}/>
				<Navigation/>
				<Logo/>
				<Rank/>
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
				<FaceRecognition/>	
			</div>
		);
	}
}

export default App;

