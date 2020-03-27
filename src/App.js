import React , { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';

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
	render(){
		return(
			<div className="App">
				<Particles className = 'particle' params = {options}/>
				<Navigation/>
				<Logo/>
				<Rank/>
				<ImageLinkForm/>
		{/*		<FaceRecognition/>*/}	
			</div>
		);
	}
}

export default App;

