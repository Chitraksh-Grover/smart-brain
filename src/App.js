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
 apiKey: '7d7b68edc59546c0bbc73c99b59fca10'
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
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: '',
			},
		}
	}

	loadUser = (data) => {
		this.setState({user:data});
		console.log(this.state);
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
		console.log(this.state.input);
		app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
		.then(response => {
			if(response){
				fetch('http://localhost:3000/image', {
					method: 'put',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: this.state.user.id,
					   }),
				 }).then(response => response.json())
				.then(count => {
					this.setState(Object.assign(this.state.user, {entries:count}));
				})
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		})
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
					<Rank name={this.state.user.name} entries={this.state.user.entries} />
					<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
					<FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>	
				</div>:(
				this.state.route==='signin'?
				<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
				<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)}
			</div>
		);
	}
}

export default App;

