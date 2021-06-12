import React, { Component } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";
import FaceRecognition from "./Components/FaceRecognization/FaceRecognition.js";
import Clarifai from "clarifai";
import Logo from "./Components/Logo/Logo.js";
import Signin from "./Components/Signin/Signin.js";
import Register from "./Components/Register/Register.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import Particles from "react-particles-js";
import Rank from "./Components/Rank.js";
import "tachyons";

const app = new Clarifai.App({
  apiKey: "e554caf3d8b949fd9e45a8e7ef472e9f",
});

const ParticlesOptions = {
  particles: {
   number:{
      value: 100,
      density:{
        enable: true,
        value_area: 600
      }
  }
    }
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      Box: [],
      route: "signin",
      isSignedin: false,
      user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joinDate: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joinDate: data.joinDate
        }})
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/').
  //   then(response => response.json()).
  //   then(console.log);
  // }

    onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

   calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

    displayFaceBox = (Box) => {
      this.setState({Box});
    }


    onSubmit = () => {
      this.setState({ imageUrl: this.state.input });
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then( response =>{
          if(response){
            fetch('http://localhost:3001/image',{

              method:'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id:this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })    

          }
         this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch((error) => console.log(error));
    };

      onRouteChange = (route) => {
        if (route === 'signout') {
          this.setState({isSignedIn: false})
        } else if (route === 'home') {
          this.setState({isSignedIn: true})
        }
        this.setState({route: route});
      }


  render() {
      return (
      <div className="App">
          <Particles className="particles" params={ParticlesOptions} />
          <Navbar isSignedIn = { this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank 
                name = {this.state.user.name} 
                entries = {this.state.user.entries}
                />
              <ImageLinkForm 
                onInputChange = {this.onInputChange}
                onSubmit = {this.onSubmit}
              />
              <FaceRecognition Box={this.state.Box}imageUrl={this.state.imageUrl} />
            </div>
          : (
              this.state.route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
              : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            )

          }  
      </div>
    );
  }
}


export default App;
