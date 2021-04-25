import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.js';
import FaceRecognization from './Components/FaceRecognization/FaceRecognization.js';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Particles from 'react-particles-js';
import Rank from './Components/Rank.js';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: 'e554caf3d8b949fd9e45a8e7ef472e9f'
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
    }
  }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    FaceBox = (data) => {
      const FaceData = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimg');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(FaceData);
      return {
          leftCol: FaceData.left_col * width,
          topRow: FaceData.top_row * height,
          rightCol: width - (FaceData.right_col * width),
          bottomRow: height - (FaceData.bottom_row * height)
      }
    } 

    DisplayFaceBox = (box) => {
      this.setState({box: box});
      console.log('disp',box);
    }

    onSubmit = () => {
        this.setState({imageUrl: this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.DisplayFaceBox(this.FaceBox(response)))
      .catch(error => console.log(error));
    }  
  











  render() {
    return(
      <div className = "App">
        <Particles className = 'particles'
          params = {ParticlesOptions}
         />
        <Navbar />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange = {this.onInputChange}
        onSubmit = {this.onSubmit}
        />
        <FaceRecognization box={this.state.box}imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}


export default App;
