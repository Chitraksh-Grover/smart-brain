import React , { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
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
			imageUrl: '',
			box:'',
			route:'signin',
			IsSigned:false,
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/')
		.then(response => response.json())
		.then(console.log)
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return{
			leftCol: clarifaiFace.left_col*width,
			topRow: clarifaiFace.top_row*height,
			rightCol: width - (clarifaiFace.right_col*width),
			bottomRow: height - (clarifaiFace.bottom_row*height)
		}
	}

	displayFaceBox = (box) => {
		this.setState({box:box});
	}
	
	onInputChange = (event) => {
		this.setState({input:event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl:this.state.input});	
		app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input )
		.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
		.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		this.setState({route:route});
		if(route==='home')
		{
			this.setState({IsSigned:true});
		}
		else
		{
			this.setState({IsSigned:false});
		}
	}	
	
	render(){
		return(
			<div className="App">
				<Particles className = 'particle' params = {options}/>
				<Navigation IsSigned={this.state.IsSigned} onRouteChange={this.onRouteChange}/>
				{this.state.route==='home'?
				<div>
					<Logo/>
					<Rank/>
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
					<FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>	
				</div>:(
				this.state.route==='signin'?
				<Signin onRouteChange={this.onRouteChange}/>:
				<Register onRouteChange={this.onRouteChange}/>)}
			</div>
		);
	}
}

export default App;

