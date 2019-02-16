import React, { Component } from 'react';


const API_KEY = 'AIzaSyDcTleL0GL-CyNzpONaJJp_gbF3HQ-_ooM'

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        location:[]
      }
  }
  /*
  showPosition = position =>  { 
    //https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude 
    this.setState({ location: this.state.location.concat([latitude,longitude]),}) //simple value
  }
  */

 onSuccess = pos => {
  var crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

onError = err => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


  getLocation = e => {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError);
    } else {
      console.log("Geolocation is not supported by this browser");
    } 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.getLocation}> {'hahahahah'} </button>
          <p>
            hello world
          </p>
        </header>
      </div>
    );
  }
}

export default App;
